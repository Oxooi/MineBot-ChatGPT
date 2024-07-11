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
                let chatReponse = await gpt.askChatGPT(message);
                const p = target.position;
                switch (true) {
                    case chatReponse.includes('suivre'):
                    case chatReponse.includes('suis'):
                        bot.pathfinder.setMovements(defaultMove);
                        bot.pathfinder.setGoal(new GoalNear(p.x, p.y, p.z, 1));
                        break;
                    case chatReponse.includes('stop'):
                        bot.pathfinder.setGoal(null);
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error(error);
            }
        });
    });

};
