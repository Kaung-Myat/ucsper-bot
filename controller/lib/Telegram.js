const { axiosInstance } = require("./axios");
const fs = require('fs');
const path = require('path');

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

function handleIncomingMessage(messageObj) {
    const chatId = messageObj.chat.id;
    const messageThreadId = messageObj.message_thread_id || null;
    const messageText = messageObj.text || "";

    const commandBaseDir = path.join(__dirname, "..", "..", "commands");

    if (messageText.startsWith("/")) {
        const command = messageText.substr(1).toLowerCase();

        const commandFilePath = path.join(commandBaseDir, `${command}.txt`);

        fs.readFile(commandFilePath, "utf8", (err, data) => {
            if (err) {
                console.error(`Error reading the file for command "${command}":`, err);
                return sendMessage(chatId, `Error: Unable to process the command "${command}".`, messageThreadId)
                    .catch((err) => console.error("Error sending message:", err));
            }

            return sendMessage(chatId, data.trim(), messageThreadId)
                .then(() => console.log(`Message for command "${command}" sent successfully`))
                .catch((err) => console.error("Error sending message:", err));
        });
    }
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
        const greetingText = `မင်္ဂလာပါ, ${username} 🎉။ UCSP Flutter Class ကနေ ကြိုဆိုပါတယ်😊။`;

        sendMessage(chatId, greetingText, messageThreadId)
            .then(() => console.log(`Welcome message sent to ${username}`))
            .catch((err) => console.error("Error sending message:", err));
    });



}

module.exports = { handleIncomingMessage, handleNewMember };
