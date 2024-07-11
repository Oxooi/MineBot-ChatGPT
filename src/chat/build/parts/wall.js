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


    async function buildSquare(bot, startPos, x, y, defaultMove) {
        let direction = 1; // Commence par gauche à droite

        // Pour chaque couche
        for (let layer = 0; layer < y; layer++) {

            // Si la couche est paire, le bot commence par la gauche
            if (layer % 2 === 0) {
                direction = 1;
            } else { // Sinon, il commence par la droite
                direction = -1;
            }

            // Calcule la position de départ de chaque couche
            let layerStartPos = startPos.offset(0, 0, layer);

            for (let col = 0; col < x; col++) {
                // Détermine la position du bloc à placer
                let blockPos = layerStartPos.offset(col * direction, 0, 0);
                let blockType = getBlockTypeForPosition(col, layer, x, y);

                await prepare(blockType); // Prépare le type de bloc à placer
                await placeBlock(blockPos); // Place le bloc

                // Déplace le bot à la position suivante derrière le bloc qu'il vient de placer
                let nextBotPos = blockPos.offset(-direction, 0, -1); // Le bot reste derrière la construction
                bot.pathfinder.setMovements(defaultMove);
                bot.pathfinder.setGoal(new GoalBlock(nextBotPos.x, nextBotPos.y, nextBotPos.z));
                await bot.waitForTicks(10);
            }

            // Inverse la direction après chaque couche complète
            direction *= -1;
            // Recule le bot d'un bloc pour la prochaine couche
            startPos = startPos.offset(0, 0, -1);
        }
    }

    function getBlockTypeForPosition(col, layer, x, y) {
        // Vérifie si nous sommes sur la première couche et au milieu pour la porte
        if (layer === 0 && col === Math.floor(x / 2)) {
            return 'oak_door';
        }
        // Vérifie si c'est une bordure
        if (col === 0 || col === x - 1 || layer === 0 || layer === y - 1) {
            return 'cobblestone';
        }
        // Sinon, c'est un bloc intérieur
        return 'oak_log';
    }


    // Exemple d'utilisation : Construire une ligne de 10 blocs de pierre
    bot.on('chat', async (username, message) => {
        if (username === bot.username) return;

        if (message.startsWith('build wall')) {
            let length = parseInt(message.split(' ')[2]);
            let width = parseInt(message.split(' ')[3]);
            const mcData = require('minecraft-data')(bot.version);
            const defaultMove = new Movements(bot, mcData);
            const startPos = bot.entity.position.offset(1, 0, 0); // Ajustez pour la position correcte
            await buildSquare(bot, startPos, length, width, defaultMove);
            console.log("Construction du carré terminée !");
        }
    });


}