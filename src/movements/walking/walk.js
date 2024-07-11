const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const { Vec3 } = require('vec3');

module.exports = (bot) => {

    bot.on('chat', (username, message) => {
        // If the message has sent by bot return
        if (username === bot.username) return;

        switch (message) {
            case 'right':
                moveBotRight(10, 'south');
                break;
            case 'left':
                moveBotLeft(10);
                break;
            case 'forward':
                moveBotForward(10);
                break;
            case 'backward':
                moveBotBackward(10);
                break;
            default:
                break;
        }


    });

    function moveBotRight(blocks) {
        // Obtenir la position et l'orientation actuelles du bot
        let currentPosition = bot.entity.position;
        let yaw = bot.entity.yaw;

        // Calculer la direction "droite" en fonction de l'orientation actuelle
        let rightDirection = new Vec3(-Math.sin(yaw), 0, Math.cos(yaw)).scaled(blocks); // Utiliser le paramètre pour la distance

        // Calculer la nouvelle position
        let newPosition = currentPosition.plus(rightDirection);

        // Déplacer le bot vers la nouvelle position
        bot.pathfinder.goto(new goals.GoalBlock(newPosition.floor().x, newPosition.floor().y, newPosition.floor().z));
    }

    function moveBotLeft(blocks) {

        // Get the current position of the bot
        let currentPosition = bot.entity.position;

        // Calculate the direction "left" (could vary with bot orientation)
        let direction = { x: -1, y: 0, z: 0 }; // West example

        // Calculate the new position
        let newPosition = currentPosition.offset(direction.x * blocks, direction.y * blocks, direction.z * blocks);

        // Move the bot
        bot.pathfinder.goto(new goals.GoalBlock(newPosition.x, newPosition.y, newPosition.z));

    }

    function moveBotForward(blocks) {

        // Get the current position of the bot
        let currentPosition = bot.entity.position;

        // Calculate the direction "forward" (could vary with bot orientation)
        let direction = { x: 0, y: 0, z: 1 }; // South example

        // Calculate the new position
        let newPosition = currentPosition.offset(direction.x * blocks, direction.y * blocks, direction.z * blocks);

        // Move the bot
        bot.pathfinder.goto(new goals.GoalBlock(newPosition.x, newPosition.y, newPosition.z));

    }

    function moveBotBackward(blocks) {

        // Get the current position of the bot
        let currentPosition = bot.entity.position;

        // Calculate the direction "backward" (could vary with bot orientation)
        let direction = { x: 0, y: 0, z: -1 }; // North example

        // Calculate the new position
        let newPosition = currentPosition.offset(direction.x * blocks, direction.y * blocks, direction.z * blocks);

        // Move the bot
        bot.pathfinder.goto(new goals.GoalBlock(newPosition.x, newPosition.y, newPosition.z));

    }



}