# Crypto Tic Tac Toe

## Overview

Crypto Tic Tac Toe is a decentralized Tic Tac Toe game built on the Ethereum blockchain. Players can create games, join games, and place bets using ERC20 tokens. This project combines blockchain technology with a classic game, offering a unique gaming experience.

## Features

- **Blockchain Integration**: Utilize Ethereum smart contracts to manage game logic and player interactions.
- **Token Betting**: Players can bet ERC20 tokens on the outcome of the game.
- **Multi-Signature Wallet**: Enhanced security with multi-signature transactions.
- **User Interface**: Modern and responsive UI with a consistent design using Tailwind CSS.

## Technologies Used

- **React**: For building the user interface.
- **Tailwind CSS**: For styling the application.
- **Solidity**: For writing Ethereum smart contracts.
- **Web3.js**: For interacting with the Ethereum blockchain.
- **Ethereum**: For deploying and interacting with smart contracts.
- **Foundry**: For smart contract development and testing.

## Getting Started

### Prerequisites

1. **Ethereum Wallet**: MetaMask or another Ethereum wallet for interacting with the blockchain.

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/crypto-tic-tac-toe.git
    cd crypto-tic-tac-toe
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Compile and Deploy Smart Contracts**

    Ensure you have Foundry installed and configured. Compile and deploy the smart contracts using Foundry.

    ```bash
    forge build
    forge deploy
    ```

4. **Configure Environment Variables**

    Create a `.env` file in the root directory and add the following:

    ```env
    REACT_APP_CONTRACT_ADDRESS=your_contract_address
    REACT_APP_TOKEN_ADDRESS=your_token_address
    ```

5. **Run the Application**

    ```bash
    npm start
    ```

    Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

1. **Sign Up**: Click the "Sign Up" button to register as a user.
2. **Create Game**: Click the "Create Game" button to start a new game with a specified bet amount.
3. **Join Game**: Browse available games and join one to participate.
4. **Play Game**: Once in a game, make your moves on the board and interact with other players.

## Project Structure

- `src/`: Contains all the React components and application logic.
- `contracts/`: Contains Solidity smart contracts for the game and token.
- `public/`: Contains public assets and the HTML template.
- `tailwind.config.js`: Tailwind CSS configuration file.

## Contributing

1. **Fork the Repository**: Create your own fork of the repository.
2. **Create a Branch**: Create a feature branch for your changes.

    ```bash
    git checkout -b feature/your-feature
    ```

3. **Make Changes**: Implement your changes or new features.
4. **Commit Changes**: Commit your changes with a descriptive message.

    ```bash
    git commit -am 'Add some feature'
    ```

5. **Push Changes**: Push your changes to your forked repository.

    ```bash
    git push origin feature/your-feature
    ```

6. **Create a Pull Request**: Open a pull request to merge your changes into the main repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/) - For building the user interface.
- [Tailwind CSS](https://tailwindcss.com/) - For styling the application.
- [Foundry](https://book.getfoundry.sh/) - For smart contract development and testing.
