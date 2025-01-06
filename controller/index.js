const { handleNewMember, handleIncomingMessage } = require('./lib/Telegram');

async function handler(req) {
    const { body } = req;

    console.log("Incoming Payload:", JSON.stringify(body, null, 2)); // Debug log

    if (body && body.message) {
        const messageObj = body.message;

        // Handle new member joining
        if (messageObj.new_chat_members) {
            await handleNewMember(messageObj);
        } else {
            // Handle direct messages or other commands
            await handleIncomingMessage(messageObj);
        }
    } else {
        console.error("Invalid payload: No 'message' property in the request body");
    }
}

module.exports = { handler };
