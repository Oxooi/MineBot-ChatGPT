const gpt = require('../../GPT/CGPT');

module.exports = (bot) => {
    const pathfinder = require('mineflayer-pathfinder').pathfinder
    const Movements = require('mineflayer-pathfinder').Movements
    const { GoalNear } = require('mineflayer-pathfinder').goals

    bot.loadPlugin(pathfinder);

    bot.once('spawn', () => {
        const defaultMove = new Movements(bot);

        bot.on('chat', async (username, message) => {
            if (username === bot.username) return;

            const target = bot.players[username] ? bot.players[username].entity : null;
            if (!target) {
                bot.chat('Je ne te vois pas');
                return;
            }

            try {
                const chatReponse = await gpt.askChatGPT(message);

                if (chatReponse.includes("suivre") || chatReponse.includes("suis")) {
                    const p = target.position;
                    bot.pathfinder.setMovements(defaultMove);
                    bot.pathfinder.setGoal(new GoalNear(p.x, p.y, p.z, 1));
                }
            } catch (error) {
                console.error(error);
            }
        });
    });

};
