"use client"

import { useState, useEffect } from "react"
import { X, Heart, MapPin, Send } from "lucide-react"

function FallingPetals() {
  const petals = [
    { emoji: "\uD83C\uDF39", left: "5%", delay: "0s", duration: "3s" },
    { emoji: "\uD83C\uDF3A", left: "18%", delay: "0.8s", duration: "3.5s" },
    { emoji: "\uD83C\uDF38", left: "32%", delay: "1.5s", duration: "2.8s" },
    { emoji: "\uD83C\uDF39", left: "50%", delay: "0.3s", duration: "3.2s" },
    { emoji: "\uD83C\uDF3A", left: "65%", delay: "1.1s", duration: "3.7s" },
    { emoji: "\uD83C\uDF38", left: "80%", delay: "0.6s", duration: "2.9s" },
    { emoji: "\uD83C\uDF39", left: "92%", delay: "1.8s", duration: "3.4s" },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {petals.map((petal, i) => (
        <span
          key={i}
          className="absolute top-0 text-sm md:text-base opacity-0"
          style={{
            left: petal.left,
            animation: `fall-petal ${petal.duration} ease-in-out ${petal.delay} infinite, sway 2s ease-in-out ${petal.delay} infinite`,
          }}
        >
          {petal.emoji}
        </span>
      ))}
    </div>
  )
}

function BloomingFlowers({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 flex flex-col gap-0.5 pointer-events-none ${
        side === "left" ? "-left-1 md:left-1" : "-right-1 md:right-1"
      }`}
      aria-hidden="true"
    >
      <span
        className="text-xs md:text-sm"
        style={{ animation: "bloom 2s ease-in-out 0s infinite" }}
      >
        {"\uD83C\uDF39"}
      </span>
      <span
        className="text-[10px] md:text-xs"
        style={{ animation: "bloom 2s ease-in-out 0.7s infinite" }}
      >
        {"\uD83C\uDF38"}
      </span>
    </div>
  )
}

export function DiscountBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [isValentines, setIsValentines] = useState(true)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    const isDismissed = sessionStorage.getItem("discount-banner-dismissed")
    if (isDismissed) {
      setIsVisible(false)
    }

    const now = new Date()
    const month = now.getMonth()
    const day = now.getDate()
    setIsValentines(month === 1 && day <= 14)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem("discount-banner-dismissed", "true")
  }

  if (!hasMounted || !isVisible) return null

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[60] w-full px-4">
      {isValentines ? (
        <div className="relative py-3 px-6 md:px-8 bg-gradient-to-r from-[#8B0000] via-[#C41E3A] to-[#8B0000] rounded-lg shadow-2xl border border-[#FF6B81]/40 max-w-2xl mx-auto overflow-hidden">
          <FallingPetals />
          <BloomingFlowers side="left" />
          <BloomingFlowers side="right" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4 min-w-0">
              <Heart className="w-6 h-6 md:w-7 md:h-7 text-[#FF6B81] fill-[#FF6B81] shrink-0 animate-pulse" />
              <div className="flex flex-col min-w-0">
                <span className="text-white font-bold text-sm md:text-base truncate">
                  {"Valentine's Couples Discounts"}
                </span>
                <span className="text-white/80 text-xs md:text-sm truncate">
                  SGR Runs, Tsavo Game Drives, Taxi & Car Hire
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-2">
              <a
                href="https://www.anonymiketech.online/valentine"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 bg-[#FF6B81] text-white font-semibold text-xs px-3 py-1.5 rounded-full hover:bg-[#ff5370] transition-colors"
              >
                Share Love
                <Send className="w-3 h-3" />
              </a>
              <a
                href="#booking"
                className="hidden md:inline-flex items-center gap-1 bg-white text-[#8B0000] font-semibold text-xs px-3 py-1.5 rounded-full hover:bg-white/90 transition-colors"
              >
                Book Now
                <Heart className="w-3 h-3 fill-[#8B0000]" />
              </a>
              <button
                onClick={handleClose}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Close discount banner"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Mobile-only share link */}
          <div className="relative z-10 flex sm:hidden items-center justify-center mt-2">
            <a
              href="https://www.anonymiketech.online/valentine"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#FF6B81] text-xs font-medium hover:text-white transition-colors"
            >
              <Send className="w-3 h-3" />
              Share the Love
            </a>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between py-3 px-4 md:px-6 bg-gradient-to-r from-[#0F2C1E] via-[#1a4631] to-[#0F2C1E] rounded-lg shadow-2xl border border-[#D4AF37]/40 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 md:gap-5">
            <MapPin className="w-6 h-6 md:w-8 md:h-8 text-[#D4AF37] shrink-0" />
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm md:text-base">
                February Travel Deals
              </span>
              <span className="text-white/80 text-xs md:text-sm">
                5% off all bookings &mdash; SGR, Game Drives, Taxi & Car Hire
              </span>
            </div>
            <a
              href="#booking"
              className="hidden md:inline-flex shrink-0 items-center gap-1 bg-[#D4AF37] text-[#0F2C1E] font-semibold text-xs px-3 py-1.5 rounded-full hover:bg-[#D4AF37]/90 transition-colors"
            >
              Book Now
              <MapPin className="w-3 h-3" />
            </a>
          </div>
          <button
            onClick={handleClose}
            className="text-white/70 hover:text-white transition-colors shrink-0 ml-2"
            aria-label="Close discount banner"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  )
}
