document.addEventListener("DOMContentLoaded", () => {
  const chatbox = document.querySelector(".chatbox");
  const userInput = document.querySelector("#user-input");
  const sendBtn = document.querySelector("#send-btn");
  const chatbotToggler = document.querySelector(".chatbot-toggler");
  const chatbot = document.querySelector(".chatbot");
  const closeBtn = document.querySelector(".close-btn");

  chatbotToggler.addEventListener("click", () => {
      chatbot.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
      chatbot.style.display = "none";
  });

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          sendMessage();
      }
  });

  function sendMessage() {
      const message = userInput.value.trim();
      if (message === "") return;

      addMessageToChat("user", message);
      userInput.value = "";

      setTimeout(() => {
          const response = getBotResponse(message);
          addMessageToChat("bot", response);
      }, 500);
  }

  function addMessageToChat(type, message) {
      const chatMessage = document.createElement("li");
      chatMessage.classList.add("chat", type === "user" ? "outgoing" : "incoming");
      chatMessage.innerHTML = `<p>${message}</p>`;
      chatbox.appendChild(chatMessage);
      chatbox.scrollTop = chatbox.scrollHeight;
  }

  function getBotResponse(input) {
      const lowerInput = input.toLowerCase();

      const responses = {
          "hello": "Hello! How can I assist you today?",
          "hi": "Hi there! What can I do for you?",
          "how are you": "I'm just a bot, but I'm doing great! How about you?",
          "what is your name": "I'm a chatbot created to assist you!",
          "bye": "Goodbye! Have a great day!",
          "default": "I'm not sure I understand. Can you try asking something else?"
      };

      for (const keyword in responses) {
          if (lowerInput.includes(keyword)) {
              return responses[keyword];
          }
      }

      return responses["default"];
  }
});
