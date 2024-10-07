function toggleChat() {
  const popup = document.getElementById("chatbot-popup");
  popup.classList.toggle("hidden");
}

function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();

  if (message) {
    // Append visitor's message to the chat body
    const chatBody = document.getElementById("chatbot-body");
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container", "visitor-message");
    messageContainer.innerHTML = `
    <img src="img/visitor.png" alt="User" class="avatar">
     
    
    <p>${message}</p>`;
    chatBody.appendChild(messageContainer);

    // Clear input field after sending
    input.value = "";

    // Scroll to the bottom of the chat
    chatBody.scrollTop = chatBody.scrollHeight;

    // Show loading animation for bot response
    setTimeout(() => {
      const typingContainer = document.createElement("div");
      typingContainer.classList.add("message-container", "typing");
      typingContainer.innerHTML = `
                <img src="img/user1.png" alt="Bot" class="avatar">
                <div class="typing-dots"></div>
                <div class="typing-dots"></div>
                <div class="typing-dots"></div>
            `;
      chatBody.appendChild(typingContainer);
      chatBody.scrollTop = chatBody.scrollHeight;

      // Remove typing dots and display bot message
      setTimeout(() => {
        chatBody.removeChild(typingContainer);

        const botMessage = document.createElement("div");
        botMessage.classList.add("message-container", "bot-message");
        const botText = "Thanks for reaching out! We'll assist you shortly.";

        botMessage.innerHTML = `<img src="img/user1.png" alt="Bot" class="avatar"><p></p>`;
        chatBody.appendChild(botMessage);
        chatBody.scrollTop = chatBody.scrollHeight;

        // Simulate typing by streaming message word by word
        streamText(botMessage.querySelector("p"), botText);
      }, 2000); // Delay for bot response
    }, 500); // Delay for showing typing dots
  }
}

function streamText(element, text) {
  const words = text.split(" ");
  let i = 0;

  const interval = setInterval(() => {
    if (i < words.length) {
      element.textContent += `${words[i]} `;
      i++;
    } else {
      clearInterval(interval);
    }
    // Scroll to the latest message
    const chatBody = document.getElementById("chatbot-body");
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 300);
}
