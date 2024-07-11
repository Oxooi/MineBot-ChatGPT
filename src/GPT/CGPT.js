require('dotenv').config();

// OpenAI Config
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

async function askChatGPT(message) {
    try {

        // Get the user message to create a prompt
        const prompt = message;

        // Init the conversation 
        let conversationLog = [
            {
                "role": "system",
                "content": "Tu es un bot minecraft, et tu un expert dans le jeu. Tu dois parler comme si tu étais un joueur normal et de manière courte"
            },
            {
                "role": "user",
                "content": prompt
            }
        ];

        // Generate a response from Openai API
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            messages: conversationLog,
            max_tokens: 50
        });

        const answer = chatCompletion.choices[0].message.content;
        return answer;

    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    askChatGPT
}