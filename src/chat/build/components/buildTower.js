function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkInv(bot, height, material) {

    // Get the item on the inventory of the bot
    let item = bot.inventory.items().find(item => item.name === material);

    // If the bot haven't the item
    if (!item) {
        // Give the item
        bot.chat(`/give ${bot.username} minecraft:${material} ${height}`);

        // Wait 1 second for inventory update
        await sleep(1000);

        // Update the item var
        item = bot.inventory.items().find(item => item.name === material);

        // Wait 1 seconde
        // await sleep(1000);

        // Equip the item in hand
        await bot.equip(item, 'hand');
    }

}

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
        await checkInv(bot, height, blockMeta.name);

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

        await sleep(400); // Wait 0.5 seconde
    }

}


module.exports = {
    buildTower
}