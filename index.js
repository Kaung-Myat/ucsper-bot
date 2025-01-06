const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 4040;
const { handler } = require('./controller');

const app = express();

app.use(express.json());

app.post("*", async (req, res) => {
    await handler(req);
    res.sendStatus(200);
});

app.get("*", async (req, res) => {
    res.status(200).send("Bot is running");
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server is listening on PORT ", PORT);
});

module.exports = app;
