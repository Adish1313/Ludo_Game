"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function WinnerModal({ winner, runnerUps, resetGame }) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  const [particles, setParticles] = useState([])

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)

      // Generate confetti particles
      const newParticles = []
      const colors = ["#FFD700", "#FF6347", "#4169E1", "#32CD32", "#FF69B4", "#9370DB"]

      for (let i = 0; i < 100; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: -20 - Math.random() * 100,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          speed: Math.random() * 3 + 2,
          delay: Math.random() * 5,
        })
      }

      setParticles(newParticles)

      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      {/* Confetti */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-4 h-4 opacity-80"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
            rotate: `${particle.rotation}deg`,
          }}
          animate={{
            y: windowSize.height + 50,
            rotate: `${particle.rotation + 360 * 2}deg`,
            x: particle.x + (Math.random() * 200 - 100),
          }}
          transition={{
            duration: 6 / particle.speed,
            ease: "linear",
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div
        className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl shadow-2xl max-w-md w-full text-center border-4 border-yellow-400 dark:border-yellow-600"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative mb-6">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32">
            <div className="absolute inset-0 bg-yellow-300 rounded-full animate-ping opacity-30"></div>
            <div className="absolute inset-4 bg-yellow-400 rounded-full animate-ping opacity-50 delay-300"></div>
          </div>

          <h2 className="text-4xl font-bold mb-2 text-amber-800 dark:text-amber-300">🏆 Champion! 🏆</h2>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-4"></div>
        </div>

        <div
          className={`w-28 h-28 mx-auto my-8 rounded-full flex items-center justify-center border-4 border-white shadow-xl ${
            winner.color === "red"
              ? "bg-gradient-to-br from-red-400 to-red-600"
              : winner.color === "blue"
                ? "bg-gradient-to-br from-blue-400 to-blue-600"
                : winner.color === "green"
                  ? "bg-gradient-to-br from-green-400 to-green-600"
                  : "bg-gradient-to-br from-yellow-400 to-yellow-600"
          }`}
          style={{
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.5)",
          }}
        >
          <span className="text-5xl text-white font-bold">👑</span>
        </div>

        <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          {winner.color.charAt(0).toUpperCase() + winner.color.slice(1)} Player Wins!
        </h3>

        {runnerUps.length > 0 && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Runner Ups:</h4>
            <div className="flex justify-center space-x-6">
              {runnerUps.map((player, index) => (
                <div key={player.id} className="flex flex-col items-center">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center border-2 border-white ${
                      player.color === "red"
                        ? "bg-gradient-to-br from-red-400 to-red-600"
                        : player.color === "blue"
                          ? "bg-gradient-to-br from-blue-400 to-blue-600"
                          : player.color === "green"
                            ? "bg-gradient-to-br from-green-400 to-green-600"
                            : "bg-gradient-to-br from-yellow-400 to-yellow-600"
                    }`}
                    style={{
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    <span className="text-white font-bold text-xl">{index + 2}</span>
                  </div>
                  <span className="text-sm mt-2 text-gray-600 dark:text-gray-400 font-medium">
                    {player.color.charAt(0).toUpperCase() + player.color.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl hover:shadow-lg font-bold text-lg transition-all transform hover:-translate-y-1 active:translate-y-0 active:shadow-md"
          onClick={resetGame}
          style={{
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
            border: "2px solid rgba(255, 255, 255, 0.5)",
          }}
        >
          Play Again
        </button>
      </motion.div>
    </div>
  )
}
