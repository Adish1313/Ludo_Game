import LudoGame from "@/components/ludo-game"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-amber-800 dark:text-amber-300 mb-2 drop-shadow-md">Ludo King</h1>
          <p className="text-amber-700 dark:text-amber-400 text-lg">The royal game of dice and strategy</p>
        </div>

        <LudoGame />

        <div className="text-center mt-8 text-amber-700 dark:text-amber-400 text-sm">
          © {new Date().getFullYear()} Ludo King - Roll the dice and make your move!
        </div>
      </div>
    </main>
  )
}
