# MineBot-ChatGPT

## Overview

This project is a Minecraft bot, The bot is designed to perform various actions in the Minecraft environment & talking with the player using Chat-GPT API. 
You need to create a `.env` file at the root directory of the bot and enter your OpenAI API (there a example in the file : `.env.example.txt`

And its main entry point is defined in `src/index.js`

## Dependencies

The project relies on the following dependencies:

- **axios**: ^1.6.2
  - A promise-based HTTP client for making requests to external APIs.

- **dotenv**: ^16.3.1
  - Loads environment variables from a .env file into process.env, providing a convenient way to manage configuration.

- **express**: ^4.18.2
  - A minimalist web framework for Node.js, which might suggest the possibility of incorporating web server functionality.

- **mineflayer**: ^4.14.0
  - A Minecraft bot framework that facilitates interaction with the Minecraft game.

- **mineflayer-pathfinder**: ^2.4.5
  - A module that provides pathfinding capabilities for the Mineflayer bot.

- **node-fetch**: ^3.3.2
  - A lightweight module that brings window.fetch to Node.js, useful for making HTTP requests.

- **openai**: ^4.0.0
  - An API client for interacting with the OpenAI GPT model, indicating potential integration with natural language processing or AI capabilities.

- **vec3**: ^0.1.8
  - A 3D vector library, commonly used in Minecraft-related projects for spatial calculations.

- **ws**: ^8.14.2
  - A simple WebSocket implementation, suggesting that the bot may communicate with other systems or services using WebSocket.

## License

The project is licensed under the ISC License.
