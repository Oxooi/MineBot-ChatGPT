const timer = require('../../../utils/timer/sleep');

async function checkInv(bot, height, material) {

    // Get the item on the inventory of the bot
    let item = bot.inventory.items().find(item => item.name === material);

    // If the bot haven't the item
    if (!item) {
        // Give the item
        bot.chat(`/give ${bot.username} minecraft:${material} ${height}`);

        // Wait 1 second for inventory update
        await timer.sleep(1000);

        // Update the item var
        item = bot.inventory.items().find(item => item.name === material);

        // Wait 1 seconde
        // await sleep(1000);

        // Equip the item in hand
        await bot.equip(item, 'hand');
    }

}

module.exports = {
    checkInv
}