import { useEffect, useState } from "react";
import { GAME_ADDRESS } from "../utils/constants";

const JoinGame = ({ game, token, gameId, account }) => {
  const [player1, setPlayer1] = useState("");
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      let [player1, amount] = await Promise.all([
        game.methods.getGamePlayer1(gameId).call(),
        game.methods.getGameBetAmount(gameId).call(),
      ]);
      setPlayer1(player1);
      setAmount(amount);
      setLoading(false);
    };
    init();
  }, [game, gameId]);

  const joinGame = async () => {
    try {
      await token.methods.approve(GAME_ADDRESS, amount).send({ from: account });
      await game.methods.joinGame(gameId, amount).send({ from: account });
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-900 rounded-lg shadow-lg max-w-md w-full">
      {!loading ? (
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Game Details</h3>
          <p className="text-gray-300 mb-2">
            <span className="font-semibold text-white">Game ID:</span>{" "}
            {gameId.toString()}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-semibold text-white">Player 1:</span>{" "}
            {player1.slice(0, 6)}...{player1.slice(-4)}
          </p>
          <p className="text-gray-300 mb-4">
            <span className="font-semibold text-white">Bet Amount:</span>{" "}
            {amount.toString()}
          </p>
          {account.toString().toLowerCase() ===
          player1.toString().toLowerCase() ? (
            <p className="text-gray-400 font-semibold">
              Waiting for player-2 to join...
            </p>
          ) : (
            <button
              onClick={joinGame}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
              aria-disabled={loading}
            >
              {loading ? "Joining..." : "Join Game"}
            </button>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <svg
            className="animate-spin h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0114.284-3.372l-2.12 2.12a4 4 0 00-6.584 0L4 12z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default JoinGame;
