const chatToggle =
  document.getElementById("chatToggle");

const chatWidget =
  document.getElementById("chatWidget");

const closeChat =
  document.getElementById("closeChat");

const chatForm =
  document.getElementById("chatForm");

const messageInput =
  document.getElementById("messageInput");

const messages =
  document.getElementById("messages");

const typingIndicator =
  document.getElementById("typingIndicator");

const sendButton =
  document.getElementById("sendButton");


/*
 * Conversation history.
 *
 * We are keeping this only in browser memory for now.
 * Refreshing the page will clear it.
 */
const conversationHistory = [];


/*
 * Open chatbot
 */
chatToggle.addEventListener("click", () => {

  chatWidget.classList.remove("hidden");

  chatToggle.classList.add("hidden");

  messageInput.focus();

});


/*
 * Close chatbot
 */
closeChat.addEventListener("click", () => {

  chatWidget.classList.add("hidden");

  chatToggle.classList.remove("hidden");

});


/*
 * Send message
 */
chatForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  const message =
    messageInput.value.trim();


  if (!message) {
    return;
  }


  /*
   * Show user message
   */
  addMessage(
    message,
    "user"
  );


  /*
   * Save message locally
   */
  conversationHistory.push({
    role: "user",
    content: message
  });


  messageInput.value = "";

  setLoading(true);


  try {

    /*
     * Important:
     *
     * Don't send the current user message twice.
     *
     * `message` contains the current question.
     * `history` should contain only previous messages.
     */
    const previousHistory =
      conversationHistory.slice(0, -1);


    const response = await fetch(
      "/api/chat",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          message,
          history: previousHistory
        })
      }
    );


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data?.error?.message ||
        "Unable to generate response"
      );

    }


    const reply =
      data?.data?.reply;


    if (!reply) {

      throw new Error(
        "Server returned an empty response"
      );

    }


    /*
     * Display assistant response
     */
    addMessage(
      reply,
      "bot"
    );


    /*
     * Save assistant response
     */
    conversationHistory.push({
      role: "assistant",
      content: reply
    });


  } catch (error) {

    console.error(
      "Chat error:",
      error
    );


    addMessage(
      "Sorry, I'm unable to respond right now. Please try again.",
      "bot"
    );

  } finally {

    setLoading(false);

  }

});


/*
 * Create chat message
 */
function addMessage(
  text,
  sender
) {

  const row =
    document.createElement("div");


  row.classList.add(
    "message-row",
    sender === "user"
      ? "user-row"
      : "bot-row"
  );


  const message =
    document.createElement("div");


  message.classList.add(
    "message",
    sender === "user"
      ? "user-message"
      : "bot-message"
  );


  /*
   * Render the small subset of Markdown returned by the assistant while
   * keeping user/model content safe from HTML injection.
   */
  renderAssistantText(message, text);


  row.appendChild(message);

  messages.appendChild(row);


  scrollToBottom();

}


function renderAssistantText(
  element,
  text
) {
  const normalizedText = String(text)
    .replace(/&#x20;|&#32;/gi, " ")
    .replace(/&nbsp;/gi, " ");

  const parts = normalizedText.split(/(\*\*[^*]+\*\*)/g);

  parts.forEach((part) => {
    const boldMatch = part.match(/^\*\*(.+)\*\*$/s);

    if (boldMatch) {
      const strong = document.createElement("strong");
      strong.textContent = boldMatch[1];
      element.appendChild(strong);
      return;
    }

    element.appendChild(document.createTextNode(part));
  });
}


/*
 * Loading state
 */
function setLoading(
  isLoading
) {

  typingIndicator.classList.toggle(
    "hidden",
    !isLoading
  );


  messageInput.disabled =
    isLoading;


  sendButton.disabled =
    isLoading;


  if (!isLoading) {
    messageInput.focus();
  }


  scrollToBottom();

}


/*
 * Scroll messages to latest
 */
function scrollToBottom() {

  messages.scrollTop =
    messages.scrollHeight;

}
