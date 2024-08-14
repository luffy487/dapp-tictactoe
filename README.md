# Ethereum Smart Contract Game with Solidity, Foundry, and React.js

## Overview

This project implements a simple game on the Ethereum blockchain using Solidity for the smart contract, Foundry for development, and React.js for the user interface (UI). The game allows users to connect their wallets via Metamask, create or join a game, and bet ERC-20 tokens. The game is designed for two players, and the winner takes the total bet amount. If the game ends in a draw, the bet amount is returned to each player.

## Flow

![Game Flow](/public/flow.png)

## Features

- **Wallet Integration**: Users can connect their Ethereum wallets directly through the UI using Metamask.
- **Game Creation**: Users can create a new game by specifying the ERC-20 token contract address and the bet amount.
- **Join Game**: Other users can join an existing game by choosing the bet amount and the same ERC-20 tokens.
- **Gameplay**: The game requires two players. The winner takes the total bet amount, or if it's a draw, the bet amount is returned to each player.
- **Token Transfer**: The smart contract manages the transfer of ERC-20 tokens securely.

## Project Structure

- **Smart Contract**: Built using [Solidity](https://soliditylang.org/) with [Foundry](https://book.getfoundry.sh/) for developing, testing, and deploying the game logic and token handling.  
  You can view the smart contract code [in this repository](https://github.com/luffy487/tic-tac-toe).

- **Frontend**: Developed with [React.js](https://reactjs.org/) for creating the UI.

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Foundry](https://book.getfoundry.sh/getting-started/installation) (for smart contract development and testing)
- [React.js](https://reactjs.org/docs/getting-started.html) (for frontend)
- [Metamask](https://metamask.io/) or other Ethereum-compatible wallets.
