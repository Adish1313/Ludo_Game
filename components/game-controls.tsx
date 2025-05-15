"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function GameControls({
  resetGame,
  toggleSettings,
  toggleRules,
  toggleDarkMode,
  toggleSound,
  darkMode,
  soundEnabled,
}) {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-xl border-2 border-amber-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-center text-amber-800 dark:text-amber-300">Game Controls</h2>

      <div className="space-y-4">
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
            border: "2px solid rgba(255, 255, 255, 0.5)",
          }}
        >
          New Game
        </button>

        <button
          onClick={toggleSettings}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
            border: "2px solid rgba(255, 255, 255, 0.5)",
          }}
        >
          Settings
        </button>

        <button
          onClick={toggleRules}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
            border: "2px solid rgba(255, 255, 255, 0.5)",
          }}
        >
          Rules
        </button>

        <div className="flex justify-between gap-4">
          <button
            onClick={toggleDarkMode}
            className="flex-1 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
              border: "2px solid rgba(255, 255, 255, 0.5)",
            }}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          <button
            onClick={toggleSound}
            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
              border: "2px solid rgba(255, 255, 255, 0.5)",
            }}
          >
            {soundEnabled ? "🔊 Sound On" : "🔇 Sound Off"}
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
          <motion.div
            className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-2xl max-w-md w-full border-2 border-amber-200 dark:border-gray-700"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-amber-800 dark:text-amber-300">Start New Game?</h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Are you sure you want to start a new game? All current progress will be lost.
            </p>

            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:shadow-md transition-all"
                onClick={() => setShowConfirm(false)}
                style={{
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-md transition-all"
                onClick={() => {
                  resetGame()
                  setShowConfirm(false)
                }}
                style={{
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                }}
              >
                New Game
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
