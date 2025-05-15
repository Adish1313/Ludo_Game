"use client"

import { useCallback } from "react"
import { motion } from "framer-motion"
import { redPath } from "@/lib/paths/red-path"
import { bluePath } from "@/lib/paths/blue-path"
import { greenPath } from "@/lib/paths/green-path"
import { yellowPath } from "@/lib/paths/yellow-path"

// Cell size in pixels
const CELL_SIZE = 40

// Safe cells
const SAFE_CELLS = ["red-0", "blue-0", "green-0", "yellow-0", "red-8", "blue-8", "green-8", "yellow-8"]

export default function LudoBoard({ gameState, moveToken, isValidMove }) {
  // Get cell position from path index
  const getCellPosition = useCallback((color, position) => {
    if (position === "base") {
      // Base positions for each color
      const basePositions = {
        red: [
          { top: 1 * CELL_SIZE, left: 1 * CELL_SIZE },
          { top: 1 * CELL_SIZE, left: 3 * CELL_SIZE },
          { top: 3 * CELL_SIZE, left: 1 * CELL_SIZE },
          { top: 3 * CELL_SIZE, left: 3 * CELL_SIZE },
        ],
        blue: [
          { top: 1 * CELL_SIZE, left: 11 * CELL_SIZE },
          { top: 1 * CELL_SIZE, left: 13 * CELL_SIZE },
          { top: 3 * CELL_SIZE, left: 11 * CELL_SIZE },
          { top: 3 * CELL_SIZE, left: 13 * CELL_SIZE },
        ],
        green: [
          { top: 11 * CELL_SIZE, left: 11 * CELL_SIZE },
          { top: 11 * CELL_SIZE, left: 13 * CELL_SIZE },
          { top: 13 * CELL_SIZE, left: 11 * CELL_SIZE },
          { top: 13 * CELL_SIZE, left: 13 * CELL_SIZE },
        ],
        yellow: [
          { top: 11 * CELL_SIZE, left: 1 * CELL_SIZE },
          { top: 11 * CELL_SIZE, left: 3 * CELL_SIZE },
          { top: 13 * CELL_SIZE, left: 1 * CELL_SIZE },
          { top: 13 * CELL_SIZE, left: 3 * CELL_SIZE },
        ],
      }

      return basePositions[color]
    }

    if (position === "home") {
      // Center home position
      return { top: 7 * CELL_SIZE, left: 7 * CELL_SIZE }
    }

    // Get the path for the color
    const path = color === "red" ? redPath : color === "blue" ? bluePath : color === "green" ? greenPath : yellowPath

    // Get the cell ID from the path
    const cellId = path[position]

    // Parse the cell ID to get coordinates
    if (
      cellId.startsWith("red") ||
      cellId.startsWith("blue") ||
      cellId.startsWith("green") ||
      cellId.startsWith("yellow")
    ) {
      // Home path cells
      if (cellId.startsWith("redH")) {
        const index = Number.parseInt(cellId.slice(4))
        return { top: (7 - index) * CELL_SIZE, left: 7 * CELL_SIZE }
      }
      if (cellId.startsWith("blueH")) {
        const index = Number.parseInt(cellId.slice(5))
        return { top: 7 * CELL_SIZE, left: (7 + index) * CELL_SIZE }
      }
      if (cellId.startsWith("greenH")) {
        const index = Number.parseInt(cellId.slice(6))
        return { top: (7 + index) * CELL_SIZE, left: 7 * CELL_SIZE }
      }
      if (cellId.startsWith("yellowH")) {
        const index = Number.parseInt(cellId.slice(7))
        return { top: 7 * CELL_SIZE, left: (7 - index) * CELL_SIZE }
      }

      // Start cells
      if (cellId === "red-0") return { top: 6 * CELL_SIZE, left: 1 * CELL_SIZE }
      if (cellId === "blue-0") return { top: 1 * CELL_SIZE, left: 8 * CELL_SIZE }
      if (cellId === "green-0") return { top: 8 * CELL_SIZE, left: 13 * CELL_SIZE }
      if (cellId === "yellow-0") return { top: 13 * CELL_SIZE, left: 6 * CELL_SIZE }
    }

    // Main path cells (this is a simplified example)
    // In a real implementation, you would map each cell ID to its coordinates
    const mainPathCoordinates = {
      // Red path (first 13 cells)
      "cell-0": { top: 6 * CELL_SIZE, left: 1 * CELL_SIZE },
      "cell-1": { top: 6 * CELL_SIZE, left: 2 * CELL_SIZE },
      "cell-2": { top: 6 * CELL_SIZE, left: 3 * CELL_SIZE },
      "cell-3": { top: 6 * CELL_SIZE, left: 4 * CELL_SIZE },
      "cell-4": { top: 6 * CELL_SIZE, left: 5 * CELL_SIZE },
      "cell-5": { top: 5 * CELL_SIZE, left: 6 * CELL_SIZE },
      "cell-6": { top: 4 * CELL_SIZE, left: 6 * CELL_SIZE },
      "cell-7": { top: 3 * CELL_SIZE, left: 6 * CELL_SIZE },
      "cell-8": { top: 2 * CELL_SIZE, left: 6 * CELL_SIZE },
      "cell-9": { top: 1 * CELL_SIZE, left: 6 * CELL_SIZE },
      "cell-10": { top: 1 * CELL_SIZE, left: 7 * CELL_SIZE },
      "cell-11": { top: 1 * CELL_SIZE, left: 8 * CELL_SIZE },

      // Blue path (next 13 cells)
      "cell-12": { top: 2 * CELL_SIZE, left: 8 * CELL_SIZE },
      "cell-13": { top: 3 * CELL_SIZE, left: 8 * CELL_SIZE },
      "cell-14": { top: 4 * CELL_SIZE, left: 8 * CELL_SIZE },
      "cell-15": { top: 5 * CELL_SIZE, left: 8 * CELL_SIZE },
      "cell-16": { top: 6 * CELL_SIZE, left: 8 * CELL_SIZE },
      "cell-17": { top: 6 * CELL_SIZE, left: 9 * CELL_SIZE },
      "cell-18": { top: 6 * CELL_SIZE, left: 10 * CELL_SIZE },
      "cell-19": { top: 6 * CELL_SIZE, left: 11 * CELL_SIZE },
      "cell-20": { top: 6 * CELL_SIZE, left: 12 * CELL_SIZE },
      "cell-21": { top: 6 * CELL_SIZE, left: 13 * CELL_SIZE },
      "cell-22": { top: 7 * CELL_SIZE, left: 13 * CELL_SIZE },
      "cell-23": { top: 8 * CELL_SIZE, left: 13 * CELL_SIZE },

      // Green path (next 13 cells)
      "cell-24": { top: 8 * CELL_SIZE, left: 12 * CELL_SIZE },
      "cell-25": { top: 8 * CELL_SIZE, left: 11 * CELL_SIZE },
      "cell-26": { top: 8 * CELL_SIZE, left: 10 * CELL_SIZE },
      "cell-27": { top: 8 * CELL_SIZE, left: 9 * CELL_SIZE },
      "cell-28": { top: 8 * CELL_SIZE, left: 8 * CELL_SIZE },
      "cell-29": { top: 9 * CELL_SIZE, left: 8 * CELL_SIZE },
      "cell-30": { top: 10 * CELL_SIZE, left: 8 * CELL_SIZE },
      "cell-31": { top: 11 * CELL_SIZE, left: 8 * CELL_SIZE },
      "cell-32": { top: 12 * CELL_SIZE, left: 8 * CELL_SIZE },
      "cell-33": { top: 13 * CELL_SIZE, left: 8 * CELL_SIZE },
      "cell-34": { top: 13 * CELL_SIZE, left: 7 * CELL_SIZE },
      "cell-35": { top: 13 * CELL_SIZE, left: 6 * CELL_SIZE },

      // Yellow path (next 13 cells)
      "cell-36": { top: 12 * CELL_SIZE, left: 6 * CELL_SIZE },
      "cell-37": { top: 11 * CELL_SIZE, left: 6 * CELL_SIZE },
      "cell-38": { top: 10 * CELL_SIZE, left: 6 * CELL_SIZE },
      "cell-39": { top: 9 * CELL_SIZE, left: 6 * CELL_SIZE },
      "cell-40": { top: 8 * CELL_SIZE, left: 6 * CELL_SIZE },
      "cell-41": { top: 8 * CELL_SIZE, left: 5 * CELL_SIZE },
      "cell-42": { top: 8 * CELL_SIZE, left: 4 * CELL_SIZE },
      "cell-43": { top: 8 * CELL_SIZE, left: 3 * CELL_SIZE },
      "cell-44": { top: 8 * CELL_SIZE, left: 2 * CELL_SIZE },
      "cell-45": { top: 8 * CELL_SIZE, left: 1 * CELL_SIZE },
      "cell-46": { top: 7 * CELL_SIZE, left: 1 * CELL_SIZE },
      "cell-47": { top: 6 * CELL_SIZE, left: 1 * CELL_SIZE },
    }

    return mainPathCoordinates[cellId] || { top: 0, left: 0 }
  }, [])

  // Render tokens for a player
  const renderTokens = useCallback(
    (player, playerId) => {
      return player.tokens.map((token, tokenId) => {
        // Get position based on token state
        if (token.position === "base") {
          const positions = getCellPosition(player.color, "base")
          const position = positions[tokenId]

          return (
            <motion.div
              key={`${player.color}-${tokenId}`}
              className={`absolute w-8 h-8 rounded-full 
                      ${
                        playerId === gameState.currentPlayer &&
                        gameState.gameStatus === "selecting" &&
                        isValidMove(tokenId)
                          ? "cursor-pointer ring-4 ring-yellow-300 ring-opacity-70"
                          : "cursor-default"
                      }
                      border-2 border-white shadow-xl z-10
                      flex items-center justify-center text-white font-bold
                      ${
                        player.color === "red"
                          ? "bg-gradient-to-br from-red-400 to-red-600"
                          : player.color === "blue"
                            ? "bg-gradient-to-br from-blue-400 to-blue-600"
                            : player.color === "green"
                              ? "bg-gradient-to-br from-green-400 to-green-600"
                              : "bg-gradient-to-br from-yellow-400 to-yellow-600"
                      }`}
              style={{
                top: position.top,
                left: position.left,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.5)",
              }}
              animate={{
                top: position.top,
                left: position.left,
                scale: token.isMoving ? 1.2 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => {
                if (
                  playerId === gameState.currentPlayer &&
                  gameState.gameStatus === "selecting" &&
                  isValidMove(tokenId)
                ) {
                  moveToken(tokenId)
                }
              }}
              whileHover={
                playerId === gameState.currentPlayer && gameState.gameStatus === "selecting" && isValidMove(tokenId)
                  ? { scale: 1.2, y: -5, boxShadow: "0 8px 12px rgba(0, 0, 0, 0.4)" }
                  : {}
              }
            >
              {tokenId + 1}
            </motion.div>
          )
        } else if (token.position === "home") {
          const position = getCellPosition(player.color, "home")

          return (
            <motion.div
              key={`${player.color}-${tokenId}`}
              className={`absolute w-6 h-6 rounded-full 
                      border-2 border-white shadow-xl
                      flex items-center justify-center text-white font-bold
                      ${
                        player.color === "red"
                          ? "bg-gradient-to-br from-red-400 to-red-600"
                          : player.color === "blue"
                            ? "bg-gradient-to-br from-blue-400 to-blue-600"
                            : player.color === "green"
                              ? "bg-gradient-to-br from-green-400 to-green-600"
                              : "bg-gradient-to-br from-yellow-400 to-yellow-600"
                      }`}
              style={{
                top: position.top + tokenId * 5,
                left: position.left + tokenId * 5,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.5)",
              }}
              animate={{
                top: position.top + tokenId * 5,
                left: position.left + tokenId * 5,
                scale: token.isMoving ? 1.2 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {tokenId + 1}
            </motion.div>
          )
        } else {
          // Token is on the board
          const path =
            player.color === "red"
              ? redPath
              : player.color === "blue"
                ? bluePath
                : player.color === "green"
                  ? greenPath
                  : yellowPath

          const position = getCellPosition(player.color, token.position)

          return (
            <motion.div
              key={`${player.color}-${tokenId}`}
              className={`absolute w-8 h-8 rounded-full 
                      ${
                        playerId === gameState.currentPlayer &&
                        gameState.gameStatus === "selecting" &&
                        isValidMove(tokenId)
                          ? "cursor-pointer ring-4 ring-yellow-300 ring-opacity-70"
                          : "cursor-default"
                      }
                      border-2 border-white shadow-xl z-10
                      flex items-center justify-center text-white font-bold
                      ${
                        player.color === "red"
                          ? "bg-gradient-to-br from-red-400 to-red-600"
                          : player.color === "blue"
                            ? "bg-gradient-to-br from-blue-400 to-blue-600"
                            : player.color === "green"
                              ? "bg-gradient-to-br from-green-400 to-green-600"
                              : "bg-gradient-to-br from-yellow-400 to-yellow-600"
                      }`}
              style={{
                top: position.top,
                left: position.left,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.5)",
              }}
              animate={{
                top: position.top,
                left: position.left,
                scale: token.isMoving ? 1.2 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => {
                if (
                  playerId === gameState.currentPlayer &&
                  gameState.gameStatus === "selecting" &&
                  isValidMove(tokenId)
                ) {
                  moveToken(tokenId)
                }
              }}
              whileHover={
                playerId === gameState.currentPlayer && gameState.gameStatus === "selecting" && isValidMove(tokenId)
                  ? { scale: 1.2, y: -5, boxShadow: "0 8px 12px rgba(0, 0, 0, 0.4)" }
                  : {}
              }
            >
              {tokenId + 1}
            </motion.div>
          )
        }
      })
    },
    [
      gameState.currentPlayer,
      gameState.gameStatus,
      getCellPosition,
      isValidMove,
      moveToken,
      redPath,
      bluePath,
      greenPath,
      yellowPath,
    ],
  )

  // Render the board grid
  const renderGrid = useCallback(() => {
    const grid = []

    // Create a 15x15 grid
    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 15; col++) {
        // Determine cell color
        let cellColor = "bg-white dark:bg-gray-800"
        let cellBorder = "border border-gray-300 dark:border-gray-600"
        let cellPattern = ""

        // Red home area (top-left)
        if (row < 6 && col < 6 && !(row === 5 && col === 5)) {
          cellColor = "bg-gradient-to-br from-red-300 to-red-400 dark:from-red-900 dark:to-red-800"
          cellBorder = "border border-red-500/30"

          // Inner home area
          if (row > 0 && row < 5 && col > 0 && col < 5) {
            cellPattern =
              "bg-[radial-gradient(circle,_transparent_20%,_rgba(255,255,255,0.1)_20%,_rgba(255,255,255,0.1)_80%,_transparent_80%)]"
          }
        }
        // Blue home area (top-right)
        else if (row < 6 && col > 8 && !(row === 5 && col === 9)) {
          cellColor = "bg-gradient-to-br from-blue-300 to-blue-400 dark:from-blue-900 dark:to-blue-800"
          cellBorder = "border border-blue-500/30"

          // Inner home area
          if (row > 0 && row < 5 && col > 9 && col < 14) {
            cellPattern =
              "bg-[radial-gradient(circle,_transparent_20%,_rgba(255,255,255,0.1)_20%,_rgba(255,255,255,0.1)_80%,_transparent_80%)]"
          }
        }
        // Green home area (bottom-right)
        else if (row > 8 && col > 8 && !(row === 9 && col === 9)) {
          cellColor = "bg-gradient-to-br from-green-300 to-green-400 dark:from-green-900 dark:to-green-800"
          cellBorder = "border border-green-500/30"

          // Inner home area
          if (row > 9 && row < 14 && col > 9 && col < 14) {
            cellPattern =
              "bg-[radial-gradient(circle,_transparent_20%,_rgba(255,255,255,0.1)_20%,_rgba(255,255,255,0.1)_80%,_transparent_80%)]"
          }
        }
        // Yellow home area (bottom-left)
        else if (row > 8 && col < 6 && !(row === 9 && col === 5)) {
          cellColor = "bg-gradient-to-br from-yellow-300 to-yellow-400 dark:from-yellow-900 dark:to-yellow-800"
          cellBorder = "border border-yellow-500/30"

          // Inner home area
          if (row > 9 && row < 14 && col > 0 && col < 5) {
            cellPattern =
              "bg-[radial-gradient(circle,_transparent_20%,_rgba(255,255,255,0.1)_20%,_rgba(255,255,255,0.1)_80%,_transparent_80%)]"
          }
        }
        // Red home path
        else if (col === 7 && row > 0 && row < 7) {
          cellColor = "bg-gradient-to-r from-red-300 to-red-400 dark:from-red-900 dark:to-red-800"
          cellBorder = "border border-red-500/30"
        }
        // Blue home path
        else if (row === 7 && col > 8 && col < 15) {
          cellColor = "bg-gradient-to-b from-blue-300 to-blue-400 dark:from-blue-900 dark:to-blue-800"
          cellBorder = "border border-blue-500/30"
        }
        // Green home path
        else if (col === 7 && row > 8 && row < 15) {
          cellColor = "bg-gradient-to-r from-green-300 to-green-400 dark:from-green-900 dark:to-green-800"
          cellBorder = "border border-green-500/30"
        }
        // Yellow home path
        else if (row === 7 && col > 0 && col < 7) {
          cellColor = "bg-gradient-to-b from-yellow-300 to-yellow-400 dark:from-yellow-900 dark:to-yellow-800"
          cellBorder = "border border-yellow-500/30"
        }
        // Main path
        else if (
          (row === 6 && col < 15) ||
          (col === 8 && row < 15) ||
          (row === 8 && col < 15) ||
          (col === 6 && row < 15)
        ) {
          cellColor = "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800"
          cellBorder = "border border-gray-300 dark:border-gray-600"
        }
        // Center home
        else if (row === 7 && col === 7) {
          // We'll create a special div with triangular sections
          grid.push(
            <div
              key={`${row}-${col}`}
              className="absolute"
              style={{
                top: row * CELL_SIZE,
                left: col * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
                border: "2px solid rgba(255, 215, 0, 0.3)",
                overflow: "hidden",
                borderRadius: "4px",
                zIndex: 1,
              }}
            >
              {/* Red triangle (top-left) */}
              <div
                className="absolute w-1/2 h-1/2 top-0 left-0 bg-gradient-to-br from-red-400 to-red-500 dark:from-red-700 dark:to-red-800"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 0 100%)",
                  boxShadow: "inset 0 0 5px rgba(255, 255, 255, 0.3)",
                }}
              />

              {/* Blue triangle (top-right) */}
              <div
                className="absolute w-1/2 h-1/2 top-0 right-0 bg-gradient-to-bl from-blue-400 to-blue-500 dark:from-blue-700 dark:to-blue-800"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                  boxShadow: "inset 0 0 5px rgba(255, 255, 255, 0.3)",
                }}
              />

              {/* Green triangle (bottom-right) */}
              <div
                className="absolute w-1/2 h-1/2 bottom-0 right-0 bg-gradient-to-tl from-green-400 to-green-500 dark:from-green-700 dark:to-green-800"
                style={{
                  clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                  boxShadow: "inset 0 0 5px rgba(255, 255, 255, 0.3)",
                }}
              />

              {/* Yellow triangle (bottom-left) */}
              <div
                className="absolute w-1/2 h-1/2 bottom-0 left-0 bg-gradient-to-tr from-yellow-400 to-yellow-500 dark:from-yellow-700 dark:to-yellow-800"
                style={{
                  clipPath: "polygon(0 0, 100% 100%, 0 100%)",
                  boxShadow: "inset 0 0 5px rgba(255, 255, 255, 0.3)",
                }}
              />

              {/* Center circle */}
              <div
                className="absolute rounded-full bg-white dark:bg-gray-200 w-1/3 h-1/3 top-1/3 left-1/3 flex items-center justify-center"
                style={{
                  boxShadow: "0 0 8px rgba(0, 0, 0, 0.3)",
                  border: "1px solid rgba(255, 215, 0, 0.5)",
                }}
              >
                <div className="text-xs text-amber-800 dark:text-amber-700 font-bold">HOME</div>
              </div>
            </div>,
          )

          // Add a base cell underneath for proper border rendering
          grid.push(
            <div
              key={`${row}-${col}-base`}
              className="absolute border border-amber-300 dark:border-amber-700 bg-amber-100 dark:bg-amber-900/30"
              style={{
                top: row * CELL_SIZE,
                left: col * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                zIndex: 0,
              }}
            />,
          )
        }

        // Check if it's a safe cell
        const isSafe =
          SAFE_CELLS.includes(`red-${row}-${col}`) ||
          SAFE_CELLS.includes(`blue-${row}-${col}`) ||
          SAFE_CELLS.includes(`green-${row}-${col}`) ||
          SAFE_CELLS.includes(`yellow-${row}-${col}`)

        grid.push(
          <div
            key={`${row}-${col}`}
            className={`absolute ${cellColor} ${cellBorder} ${cellPattern} ${
              isSafe
                ? 'after:content-["★"] after:absolute after:text-yellow-400 after:text-lg after:font-bold after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:drop-shadow-md'
                : ""
            }`}
            style={{
              top: row * CELL_SIZE,
              left: col * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              boxShadow: isSafe ? "inset 0 0 8px rgba(255, 215, 0, 0.5)" : "",
            }}
          />,
        )
      }
    }

    return grid
  }, [])

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-2xl overflow-hidden border-8 border-amber-200 dark:border-gray-700">
      {/* Decorative corners */}
      <div className="absolute top-2 left-2 w-16 h-16 rounded-full border-4 border-amber-300 dark:border-amber-700 opacity-30"></div>
      <div className="absolute top-2 right-2 w-16 h-16 rounded-full border-4 border-amber-300 dark:border-amber-700 opacity-30"></div>
      <div className="absolute bottom-2 left-2 w-16 h-16 rounded-full border-4 border-amber-300 dark:border-amber-700 opacity-30"></div>
      <div className="absolute bottom-2 right-2 w-16 h-16 rounded-full border-4 border-amber-300 dark:border-amber-700 opacity-30"></div>

      {/* Board grid */}
      {renderGrid()}

      {/* Player tokens */}
      {gameState.players.map((player, playerId) => renderTokens(player, playerId))}

      {/* Current player indicator */}
      <div
        className={`absolute top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-white font-bold text-lg shadow-lg ${
          gameState.players[gameState.currentPlayer].color === "red"
            ? "bg-gradient-to-r from-red-500 to-red-600"
            : gameState.players[gameState.currentPlayer].color === "blue"
              ? "bg-gradient-to-r from-blue-500 to-blue-600"
              : gameState.players[gameState.currentPlayer].color === "green"
                ? "bg-gradient-to-r from-green-500 to-green-600"
                : "bg-gradient-to-r from-yellow-500 to-yellow-600"
        }`}
        style={{
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
          border: "2px solid rgba(255, 255, 255, 0.5)",
        }}
      >
        {gameState.players[gameState.currentPlayer].color.charAt(0).toUpperCase() +
          gameState.players[gameState.currentPlayer].color.slice(1)}
        's Turn
      </div>
    </div>
  )
}
