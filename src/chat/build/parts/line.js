const vec3 = require('vec3');
const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const { GoalBlock } = goals;
const time = require('../../../utils/timer/sleep');

module.exports = (bot) => {

    bot.loadPlugin(pathfinder);

    // Gestion des erreurs
    bot.on('error', err => console.log('Erreur :', err));
    bot.on('end', () => console.log('Bot déconnecté'));

    // Fonction pour préparer le bloc dans la main du bot
    async function prepare(blockName) {
        if (bot.heldItem && bot.heldItem.name === blockName) return true;

        const equipBlock = bot.inventory.items().find(item => item.name === blockName);
        if (!equipBlock) {
            console.log(`Le bloc ${blockName} n'est pas dans l'inventaire.`);
            return false;
        }

        await bot.equip(equipBlock, 'hand');
        return true;
    }

    // Fonction pour placer un bloc
    async function placeBlock(position) {
        try {
            const referenceBlock = bot.blockAt(position.offset(0, -1, 0)); // Bloc à côté de la position ciblée
            if (referenceBlock && referenceBlock.type !== 0) { // Vérifie si le bloc sous est solide
                await bot.placeBlock(referenceBlock, vec3(0, 1, 0));
                return true;
            } else {
                console.log("Impossible de placer le bloc ici :", position);
                return false;
            }
        } catch (err) {
            console.log('Erreur lors du placement du bloc :', err);
            return false;
        }
    }


    // Adapte la fonction pour retourner des informations sur les blocs
    function generateLineBlocks(x, startPos) {
        let blocks = [];
        let middle = Math.floor(x / 2);

        for (let i = 0; i < x; i++) {
            let blockType;
            if (i === middle) {
                blockType = 'oak_door';
            } else {
                blockType = (i === 0 || i === x - 1) ? 'oak_log' : 'cobblestone';
            }
            blocks.push({ position: startPos.offset(i, 0, 0), type: blockType });
        }
        return blocks;
    }

    async function buildLineWithBlocks(startPos, length, defaultMove) {
        const lineBlocks = generateLineBlocks(length, startPos);

        for (let i = 0; i < lineBlocks.length; i++) {
            const block = lineBlocks[i];
            let success = await prepare(block.type);
            if (!success) continue;
            await placeBlock(block.position);
            await bot.waitForTicks(10);

            // Déplace le bot à un bloc derrière la position actuelle du bloc
            const botPosition = startPos.offset(i, 0, -1); // -1 pour rester derrière le bloc
            bot.pathfinder.setMovements(defaultMove);
            bot.pathfinder.setGoal(new GoalBlock(botPosition.x, botPosition.y, botPosition.z));

            await bot.waitForTicks(5); // Attendez que le bot se déplace
        }

        // Déplacer le bot à la fin de la ligne pour éviter de bloquer la construction
        const endPosition = startPos.offset(length, 0, -1);
        bot.pathfinder.setMovements(defaultMove);
        bot.pathfinder.setGoal(new GoalBlock(endPosition.x, endPosition.y, endPosition.z));
    }



    // Exemple d'utilisation : Construire une ligne de 10 blocs de pierre
    bot.on('chat', async (username, message) => {
        if (username === bot.username) return;

        if (message.startsWith('build line')) {
            let length = parseInt(message.split(' ')[2]);
            const mcData = require('minecraft-data')(bot.version);
            const defaultMove = new Movements(bot, mcData);
            const startPos = bot.entity.position.offset(1, 0, 0); // Ajustez pour la position correcte
            await buildLineWithBlocks(startPos, length, defaultMove);
            console.log("Construction terminée !");
        }
    });


}