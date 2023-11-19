const gpt = require('../GPT/CGPT');

module.exports = (bot) => {

    bot.on('chat', async (username, message) => {

        // If the message has sent by bot return
        if (username === bot.username) return;

        // Ask to GPT & get the answer
        const answer = await gpt.askChatGPT(message);

        // Reply to the message
        bot.chat(answer);

    });

}