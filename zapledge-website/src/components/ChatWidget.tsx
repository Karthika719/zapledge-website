"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import {
  sendChatMessage,
  type ChatMessage,
  ChatbotApiError,
} from "@/lib/chatbotClient";
import { AiLauncher } from "./ai/AiLauncher";
import { ZSparkIcon } from "./ai/ZSparkIcon";

export interface DisplayMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
}

const SUGGESTION_CHIPS = [
  {
    label: "What does Zapledge do?",
    dotColor: "#0B3BFF",
  },
  {
    label: "Which industries do you work with?",
    dotColor: "#7C5CFF",
  },
  {
    label: "What are your services?",
    dotColor: "#EC4899",
  },
];

/**
 * Safely parses basic bold markdown (**text**), markdown links ([label](url)),
 * and consultation CTA pills.
 *
 * Links and CTAs are revealed only after streaming completion.
 */
function FormattedMessageText({
  text,
  isRevealComplete,
}: {
  text: string;
  isRevealComplete: boolean;
}) {
  const normalizedText = text
    .replace(/&#x20;|&#32;/gi, " ")
    .replace(/&nbsp;/gi, " ");

  const tokenRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = normalizedText.split(tokenRegex);

  const hasConsultationOffer =
    isRevealComplete &&
    (normalizedText.toLowerCase().includes("book a free consultation") ||
      normalizedText.toLowerCase().includes("book a consultation") ||
      normalizedText.toLowerCase().includes("schedule a consultation"));

  return (
    <>
      {parts.map((part, index) => {
        // Bold markdown match
        const boldMatch = part.match(/^\*\*([\s\S]+)\*\*$/);
        if (boldMatch) {
          return (
            <strong key={index} className="font-semibold text-[#0A0B3D]">
              {boldMatch[1]}
            </strong>
          );
        }

        // Markdown link match: [text](url)
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const label = linkMatch[1];
          const href = linkMatch[2];

          // Hide interactive links until reveal is complete
          if (!isRevealComplete) {
            return <span key={index}>{label}</span>;
          }

          const isConsultation =
            href.includes("contact") ||
            label.toLowerCase().includes("consultation") ||
            label.toLowerCase().includes("book");

          if (isConsultation) {
            return (
              <span key={index} className="block my-2">
                <a
                  href={href}
                  className="inline-flex items-center justify-center h-[36px] px-4 rounded-full text-white text-[13px] font-semibold no-underline shadow-[0_4px_12px_rgba(11,59,255,0.25)] hover:opacity-95 transition-opacity"
                  style={{
                    background:
                      "linear-gradient(90deg, #0B3BFF 0%, #0A0B3D 100%)",
                  }}
                >
                  {label} →
                </a>
              </span>
            );
          }

          return (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0B3BFF] underline font-medium hover:text-[#0022CC] transition-colors"
            >
              {label}
            </a>
          );
        }

        return <span key={index}>{part}</span>;
      })}

      {/* Standalone Consultation CTA pill if invited without explicit markdown link */}
      {hasConsultationOffer && !normalizedText.includes("](") && (
        <div className="mt-2.5">
          <a
            href="/contact"
            className="inline-flex items-center justify-center h-[36px] px-4 rounded-full text-white text-[13px] font-semibold no-underline shadow-[0_4px_12px_rgba(11,59,255,0.25)] hover:opacity-95 transition-opacity"
            style={{
              background:
                "linear-gradient(90deg, #0B3BFF 0%, #0A0B3D 100%)",
            }}
          >
            Book a Free Consultation →
          </a>
        </div>
      )}
    </>
  );
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);

  // Client-side progressive reveal presentation state (stored message remains immutable)
  const [streamingState, setStreamingState] = useState<{
    messageId: string;
    revealedCount: number;
  } | null>(null);

  // Conversation history for context tracking passed to API
  const conversationHistoryRef = useRef<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const isGenerating =
    isLoading || (streamingState !== null && streamingState.messageId !== null);

  // Auto-scroll to bottom on new messages, loading, and streaming ticks
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, streamingState, isOpen]);

  // Focus input when chat panel opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close panel on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Cleanup timers and abort controllers on unmount
  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // New chat handler: resets messages, input, and conversation history
  const handleNewChat = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }
    setStreamingState(null);
    setIsLoading(false);
    setMessages([]);
    setInputText("");
    setFailedMessage(null);
    conversationHistoryRef.current = [];
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  // Stop button handler: aborts in-flight request or finishes client-side reveal
  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }
    setStreamingState(null);
    setIsLoading(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const sendMessageContent = async (messageText: string) => {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage || isLoading) return;

    // Stop any existing stream reveal before sending new message
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }
    setStreamingState(null);

    const userMessageId = `user-${Date.now()}`;
    const newDisplayUserMessage: DisplayMessage = {
      id: userMessageId,
      role: "user",
      content: trimmedMessage,
    };

    setMessages((prev) => [...prev, newDisplayUserMessage]);
    setInputText("");
    setIsLoading(true);
    setFailedMessage(null);

    // Save previous history before this message
    const previousHistory = [...conversationHistoryRef.current];

    // Append user message to history
    conversationHistoryRef.current.push({
      role: "user",
      content: trimmedMessage,
    });

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await sendChatMessage(
        {
          message: trimmedMessage,
          history: previousHistory,
        },
        { signal: controller.signal }
      );

      const replyText = response.data.reply;

      // Append assistant reply to conversation history
      conversationHistoryRef.current.push({
        role: "assistant",
        content: replyText,
      });

      const assistantMessageId = `assistant-${Date.now()}`;

      // Store the complete message immutably in message state
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          content: replyText,
        },
      ]);

      // Handle character-by-character progressive reveal
      const isReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isReducedMotion) {
        setStreamingState(null);
      } else {
        setStreamingState({
          messageId: assistantMessageId,
          revealedCount: 0,
        });

        const fullLength = replyText.length;
        let currentCount = 0;

        streamIntervalRef.current = setInterval(() => {
          currentCount += 2;
          if (currentCount >= fullLength) {
            if (streamIntervalRef.current) {
              clearInterval(streamIntervalRef.current);
              streamIntervalRef.current = null;
            }
            setStreamingState(null);
          } else {
            setStreamingState({
              messageId: assistantMessageId,
              revealedCount: currentCount,
            });
          }
        }, 20);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        // User aborted intentionally, no error notification
        return;
      }

      // Revert the unfulfilled user message from history
      conversationHistoryRef.current.pop();
      setFailedMessage(trimmedMessage);

      let errorMessage =
        "Sorry, I'm unable to respond right now. Please try again.";
      if (error instanceof ChatbotApiError && error.message) {
        errorMessage = error.message;
      }

      const errorMessageId = `error-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: errorMessageId,
          role: "assistant",
          content: errorMessage,
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessageContent(inputText);
  };

  const handleRetry = async () => {
    if (!failedMessage || isLoading) return;
    const messageToRetry = failedMessage;
    await sendMessageContent(messageToRetry);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;600;700;800&display=swap');

        /* Thin scrollbar for messages area */
        .chat-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #D6DAF0 transparent;
        }
        .chat-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .chat-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-scrollbar::-webkit-scrollbar-thumb {
          background-color: #D6DAF0;
          border-radius: 9999px;
        }

        /* Message entrance animation */
        @keyframes messageIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-message-in {
          animation: messageIn 320ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        /* Typing indicator dots bounce */
        @keyframes typingDotBounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.25;
          }
          50% {
            transform: translateY(-3px);
            opacity: 1;
          }
        }
        .animate-dot-bounce {
          animation: typingDotBounce 1.1s ease-in-out infinite;
        }

        /* Streaming blinking caret */
        @keyframes caretBlink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-caret-blink {
          animation: caretBlink 1s steps(2, start) infinite;
        }

        /* Reusable Lead Capture Inputs styling */
        .lead-capture-input {
          height: 52px;
          padding: 0 16px;
          background-color: #F8F9FE;
          border: 1px solid #E3E6F5;
          border-radius: 16px;
          font-size: 14.5px;
          color: #0A0B3D;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .lead-capture-input:focus {
          border-color: #9DAEFF;
          box-shadow: 0 0 0 4px rgba(11, 59, 255, 0.08);
        }

        /* Prevent browser/global rectangular outline on the chat input while focused/typing */
        #zapledge-chat-input,
        #zapledge-chat-input:focus,
        #zapledge-chat-input:focus-visible {
          outline: none !important;
          outline-offset: 0 !important;
          box-shadow: none !important;
          border: none !important;
          -webkit-appearance: none !important;
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-message-in,
          .animate-dot-bounce,
          .animate-caret-blink,
          #zapledge-ai-panel {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Mobile Backdrop (rgba(10,11,61,.28)) */}
      <div
        className={`fixed inset-0 bg-[rgba(10,11,61,0.28)] z-40 sm:hidden transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Floating AI Assistant Launcher Button */}
      <AiLauncher isOpen={isOpen} onToggle={handleToggle} />

      {/* Chat Panel Container */}
      <section
        id="zapledge-ai-panel"
        role="dialog"
        aria-label="Zapledge AI chat"
        className={`fixed right-[40px] bottom-[120px] w-[380px] h-[560px] max-h-[calc(100vh-160px)] bg-white border border-[rgba(10,11,61,0.08)] rounded-[24px] shadow-[0_24px_60px_-24px_rgba(10,11,61,0.35),0_4px_14px_-6px_rgba(11,59,255,0.14)] overflow-hidden flex flex-col z-50 transition-all duration-[320ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] origin-bottom-right max-sm:fixed max-sm:left-2 max-sm:right-2 max-sm:top-[52px] max-sm:bottom-2 max-sm:w-auto max-sm:h-auto max-sm:max-h-[calc(100dvh-60px)] max-sm:rounded-[26px] max-sm:shadow-[0_-12px_40px_-16px_rgba(10,11,61,0.4)] ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 visible pointer-events-auto"
            : "opacity-0 scale-[0.96] translate-y-[14px] invisible pointer-events-none"
        }`}
      >
        {/* Top 2px Accent Line (only top decoration, NO header) */}
        <div
          className="absolute top-0 inset-x-0 h-[2px] z-30 pointer-events-none opacity-70"
          style={{
            background:
              "linear-gradient(90deg, #0B3BFF, #7C5CFF 40%, #EC4899 65%, #22C3EE)",
          }}
          aria-hidden="true"
        />

        {/* Mobile Grabber (36x4px, #E1E4F2, centred 8px from top) */}
        <div
          className="sm:hidden absolute top-2 left-1/2 -translate-x-1/2 w-[36px] h-[4px] rounded-full bg-[#E1E4F2] z-30 pointer-events-none"
          aria-hidden="true"
        />

        {/* Top-Right Header Actions (New Chat & Close buttons, similar to reference) */}
        <div className="absolute top-3.5 right-4 z-30 flex items-center gap-1.5">
          {/* New Chat Button */}
          <button
            type="button"
            onClick={handleNewChat}
            aria-label="New chat"
            title="New chat"
            className="w-[32px] h-[32px] rounded-full bg-[#F3F5FF] hover:bg-[#EAEFFF] active:scale-95 text-[#0A0B3D] flex items-center justify-center transition-all cursor-pointer border-none outline-none focus-visible:outline-2 focus-visible:outline focus-visible:outline-[#0B3BFF] focus-visible:outline-offset-[2px]"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0A0B3D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close Zapledge AI Assistant"
            title="Close chat"
            className="w-[32px] h-[32px] rounded-full bg-[#F3F5FF] hover:bg-[#EAEFFF] active:scale-95 text-[#0A0B3D] flex items-center justify-center transition-all cursor-pointer border-none outline-none focus-visible:outline-2 focus-visible:outline focus-visible:outline-[#0B3BFF] focus-visible:outline-offset-[2px]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0A0B3D"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Message Area (scrollable, flex-1) */}
        <div
          ref={scrollContainerRef}
          role="log"
          aria-live="polite"
          className="flex-1 overflow-y-auto pt-[26px] px-[22px] pb-[12px] flex flex-col gap-[18px] chat-scrollbar scroll-smooth"
        >
          {/* Welcome Block (always first) */}
          <div className="flex flex-col items-start gap-2.5">
            {/* 40px Round Mark */}
            <div
              className="w-[40px] h-[40px] rounded-full p-[1.5px] flex items-center justify-center shrink-0"
              style={{
                background:
                  "conic-gradient(from 210deg, #4D6BFF, #9B87FF, #F9A8D4, #67E8F9, #4D6BFF)",
                boxShadow: "0 8px 18px -8px rgba(11, 59, 255, 0.55)",
              }}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(120% 120% at 30% 18%, #2346FF 0%, #0B1A9A 42%, #070B34 100%)",
                }}
              >
                <ZSparkIcon
                  variant="onDark"
                  size={20}
                  showConnector={false}
                  showNode={false}
                />
              </div>
            </div>

            {/* Heading in Outfit 700, 21px, #0A0B3D */}
            <h2
              className="text-[21px] font-bold text-[#0A0B3D] tracking-tight leading-tight m-0"
              style={{ fontFamily: "'Outfit', var(--font-inter), sans-serif" }}
            >
              Hi, I'm Zapledge AI.
            </h2>

            {/* Subheading text at 14.5px/1.55, #4B4F6B */}
            <p className="text-[14.5px] leading-[1.55] text-[#4B4F6B] m-0">
              Ask about our AI solutions, how we work, or where AI could help your business.
            </p>
          </div>

          {/* Suggestion Chips (only while there are no messages) */}
          {messages.length === 0 && (
            <div className="flex flex-col gap-2 mt-1">
              {SUGGESTION_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => sendMessageContent(chip.label)}
                  className="min-h-[40px] pl-3 pr-3.5 py-2 bg-white border border-[#E3E6F5] rounded-[12px] text-[13.5px] font-medium text-[#1E2140] flex items-center gap-2.5 text-left cursor-pointer hover:bg-[#F3F5FF] hover:border-[#C9D1FF] hover:translate-x-[2px] transition-all duration-200 outline-none focus-visible:outline-2 focus-visible:outline focus-visible:outline-[#0B3BFF] focus-visible:outline-offset-[3px]"
                >
                  <span
                    className="w-[6px] h-[6px] rounded-full shrink-0 inline-block"
                    style={{ backgroundColor: chip.dotColor }}
                  />
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Messages List */}
          {messages.map((msg) => {
            if (msg.role === "user") {
              return (
                <div
                  key={msg.id}
                  className="flex justify-end w-full animate-message-in"
                >
                  <div className="max-w-[82%] px-3.5 py-2.5 rounded-[18px] rounded-br-[6px] text-[14.5px] leading-[1.5] text-white bg-[#0B3BFF] shadow-[0_6px_14px_-8px_rgba(11,59,255,0.6)] whitespace-pre-wrap break-words">
                    {msg.content}
                  </div>
                </div>
              );
            }

            // Assistant Message (no bubble, row with gap 10px, 18px onLight ZSparkIcon)
            const isCurrentlyStreaming =
              streamingState !== null && streamingState.messageId === msg.id;
            const visibleText = isCurrentlyStreaming
              ? msg.content.slice(0, streamingState.revealedCount)
              : msg.content;
            const isRevealComplete = !isCurrentlyStreaming;

            return (
              <div
                key={msg.id}
                className="flex items-start gap-[10px] w-full animate-message-in"
              >
                <div className="mt-[3px] shrink-0">
                  <ZSparkIcon
                    variant="onLight"
                    size={18}
                    showConnector={false}
                    showNode={false}
                  />
                </div>
                <div className="flex-1 min-w-0 text-[14.5px] leading-[1.62] text-[#1E2140] whitespace-pre-wrap break-words">
                  {msg.isError ? (
                    <div className="text-red-600 bg-red-50/70 border border-red-200/70 p-3 rounded-[12px]">
                      <p className="m-0 font-medium">{msg.content}</p>
                      {failedMessage && (
                        <div className="mt-2 pt-1 border-t border-red-200/50">
                          <button
                            type="button"
                            onClick={handleRetry}
                            disabled={isLoading}
                            className="text-xs font-semibold text-red-700 underline hover:text-red-900 cursor-pointer bg-transparent border-none p-0 inline-flex items-center gap-1 disabled:opacity-50"
                          >
                            ↻ Retry message
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <FormattedMessageText
                        text={visibleText}
                        isRevealComplete={isRevealComplete}
                      />
                      {isCurrentlyStreaming && (
                        <span
                          className="inline-block w-[7px] h-[15px] rounded-[2px] ml-1 align-middle animate-caret-blink"
                          style={{
                            background:
                              "linear-gradient(180deg, #0B3BFF, #7C5CFF 60%, #EC4899)",
                          }}
                          aria-hidden="true"
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator (while waiting for first token) */}
          {isLoading && (
            <div
              className="flex items-start gap-[10px] w-full animate-message-in"
              role="status"
              aria-label="Zapledge AI is typing"
            >
              <div className="mt-[3px] shrink-0">
                <ZSparkIcon
                  variant="onLight"
                  size={18}
                  showConnector={false}
                  showNode={false}
                />
              </div>
              <div className="h-[30px] px-3.5 bg-[#F3F5FF] rounded-full flex items-center gap-1.5 shrink-0">
                <span
                  className="w-[6px] h-[6px] rounded-full inline-block animate-dot-bounce"
                  style={{
                    backgroundColor: "#0B3BFF",
                    animationDelay: "0s",
                  }}
                />
                <span
                  className="w-[6px] h-[6px] rounded-full inline-block animate-dot-bounce"
                  style={{
                    backgroundColor: "#7C5CFF",
                    animationDelay: "0.15s",
                  }}
                />
                <span
                  className="w-[6px] h-[6px] rounded-full inline-block animate-dot-bounce"
                  style={{
                    backgroundColor: "#22C3EE",
                    animationDelay: "0.3s",
                  }}
                />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Composer (fixed at bottom) */}
        <form
          onSubmit={handleSubmit}
          className="p-[10px_14px_12px] border-t border-[#F0F2FA] bg-white shrink-0 flex flex-col"
        >
          {/* Field */}
          <div className="h-[52px] pl-4 pr-[7px] bg-[#F8F9FE] border border-[#E3E6F5] rounded-[16px] flex items-center gap-2 focus-within:border-[#9DAEFF] focus-within:ring-4 focus-within:ring-[#0B3BFF]/[0.08] transition-all duration-150">
            <label htmlFor="zapledge-chat-input" className="sr-only">
              Message Zapledge AI
            </label>
            <input
              id="zapledge-chat-input"
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Zapledge AI..."
              autoComplete="off"
              maxLength={2000}
              disabled={isGenerating}
              className="flex-1 min-w-0 bg-transparent border-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none text-[14.5px] max-sm:text-[16px] text-[#0A0B3D] placeholder:text-[#7A7F99] disabled:cursor-not-allowed"
              style={{
                outline: "none",
                boxShadow: "none",
                border: "none",
              }}
            />

            {/* Send / Stop button */}
            {isGenerating ? (
              <button
                type="button"
                onClick={handleStop}
                aria-label="Stop generating"
                className="w-[38px] h-[38px] rounded-full p-[1.5px] border-none cursor-pointer flex items-center justify-center shrink-0 outline-none focus-visible:outline-2 focus-visible:outline focus-visible:outline-[#0B3BFF] focus-visible:outline-offset-[3px] transition-transform active:scale-95"
                style={{
                  background:
                    "conic-gradient(from 210deg, #4D6BFF, #9B87FF, #F9A8D4, #67E8F9, #4D6BFF)",
                }}
              >
                <span
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(120% 120% at 30% 18%, #2346FF 0%, #0B1A9A 42%, #070B34 100%)",
                  }}
                >
                  <span className="w-[10px] h-[10px] bg-white rounded-[2px] block" />
                </span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!inputText.trim()}
                aria-label="Send message"
                className={`w-[38px] h-[38px] rounded-full p-[1.5px] border-none flex items-center justify-center shrink-0 outline-none focus-visible:outline-2 focus-visible:outline focus-visible:outline-[#0B3BFF] focus-visible:outline-offset-[3px] transition-all active:scale-95 ${
                  inputText.trim()
                    ? "opacity-100 cursor-pointer"
                    : "opacity-45 cursor-not-allowed"
                }`}
                style={{
                  background:
                    "conic-gradient(from 210deg, #4D6BFF, #9B87FF, #F9A8D4, #67E8F9, #4D6BFF)",
                }}
              >
                <span
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(120% 120% at 30% 18%, #2346FF 0%, #0B1A9A 42%, #070B34 100%)",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 19V5M12 5L6 11M12 5L18 11"
                      stroke="#FFFFFF"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            )}
          </div>

          {/* Footer note */}
          <p className="text-[11px] text-[#6B7090] text-center mt-2 m-0 select-none">
            Zapledge AI can make mistakes. Please verify important details.
          </p>
        </form>
      </section>
    </>
  );
}

export default ChatWidget;
