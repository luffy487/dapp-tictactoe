import React, { useEffect, useState } from "react";

const Board = ({ gameId, game, account, player1, player2 }) => {
  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [turn, setTurn] = useState();
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setLoading(true);
    await setBoardAndTurn();
    setLoading(false);
  };

  const setBoardAndTurn = async () => {
    const [gameBoard, gameTurn] = await Promise.all([
      game.methods.getGameBoard(gameId).call(),
      game.methods.getGameTurn(gameId).call(),
    ]);
    setBoard(gameBoard);
    setTurn(gameTurn);
  };

  const makeMove = async (x, y) => {
    setLoad(true);
    if (turn.toString().toLowerCase() !== account.toString().toLowerCase()) {
      alert("It's not your turn");
      return;
    } else {
      try {
        let tx = await game.methods
          .makeMove(gameId, x, y)
          .send({ from: account });
        await tx.wait();
      } catch (err) {
        console.log("Error making move:", err);
      }
    }
    setLoad(false);
  };

  game.events.moveMade().on("data", async (data) => {
    if (data?.returnValues?.gameId === gameId) {
      await setBoardAndTurn();
    }
  });

  game.events.GameCompleted().on("data", async (data) => {
    if (data?.returnValues?.gameId === gameId) {
      if (data?.returnValues?.drawn) {
        alert("Game was drawn!");
      } else {
        if (
          data?.returnValues?.winner.toString().toLowerCase() ===
          account.toString().toLowerCase()
        ) {
          alert("You won!");
        } else {
          alert("You lose!");
        }
      }
    }
  });

  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
      {!loading ? (
        <div>
          {!load ? (
            <div>
              <div className="mb-2 text-lg font-semibold text-gray-200">
                {"Game Id: " + gameId.toString()}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {board.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`w-16 h-16 flex items-center justify-center border-2 ${
                        cell === 0
                          ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
                          : cell === 1
                          ? "bg-red-700 border-red-600 hover:bg-red-600"
                          : "bg-blue-700 border-blue-600 hover:bg-blue-600"
                      } rounded-lg cursor-pointer transition-colors duration-200`}
                      onClick={() => makeMove(rowIndex, colIndex)}
                    >
                      <span
                        className={`text-2xl font-bold ${
                          cell === 1
                            ? "text-white"
                            : cell === 2
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                      >
                        {cell.toString() === "1"
                          ? "X"
                          : cell.toString() === "2"
                          ? "O"
                          : ""}
                      </span>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-4 text-lg font-semibold text-gray-200">
                <div>
                  {"Your Symbol: " +
                    (player1.toString().toLowerCase() ===
                    account.toString().toLowerCase()
                      ? "X"
                      : "O")}
                </div>
                <div>
                  {"Turn: " +
                    (turn.toString().toLowerCase() ===
                    account.toString().toLowerCase()
                      ? "Your's"
                      : "Opponent's")}
                </div>
                <div>
                  {"Opponent: " +
                    (account.toString().toLowerCase() ==
                    player1.toString().toLowerCase()
                      ? player2.slice(0, 6) + "..." + player2.slice(-4)
                      : player1.slice(0, 6) + "..." + player1.slice(-4))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-3 gap-2 animate-pulse">
                {Array.from({ length: 3 }).map((_, rowIndex) => (
                  <React.Fragment key={rowIndex}>
                    {Array.from({ length: 3 }).map((_, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className="w-16 h-16 bg-gray-600 rounded-lg"
                      ></div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
              <div className="mt-4 text-lg font-semibold text-gray-300">
                Making your move...
              </div>
            </div>
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

export default Board;
