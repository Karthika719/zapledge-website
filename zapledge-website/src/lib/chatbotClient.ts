/**
 * Zapledge Chatbot API Client
 *
 * Provides typed communication with the Zapledge chatbot backend service.
 */

export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatRequestPayload {
  message: string;
  history?: ChatMessage[];
}

export interface ChatSuccessResponse {
  success: true;
  data: {
    reply: string;
  };
}

export interface ChatErrorPayload {
  message: string;
  details?: unknown;
}

export interface ChatErrorResponse {
  success: false;
  error: ChatErrorPayload;
}

export type ChatApiResponse = ChatSuccessResponse | ChatErrorResponse;

export class ChatbotApiError extends Error {
  readonly statusCode?: number;
  readonly details?: unknown;

  constructor(message: string, statusCode?: number, details?: unknown) {
    super(message);
    this.name = 'ChatbotApiError';
    this.statusCode = statusCode;
    this.details = details;

    Object.setPrototypeOf(this, ChatbotApiError.prototype);
  }
}

const DEFAULT_CHATBOT_API_URL = 'http://localhost:3001';

/**
 * Returns the resolved base URL for the chatbot API.
 */
export function getChatbotApiUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL;
  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, '');
  }
  return DEFAULT_CHATBOT_API_URL;
}

/**
 * Sends a chat message with optional conversation history to the chatbot backend.
 *
 * @param payload Message and optional conversation history
 * @param options Additional native fetch options (e.g. AbortSignal)
 * @returns Parsed response containing `{ success: true, data: { reply } }`
 * @throws `ChatbotApiError` on HTTP errors (400, 429, 5xx), network errors, or malformed responses
 */
export async function sendChatMessage(
  payload: ChatRequestPayload,
  options?: Omit<RequestInit, 'method' | 'body'>
): Promise<ChatSuccessResponse> {
  const baseUrl = getChatbotApiUrl();
  const endpoint = `${baseUrl}/api/chat`;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify({
        message: payload.message,
        ...(payload.history && payload.history.length > 0
          ? { history: payload.history }
          : {}),
      }),
    });
  } catch (networkError) {
    if (networkError instanceof DOMException && networkError.name === 'AbortError') {
      throw networkError;
    }
    const message =
      networkError instanceof Error
        ? `Network error: ${networkError.message}`
        : 'Unable to connect to the chatbot service. Please ensure the backend is running.';
    throw new ChatbotApiError(message, undefined, networkError);
  }

  let responseData: unknown;
  try {
    responseData = await response.json();
  } catch {
    const status = response.status;
    const fallbackMessage =
      status === 404
        ? 'Chatbot endpoint not found.'
        : status === 429
          ? 'Too many requests. Please try again later.'
          : status === 502
            ? 'Chatbot service upstream error (502 Bad Gateway).'
            : status >= 500
              ? `Server error (${status}). Please try again later.`
              : `Request failed with status ${status}.`;
    throw new ChatbotApiError(fallbackMessage, status);
  }

  if (!response.ok) {
    const errorData = responseData as Partial<ChatErrorResponse> | undefined;
    const backendMessage = errorData?.error?.message;
    const details = errorData?.error?.details;

    let defaultMessage: string;
    switch (response.status) {
      case 400:
        defaultMessage = 'Invalid request. Please verify your message.';
        break;
      case 404:
        defaultMessage = 'Chatbot endpoint not found.';
        break;
      case 429:
        defaultMessage = 'Too many requests. Please try again later.';
        break;
      case 502:
        defaultMessage = 'Chatbot service temporarily unavailable (502 Bad Gateway).';
        break;
      default:
        defaultMessage =
          response.status >= 500
            ? `Server error (${response.status}). Please try again later.`
            : `Request failed with status ${response.status}.`;
    }

    throw new ChatbotApiError(backendMessage || defaultMessage, response.status, details);
  }

  const successData = responseData as Partial<ChatSuccessResponse>;
  if (
    typeof successData !== 'object' ||
    successData === null ||
    successData.success !== true ||
    !successData.data ||
    typeof successData.data.reply !== 'string'
  ) {
    throw new ChatbotApiError(
      'Malformed response received from the chatbot service.',
      response.status,
      responseData
    );
  }

  return successData as ChatSuccessResponse;
}

