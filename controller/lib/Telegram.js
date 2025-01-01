const { axiosInstance } = require("./axios");

function sendMessage(chatId, messageText, messageThreadId = null) {
    const params = {
        chat_id: chatId,
        text: messageText,
    };

    if (messageThreadId) {
        params.message_thread_id = messageThreadId;
    }

    return axiosInstance.get("sendMessage", params);
}

function handleNewMember(messageObj) {
    if (!messageObj || !messageObj.new_chat_members) {
        console.error("Invalid message object: Missing 'new_chat_members'");
        return;
    }

    const chatId = messageObj.chat.id;
    const newMembers = messageObj.new_chat_members || [];
    const messageThreadId = messageObj.message_thread_id || null;

    newMembers.forEach((member) => {
        const username = member.username || member.first_name || "New User";
        const messageText = `Welcome, ${username}! 🎉 We're glad to have you here.`;

        sendMessage(chatId, messageText, messageThreadId)
            .then(() => console.log(`Welcome message sent to ${username}`))
            .catch((err) => console.error("Error sending message:", err));
    });
}

module.exports = { handleNewMember };
