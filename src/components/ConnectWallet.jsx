import React, { useState } from "react";
import Games from "./Games";
import Web3 from "web3";
import {
  GAME_ABI,
  GAME_ADDRESS,
  TOKEN_ABI,
  TOKEN_ADDRESS,
} from "../utils/constants";

const ConnectWallet = () => {
  const [account, setAccount] = useState();
  const [game, setGame] = useState(null);
  const [token, setToken] = useState(null);

  const connect = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const gameContract = new web3.eth.Contract(GAME_ABI, GAME_ADDRESS);
      const tokenContract = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);
      setGame(gameContract);
      setToken(tokenContract);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } else {
    }
  };

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-primary to-secondary">
      <header className="bg-gradient-to-r from-primary via-secondary to-primary text-gray-200 py-4 px-6 shadow-md flex items-center justify-between w-full fixed top-0 z-10">
        <img
          src="/tictactoe.png"
          className="w-12 h-12 mr-2"
          alt="Tic Tac Toe Logo"
        />
        <h1 className="text-3xl font-bold">Crypto Tic Tac Toe</h1>
        {account ? (
          <span className="bg-secondary text-gray-200 px-4 py-2 rounded-xl text-lg font-semibold flex items-center">
            <img
              src="/address.svg"
              alt="Wallet Icon"
              className="w-6 h-6 mr-2"
            />
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        ) : (
          <button
            onClick={connect}
            className="bg-highlight text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            Connect Wallet
          </button>
        )}
      </header>

      <main className="flex-1 flex items-center justify-center pt-20">
        {account ? (
          <Games account={account} game={game} token={token} />
        ) : (
          <div className="text-center text-gray-200">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Welcome to Crypto Tic Tac Toe!
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Play a game of Tic Tac Toe and bet your crypto tokens. Compete
              with friends or challenge random opponents for a chance to win
              big!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ConnectWallet;
