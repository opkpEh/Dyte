// Event listener for the chat form submission
document.getElementById('chat-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const input = document.getElementById('message-input');
    const message = input.value;
    if (message) {
        // Display user message
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message user-message';
        userMessageDiv.innerHTML = '<p>' + message + '</p>';
        document.getElementById('chat-container').appendChild(userMessageDiv);

        // Clear input field
        input.value = '';
        document.getElementById('chat-container').scrollTop = document.getElementById('chat-container').scrollHeight;

        try {
            const response = await fetch('/ask-me', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();

            // Display bot response
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'message bot-message';
            botMessageDiv.innerHTML = '<p>' + (data.message || 'Sorry, there was an error processing your request.') + '</p>';
            document.getElementById('chat-container').appendChild(botMessageDiv);
            document.getElementById('chat-container').scrollTop = document.getElementById('chat-container').scrollHeight;

        } catch (error) {
            console.error("Error calling /ask-me:", error);
            const errorMessageDiv = document.createElement('div');
            errorMessageDiv.className = 'message bot-message';
            errorMessageDiv.innerHTML = '<p>Sorry, there was an error processing your request.</p>';
            document.getElementById('chat-container').appendChild(errorMessageDiv);
            document.getElementById('chat-container').scrollTop = document.getElementById('chat-container').scrollHeight;
        }
    }
});
