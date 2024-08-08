import { useEffect, useState } from "react";
import { GAME_ADDRESS } from "../utils/constants";
import JoinGame from "./JoinGame";
import Board from "./Board";

const Games = ({ account, game, token }) => {
  const [joinGames, setJoinGames] = useState([]);
  const [isUser, setIsUser] = useState(false);
  const [openBetAmount, setOpenBetAmount] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  const [activeGames, setActiveGames] = useState([]);
  const [activeTab, setActiveTab] = useState("myGames");

  useEffect(() => {
    const init = async () => {
      try {
        await Promise.all([setActiveAndNotStartedGames(), setUserStatus()]);
      } catch (error) {
        console.error("Error initializing Web3 or contracts", error);
      }
    };
    init();
  }, []);

  const setUserStatus = async () => {
    const isUser = await game.methods.isUser(account).call();
    setIsUser(isUser);
  };

  const setActiveAndNotStartedGames = async () => {
    const [notStartedGames, allActiveGames] = await Promise.all([
      game.methods.getNotStartedGames().call(),
      game.methods.getActiveGames().call(),
    ]);
    let thisActiveGames = [];
    await Promise.all(
      (allActiveGames || []).map(async (gm) => {
        thisActiveGames.push({
          gameId: gm,
          player1: await game.methods.getGamePlayer1(gm).call(),
          player2: await game.methods.getGamePlayer2(gm).call(),
        });
      })
    );
    setActiveGames(
      thisActiveGames.filter(
        (gm) =>
          gm.player1.toString().toLowerCase() ===
            account.toString().toLowerCase() ||
          gm.player2.toString().toLowerCase() ===
            account.toString().toLowerCase()
      )
    );
    setJoinGames(notStartedGames);
  };

  const signUp = async () => {
    try {
      await game.methods.userSignUp().send({ from: account });
      await setUserStatus();
    } catch (err) {
      console.log("signinup Error", err);
    }
  };

  const bet = async () => {
    try {
      setOpenBetAmount(false);
      await token.methods
        .approve(GAME_ADDRESS, betAmount)
        .send({ from: account });
      await game.methods
        .createGame(betAmount)
        .send({ from: account });
    } catch (err) {
      console.log("Error", err);
    }
  };

  game.events.GameStarted().on("data", async () => {
    await setActiveAndNotStartedGames();
  });

  game.events.GameCreated().on("data", async () => {
    await setActiveAndNotStartedGames();
  });

  return (
    <div className="relative min-h-screen text-gray-200">
  <button
    className="fixed mt-4 right-4 top-20 text-white px-4 py-2 rounded-md text-sm font-semibold bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    onClick={() => setOpenBetAmount(true)}
  >
    Create Game
  </button>

  {openBetAmount && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="p-6 rounded-lg shadow-lg w-80 z-60 bg-gray-800">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">
          Enter Bet Amount
        </h2>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          className="w-full px-4 py-2 mb-4 text-gray-800 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Bet amount in tokens"
        />
        <div className="flex justify-between">
          <button
            onClick={() => setOpenBetAmount(false)}
            className="bg-gray-600 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={bet}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Bet
          </button>
        </div>
      </div>
    </div>
  )}

  <div className="flex flex-col p-4">
    {isUser ? (
      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={() => setActiveTab("myGames")}
          className={`py-2 px-6 rounded-lg font-semibold transition-colors ${
            activeTab === "myGames"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-700 text-gray-200 hover:bg-gray-600"
          }`}
        >
          My Games
        </button>
        <button
          onClick={() => setActiveTab("findGame")}
          className={`py-2 px-6 rounded-lg font-semibold transition-colors ${
            activeTab === "findGame"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-700 text-gray-200 hover:bg-gray-600"
          }`}
        >
          Find Game
        </button>
      </div>
    ) : (
      <div className="w-full max-w-6xl mt-24 px-4 flex justify-center">
        <button
          onClick={signUp}
          className="text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          Sign Up
        </button>
      </div>
    )}

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {activeTab === "myGames" ? (
        activeGames.length > 0 ? (
          activeGames.map((gm, index) => (
            <div
              key={index}
              className="p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 bg-gray-700"
            >
              <Board
                gameId={gm.gameId}
                account={account}
                game={game}
                player1={gm.player1}
                player2={gm.player2}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400">
            No active games available
          </div>
        )
      ) : activeTab === "findGame" ? (
        joinGames.length > 0 ? (
          joinGames.map((gm, index) => (
            <div
              key={index}
              className="p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 bg-gray-700"
            >
              <JoinGame
                game={game}
                token={token}
                gameId={gm}
                account={account}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400">
            No games available to join
          </div>
        )
      ) : null}
    </div>
  </div>
</div>


  );
};

export default Games;
