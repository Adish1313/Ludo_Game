"use client"

import { motion } from "framer-motion"

export default function PlayerInfo({ players, currentPlayer, winner, runnerUps }) {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-xl border-2 border-amber-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-center text-amber-800 dark:text-amber-300">Players</h2>

      <div className="space-y-4">
        {players.map((player, index) => {
          const isCurrentPlayer = index === currentPlayer
          const isWinner = winner === index
          const runnerUpPosition = runnerUps.indexOf(index) + 2 // +2 because winner is position 1

          return (
            <motion.div
              key={player.id}
              className={`p-4 rounded-xl border-2 ${
                isCurrentPlayer && !winner ? "border-yellow-400 dark:border-yellow-500" : "border-transparent"
              } ${
                player.color === "red"
                  ? "bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40"
                  : player.color === "blue"
                    ? "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40"
                    : player.color === "green"
                      ? "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40"
                      : "bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40"
              }`}
              style={{
                boxShadow:
                  isCurrentPlayer && !winner
                    ? "0 4px 12px rgba(250, 204, 21, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)"
                    : "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
              }}
              animate={{
                scale: isCurrentPlayer && !winner ? [1, 1.02, 1] : 1,
                boxShadow:
                  isCurrentPlayer && !winner
                    ? [
                        "0 4px 12px rgba(250, 204, 21, 0.4)",
                        "0 4px 12px rgba(250, 204, 21, 0.6)",
                        "0 4px 12px rgba(250, 204, 21, 0.4)",
                      ]
                    : "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      player.color === "red"
                        ? "bg-gradient-to-br from-red-400 to-red-600"
                        : player.color === "blue"
                          ? "bg-gradient-to-br from-blue-400 to-blue-600"
                          : player.color === "green"
                            ? "bg-gradient-to-br from-green-400 to-green-600"
                            : "bg-gradient-to-br from-yellow-400 to-yellow-600"
                    }`}
                    style={{
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
                      border: "2px solid rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    {player.color.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                    {player.color.charAt(0).toUpperCase() + player.color.slice(1)}
                  </h3>
                </div>

                {isWinner && (
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    Winner! 🏆
                  </div>
                )}

                {runnerUpPosition > 0 && (
                  <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    #{runnerUpPosition}
                  </div>
                )}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="bg-white/50 dark:bg-black/20 p-2 rounded-lg shadow-inner">
                  <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    <span className="font-bold">In Base:</span>{" "}
                    {player.tokens.filter((t) => t.position === "base").length}
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-black/20 p-2 rounded-lg shadow-inner">
                  <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    <span className="font-bold">In Play:</span>{" "}
                    {player.tokens.filter((t) => t.position !== "base" && t.position !== "home").length}
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-black/20 p-2 rounded-lg shadow-inner">
                  <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    <span className="font-bold">Home:</span> {player.homeCount}
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-black/20 p-2 rounded-lg shadow-inner">
                  <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    <span className="font-bold">Status:</span>{" "}
                    {isWinner
                      ? "Winner"
                      : runnerUpPosition > 0
                        ? `#${runnerUpPosition}`
                        : isCurrentPlayer
                          ? "Playing"
                          : "Waiting"}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
