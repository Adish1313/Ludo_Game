"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function DiceRoller({ diceValue, rollDice, disabled, currentPlayer }) {
  const [isRolling, setIsRolling] = useState(false)
  const [randomValues, setRandomValues] = useState([1, 2, 3, 4, 5, 6])
  const [showParticles, setShowParticles] = useState(false)

  // Animate dice roll
  useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        setRandomValues((prev) => {
          const shuffled = [...prev]
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
          }
          return shuffled
        })
      }, 100)

      // Stop rolling after 800ms
      setTimeout(() => {
        clearInterval(interval)
        setIsRolling(false)
      }, 800)

      return () => clearInterval(interval)
    }
  }, [isRolling])

  // Reset animation when dice value changes
  useEffect(() => {
    if (diceValue !== null && !isRolling) {
      // Ensure the displayed dice matches the actual value without causing re-renders
      setRandomValues((prev) => {
        if (prev[0] !== diceValue) {
          return [diceValue, ...prev.slice(1)]
        }
        return prev
      })

      // Show particles for 6
      if (diceValue === 6) {
        setShowParticles(true)
        setTimeout(() => setShowParticles(false), 2000)
      }
    }
  }, [diceValue, isRolling])

  // Handle dice roll
  const handleRollDice = () => {
    if (disabled) return
    setIsRolling(true)
    rollDice()
  }

  // Render dice dots
  const renderDots = (value) => {
    const dotClass =
      "bg-gradient-to-br from-gray-800 to-black dark:from-gray-200 dark:to-white rounded-full shadow-inner"

    switch (value) {
      case 1:
        return (
          <div className="grid place-items-center h-full w-full">
            <div className={`w-4 h-4 ${dotClass}`}></div>
          </div>
        )
      case 2:
        return (
          <div className="grid grid-cols-2 h-full w-full p-3">
            <div className="flex justify-start items-start">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
            <div className="flex justify-end items-end">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="grid grid-cols-3 grid-rows-3 h-full w-full p-3">
            <div className="col-start-1 row-start-1 flex justify-start items-start">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
            <div className="col-start-2 row-start-2 flex justify-center items-center">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
            <div className="col-start-3 row-start-3 flex justify-end items-end">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="grid grid-cols-2 grid-rows-2 h-full w-full p-3">
            <div className="flex justify-start items-start">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
            <div className="flex justify-end items-start">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
            <div className="flex justify-start items-end">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
            <div className="flex justify-end items-end">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="grid grid-cols-3 grid-rows-3 h-full w-full p-3">
            <div className="col-start-1 row-start-1 flex justify-start items-start">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
            <div className="col-start-3 row-start-1 flex justify-end items-start">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
            <div className="col-start-2 row-start-2 flex justify-center items-center">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
            <div className="col-start-1 row-start-3 flex justify-start items-end">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
            <div className="col-start-3 row-start-3 flex justify-end items-end">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
          </div>
        )
      case 6:
        return (
          <div className="grid grid-cols-2 grid-rows-3 h-full w-full p-3">
            <div className="flex justify-start items-start">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
            <div className="flex justify-end items-start">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
            <div className="flex justify-start items-center">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
            <div className="flex justify-end items-center">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
            <div className="flex justify-start items-end">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
            <div className="flex justify-end items-end">
              <div className={`w-3 h-3 ${dotClass}`}></div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  // Render particles for 6
  const renderParticles = () => {
    if (!showParticles) return null

    const particles = []
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 6 + 4
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * 60 + 40
      const duration = Math.random() * 1 + 1
      const delay = Math.random() * 0.5

      particles.push(
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-yellow-400"
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            scale: 0,
          }}
          animate={{
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 1,
          }}
          transition={{
            duration: duration,
            delay: delay,
            ease: "easeOut",
          }}
          style={{
            width: size,
            height: size,
            top: "50%",
            left: "50%",
          }}
        />,
      )
    }

    return particles
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-xl border-2 border-amber-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-center text-amber-800 dark:text-amber-300">Dice Roller</h2>

      <div className="flex justify-center mb-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={diceValue || "empty"}
            initial={{ rotateY: 0, scale: 0.8 }}
            animate={{
              rotateY: isRolling ? [0, 360, 720, 1080] : 0,
              scale: isRolling ? [0.8, 1.1, 0.9, 1] : 1,
              y: isRolling ? [0, -20, 0] : 0,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: isRolling ? 0.8 : 0.5 }}
            className={`w-24 h-24 bg-gradient-to-br from-white to-gray-100 dark:from-gray-200 dark:to-gray-300 rounded-xl shadow-xl relative ${
              diceValue === 6 ? "ring-4 ring-yellow-400 ring-opacity-70" : ""
            }`}
            style={{
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.5)",
              border: "2px solid rgba(255, 255, 255, 0.8)",
            }}
          >
            {isRolling ? (
              renderDots(randomValues[0])
            ) : diceValue ? (
              renderDots(diceValue)
            ) : (
              <div className="h-full w-full"></div>
            )}

            {/* Particles for 6 */}
            {renderParticles()}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={handleRollDice}
        disabled={disabled || isRolling}
        className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all transform ${
          disabled || isRolling
            ? "bg-gray-400 cursor-not-allowed"
            : `bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95`
        }`}
        style={{
          boxShadow:
            disabled || isRolling
              ? "0 4px 6px rgba(0, 0, 0, 0.1)"
              : "0 6px 12px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
          border: "2px solid rgba(255, 255, 255, 0.5)",
        }}
      >
        {isRolling ? "Rolling..." : "Roll Dice"}
      </button>

      {diceValue === 6 && !isRolling && !disabled && (
        <div className="text-center mt-4 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 p-3 rounded-lg border border-yellow-300 dark:border-yellow-700">
          <p className="text-yellow-700 dark:text-yellow-400 font-bold">You rolled a 6! 🎉 You get another turn.</p>
        </div>
      )}
    </div>
  )
}
