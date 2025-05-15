"use client"

import { useState, useEffect, useCallback } from "react"
import LudoBoard from "./ludo-board"
import DiceRoller from "./dice-roller"
import PlayerInfo from "./player-info"
import GameControls from "./game-controls"
import WinnerModal from "./winner-modal"
import { motion } from "framer-motion"
import { redPath } from "@/lib/paths/red-path"
import { bluePath } from "@/lib/paths/blue-path"
import { greenPath } from "@/lib/paths/green-path"
import { yellowPath } from "@/lib/paths/yellow-path"

// Player colors
const COLORS = ["red", "blue", "green", "yellow"]

// Initial game state
const initialGameState = (numPlayers = 4) => {
  const players = COLORS.slice(0, numPlayers).map((color, index) => ({
    id: index,
    color,
    tokens: Array(4)
      .fill(null)
      .map((_, tokenId) => ({
        id: tokenId,
        position: "base",
        stepsMoved: 0,
        isMoving: false,
      })),
    homeCount: 0,
  }))

  return {
    players,
    currentPlayer: 0,
    diceValue: null,
    rollCount: 0,
    consecutiveSixes: 0,
    gameStatus: "idle", // 'idle', 'rolling', 'selecting', 'moving', 'over'
    winner: null,
    runnerUps: [],
    selectedToken: null,
    lastCut: null,
  }
}

// Check if a cell is a safe cell - moved outside component to prevent recreation
const isSafeCell = (cellId) => {
  // Safe cells are typically:
  // 1. Each player's start cell
  // 2. Every 8th cell from start
  // 3. Home cells
  const safeCells = [
    "red-0",
    "blue-0",
    "green-0",
    "yellow-0",
    "red-8",
    "blue-8",
    "green-8",
    "yellow-8",
    "redH1",
    "redH2",
    "redH3",
    "redH4",
    "redH5",
    "redH6",
    "blueH1",
    "blueH2",
    "blueH3",
    "blueH4",
    "blueH5",
    "blueH6",
    "greenH1",
    "greenH2",
    "greenH3",
    "greenH4",
    "greenH5",
    "greenH6",
    "yellowH1",
    "yellowH2",
    "yellowH3",
    "yellowH4",
    "yellowH5",
    "yellowH6",
  ]

  return safeCells.includes(cellId)
}

export default function LudoGame() {
  const [numPlayers, setNumPlayers] = useState(4)
  const [gameState, setGameState] = useState(() => initialGameState(numPlayers))
  const [showSettings, setShowSettings] = useState(false)
  const [showRules, setShowRules] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Get the path for the current player
  const getCurrentPath = useCallback(() => {
    const color = gameState.players[gameState.currentPlayer].color
    switch (color) {
      case "red":
        return redPath
      case "blue":
        return bluePath
      case "green":
        return greenPath
      case "yellow":
        return yellowPath
      default:
        return redPath
    }
  }, [gameState.currentPlayer, gameState.players])

  // Check if a move is valid
  const isValidMove = useCallback(
    (tokenIndex) => {
      const currentPlayer = gameState.players[gameState.currentPlayer]
      const token = currentPlayer.tokens[tokenIndex]
      const diceValue = gameState.diceValue

      // No dice value, no move
      if (!diceValue) return false

      // If token is in base, need a 6 to move out
      if (token.position === "base") {
        return diceValue === 6
      }

      // If token is already home, can't move
      if (token.position === "home") {
        return false
      }

      // If token is on the board
      const path = getCurrentPath()
      const currentPos = typeof token.position === "number" ? token.position : 0
      const newPos = currentPos + diceValue

      // Check if token would go beyond home
      if (newPos > path.length - 1) {
        return false
      }

      // Check if exact count needed to enter home
      if (newPos === path.length - 1) {
        return true
      }

      // Check if path is blocked by same color tokens
      const targetCell = path[newPos]
      const isBlocked = currentPlayer.tokens.some(
        (t) =>
          t.id !== token.id &&
          t.position !== "base" &&
          t.position !== "home" &&
          typeof t.position === "number" &&
          path[t.position] === targetCell,
      )

      return !isBlocked
    },
    [gameState.currentPlayer, gameState.diceValue, gameState.players, getCurrentPath],
  )

  // Check if any valid moves exist
  const hasValidMoves = useCallback(() => {
    if (!gameState.diceValue) return false

    const currentPlayer = gameState.players[gameState.currentPlayer]
    const diceValue = gameState.diceValue
    const path = getCurrentPath()

    // Check each token if it can move
    return currentPlayer.tokens.some((token, index) => {
      // If token is in base, need a 6 to move out
      if (token.position === "base") {
        return diceValue === 6
      }

      // If token is already home, can't move
      if (token.position === "home") {
        return false
      }

      // If token is on the board
      const currentPos = typeof token.position === "number" ? token.position : 0
      const newPos = currentPos + diceValue

      // Check if token would go beyond home
      if (newPos > path.length - 1) {
        return false
      }

      // Check if path is blocked by same color tokens
      if (newPos < path.length) {
        const targetCell = path[newPos]
        const isBlocked = currentPlayer.tokens.some(
          (t) =>
            t.id !== token.id &&
            t.position !== "base" &&
            t.position !== "home" &&
            typeof t.position === "number" &&
            path[t.position] === targetCell,
        )

        return !isBlocked
      }

      return false
    })
  }, [gameState.currentPlayer, gameState.diceValue, gameState.players, getCurrentPath])

  // Roll the dice
  const rollDice = useCallback(() => {
    if (gameState.gameStatus !== "idle") return

    setGameState((prev) => ({
      ...prev,
      gameStatus: "rolling",
    }))

    // Simulate dice roll animation
    setTimeout(() => {
      const diceValue = Math.floor(Math.random() * 6) + 1

      setGameState((prev) => {
        const newConsecutiveSixes = diceValue === 6 ? prev.consecutiveSixes + 1 : 0

        // Check for three consecutive sixes
        if (newConsecutiveSixes === 3) {
          return {
            ...prev,
            diceValue: null,
            rollCount: prev.rollCount + 1,
            consecutiveSixes: 0,
            gameStatus: "idle",
            currentPlayer: (prev.currentPlayer + 1) % prev.players.length,
          }
        }

        return {
          ...prev,
          diceValue,
          rollCount: prev.rollCount + 1,
          consecutiveSixes: newConsecutiveSixes,
          gameStatus: "selecting",
        }
      })

      // Play sound if enabled
      if (soundEnabled) {
        // Play dice roll sound
      }
    }, 800)
  }, [gameState.gameStatus, soundEnabled])

  // Move a token
  const moveToken = useCallback(
    (tokenIndex) => {
      if (gameState.gameStatus !== "selecting") return
      if (!isValidMove(tokenIndex)) return

      const currentPlayer = gameState.players[gameState.currentPlayer]
      const token = currentPlayer.tokens[tokenIndex]
      const diceValue = gameState.diceValue
      const path = getCurrentPath()

      // Set the token to moving state for animation
      setGameState((prev) => {
        const updatedPlayers = [...prev.players]
        const updatedTokens = [...updatedPlayers[prev.currentPlayer].tokens]
        updatedTokens[tokenIndex] = {
          ...updatedTokens[tokenIndex],
          isMoving: true,
        }
        updatedPlayers[prev.currentPlayer] = {
          ...updatedPlayers[prev.currentPlayer],
          tokens: updatedTokens,
        }

        return {
          ...prev,
          players: updatedPlayers,
          gameStatus: "moving",
          selectedToken: tokenIndex,
        }
      })

      // Simulate token movement animation
      setTimeout(() => {
        setGameState((prev) => {
          const currentPlayer = prev.players[prev.currentPlayer]
          const updatedPlayers = [...prev.players]
          const updatedTokens = [...currentPlayer.tokens]
          let newPosition
          let gotBonus = false
          let tokenCut = null

          // If token is in base and dice is 6, move to start position
          if (token.position === "base" && diceValue === 6) {
            newPosition = 0 // Start position
            gotBonus = true
          }
          // If token is on the board
          else if (token.position !== "home") {
            const currentPos = typeof token.position === "number" ? token.position : 0
            newPosition = currentPos + diceValue

            // Check if token reached home
            if (newPosition >= path.length - 1) {
              // Check if exact count needed to enter home
              if (newPosition === path.length - 1) {
                newPosition = "home"
                updatedPlayers[prev.currentPlayer] = {
                  ...currentPlayer,
                  homeCount: currentPlayer.homeCount + 1,
                }
              } else {
                // Can't move beyond home without exact count
                newPosition = currentPos
              }
            }

            // Check if token cut another player's token
            if (newPosition !== "home" && newPosition !== currentPos) {
              const targetCell = path[newPosition]

              // Check all other players' tokens
              prev.players.forEach((player, playerId) => {
                if (playerId === prev.currentPlayer) return

                const playerPath =
                  playerId === 0 ? redPath : playerId === 1 ? bluePath : playerId === 2 ? greenPath : yellowPath

                player.tokens.forEach((otherToken, otherTokenId) => {
                  if (otherToken.position !== "base" && otherToken.position !== "home") {
                    const otherTokenCell = playerPath[otherToken.position]

                    // Check if cells match and it's not a safe cell
                    if (targetCell === otherTokenCell && !isSafeCell(targetCell)) {
                      // Cut the token
                      updatedPlayers[playerId].tokens[otherTokenId] = {
                        ...otherToken,
                        position: "base",
                        stepsMoved: 0,
                      }

                      gotBonus = true
                      tokenCut = {
                        player: playerId,
                        token: otherTokenId,
                      }
                    }
                  }
                })
              })
            }
          }

          // Update the token
          updatedTokens[tokenIndex] = {
            ...token,
            position: newPosition,
            stepsMoved:
              newPosition === "home" ? path.length - 1 : newPosition === "base" ? 0 : token.stepsMoved + diceValue,
            isMoving: false,
          }

          updatedPlayers[prev.currentPlayer] = {
            ...currentPlayer,
            tokens: updatedTokens,
          }

          // Check if player has won
          const hasWon = updatedPlayers[prev.currentPlayer].homeCount === 4
          const newRunnerUps = [...prev.runnerUps]
          let newWinner = prev.winner

          if (hasWon && newWinner === null) {
            newWinner = prev.currentPlayer
          } else if (hasWon) {
            newRunnerUps.push(prev.currentPlayer)
          }

          // Determine next player
          let nextPlayer = prev.currentPlayer

          // Only get another turn if rolled a 6 or cut a token
          if (!gotBonus && diceValue !== 6) {
            nextPlayer = (prev.currentPlayer + 1) % prev.players.length

            // Skip players who have finished
            while (
              (nextPlayer === newWinner || newRunnerUps.includes(nextPlayer)) &&
              newRunnerUps.length < prev.players.length - 1
            ) {
              nextPlayer = (nextPlayer + 1) % prev.players.length
            }
          }

          return {
            ...prev,
            players: updatedPlayers,
            currentPlayer: nextPlayer,
            gameStatus: "idle",
            selectedToken: null,
            lastCut: tokenCut,
            winner: newWinner,
            runnerUps: newRunnerUps,
            gameOver: newRunnerUps.length === prev.players.length - 1,
            // Reset dice value if turn changes or if not a 6
            diceValue: nextPlayer !== prev.currentPlayer || diceValue !== 6 ? null : diceValue,
          }
        })

        // Play sound if enabled
        if (soundEnabled) {
          // Play token move sound
        }
      }, 500)
    },
    [
      gameState.currentPlayer,
      gameState.diceValue,
      gameState.gameStatus,
      gameState.players,
      getCurrentPath,
      isValidMove,
      soundEnabled,
      redPath,
      bluePath,
      greenPath,
      yellowPath,
    ],
  )

  // Auto-skip turn if no valid moves
  useEffect(() => {
    if (gameState.gameStatus === "selecting") {
      const hasValidMove = hasValidMoves()

      if (!hasValidMove) {
        // Add a small delay before auto-skipping
        const timeoutId = setTimeout(() => {
          setGameState((prev) => {
            // Make sure we're still in selecting state when timeout fires
            if (prev.gameStatus !== "selecting") return prev

            return {
              ...prev,
              gameStatus: "idle",
              diceValue: null, // Reset dice value
              currentPlayer: (prev.currentPlayer + 1) % prev.players.length,
              consecutiveSixes: 0, // Reset consecutive sixes counter
            }
          })
        }, 1000)

        return () => clearTimeout(timeoutId)
      }
    }
  }, [gameState.gameStatus, gameState.currentPlayer, gameState.players.length, hasValidMoves])

  // Reset the game
  const resetGame = useCallback(() => {
    setGameState(initialGameState(numPlayers))
  }, [numPlayers])

  // Change number of players
  const changeNumPlayers = useCallback((num) => {
    setNumPlayers(num)
    setGameState(initialGameState(num))
  }, [])

  // Toggle settings
  const toggleSettings = useCallback(() => {
    setShowSettings((prev) => !prev)
  }, [])

  // Toggle rules
  const toggleRules = useCallback(() => {
    setShowRules((prev) => !prev)
  }, [])

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev)
    // Apply dark mode to document
    if (!darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Toggle sound
  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev)
  }, [])

  return (
    <div className={`w-full max-w-6xl mx-auto ${darkMode ? "dark" : ""}`}>
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lg:col-span-2">
          <LudoBoard gameState={gameState} moveToken={moveToken} isValidMove={isValidMove} />
        </div>

        <div className="flex flex-col gap-6">
          <DiceRoller
            diceValue={gameState.diceValue}
            rollDice={rollDice}
            disabled={gameState.gameStatus !== "idle" || gameState.winner !== null}
            currentPlayer={gameState.players[gameState.currentPlayer]}
          />

          <PlayerInfo
            players={gameState.players}
            currentPlayer={gameState.currentPlayer}
            winner={gameState.winner}
            runnerUps={gameState.runnerUps}
          />

          <GameControls
            resetGame={resetGame}
            toggleSettings={toggleSettings}
            toggleRules={toggleRules}
            toggleDarkMode={toggleDarkMode}
            toggleSound={toggleSound}
            darkMode={darkMode}
            soundEnabled={soundEnabled}
          />
        </div>
      </motion.div>

      {/* Winner Modal */}
      {gameState.winner !== null && (
        <WinnerModal
          winner={gameState.players[gameState.winner]}
          runnerUps={gameState.runnerUps.map((id) => gameState.players[id])}
          resetGame={resetGame}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-purple-800 dark:text-purple-400">Game Settings</h2>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Number of Players</label>
              <div className="flex gap-2">
                {[2, 3, 4].map((num) => (
                  <button
                    key={num}
                    className={`px-4 py-2 rounded ${numPlayers === num ? "bg-purple-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
                    onClick={() => changeNumPlayers(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <label className="flex items-center">
                <span className="mr-2">Dark Mode</span>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  className="form-checkbox h-5 w-5 text-purple-600"
                />
              </label>

              <label className="flex items-center">
                <span className="mr-2">Sound</span>
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={toggleSound}
                  className="form-checkbox h-5 w-5 text-purple-600"
                />
              </label>
            </div>

            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                onClick={toggleSettings}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Rules Modal */}
      {showRules && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-purple-800 dark:text-purple-400">Ludo Rules</h2>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <h3 className="text-xl font-semibold">Objective</h3>
              <p>Be the first player to move all four of your tokens from your starting area to your home area.</p>

              <h3 className="text-xl font-semibold">Basic Rules</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Each player has 4 tokens.</li>
                <li>Roll a 6 to move a token out of the starting area.</li>
                <li>Move your token clockwise around the board according to the dice roll.</li>
                <li>If you roll a 6, you get an extra turn.</li>
                <li>If you roll three consecutive 6s, you lose your turn.</li>
                <li>Only one token can move per dice roll.</li>
              </ul>

              <h3 className="text-xl font-semibold">Cutting</h3>
              <p>
                If your token lands on an opponent's token, their token is sent back to their starting area. You get an
                extra turn.
              </p>

              <h3 className="text-xl font-semibold">Safe Zones</h3>
              <p>Tokens on safe cells (marked with a star) cannot be cut.</p>

              <h3 className="text-xl font-semibold">Winning</h3>
              <p>
                To enter the home area, you need an exact dice roll. The first player to get all 4 tokens home wins.
              </p>
            </div>

            <div className="flex justify-end mt-6">
              <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700" onClick={toggleRules}>
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
