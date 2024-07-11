const inv = require('./checkInv');
const timer = require('../../../utils/timer/sleep');

async function buildTower(bot, height, material) {

    let blockMeta = {
        id: null,
        name: null
    }

    switch (material) {
        case "pierre":
            blockMeta.id = "minecraft:stone";
            blockMeta.name = "stone";
            break;

        case "bois":
            blockMeta.id = "minecraft:oak_planks";
            blockMeta.name = "oak_planks";
            break;

        case "terre":
            blockMeta.id = "minecraft:dirt";
            blockMeta.name = "dirt";
            break;

        default:
            break;
    }


    for (let i = 0; i < height; i++) {
        // Check if the bot have the items
        await inv.checkInv(bot, height, blockMeta.name);

        // Start Jump
        bot.setControlState("jump", true);

        // Wait until the bot is high enough
        await bot.waitForTicks(5);

        // Place a block
        let sourcePosition = bot.entity.position.offset(0, -1.5, 0);
        let souceBlock = bot.blockAt(sourcePosition);

        let faceVector = { x: 0, y: 1, z: 0 };

        await bot.placeBlock(souceBlock, faceVector);

        // Stop jump
        bot.setControlState("jump", false);

        await timer.sleep(400); // Wait 0.5 seconde
    }

}


module.exports = {
    buildTower
}