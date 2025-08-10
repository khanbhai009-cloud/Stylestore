"use client"

import { useState, useEffect } from "react"
import { Gift, Star } from "lucide-react"

const blessings = [
  "🌟 May your shopping bring you joy and happiness! 🛍️",
  "✨ Blessed are those who find great deals! 💫",
  "🙏 May every purchase bring prosperity to your life! 🌈",
  "💖 Wishing you abundant blessings with every order! 🎁",
  "🌸 May your style reflect your beautiful soul! ✨",
  "🎉 Blessed shopping experience awaits you! 🛒",
]

export default function WelcomeMessage() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentBlessing, setCurrentBlessing] = useState("")

  useEffect(() => {
    // Select random blessing
    const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)]
    setCurrentBlessing(randomBlessing)

    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-4 px-4 text-center relative overflow-hidden">
      <div className="flex items-center justify-center space-x-3 animate-pulse">
        <Star className="h-6 w-6 text-yellow-300 animate-spin" />
        <span className="font-bold text-lg md:text-xl">{currentBlessing}</span>
        <Gift className="h-6 w-6 text-pink-300 animate-bounce" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      <div className="mt-2 text-sm opacity-90">🎊 Welcome to StyleStore - Where Every Purchase is a Blessing! 🎊</div>
    </div>
  )
}
