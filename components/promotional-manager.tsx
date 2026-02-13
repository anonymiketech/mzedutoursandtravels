"use client"

import { useState, useEffect } from "react"
import { ValentinesPopup } from "./valentines-popup"
import { DiscountBanner } from "./discount-banner"

export function PromotionalManager() {
  const [showBanner, setShowBanner] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check if valentines popup was shown in this session
    const hasShownValentinesPopup = sessionStorage.getItem("valentines_popup_shown")

    // If popup was already shown, banner is already visible (default state)
    if (hasShownValentinesPopup) {
      return
    }

    // Otherwise, hide the banner initially and show it after the popup animation completes
    // The popup will be shown after 1.5s and has a 300ms close animation
    // So the banner should appear after ~2 seconds
    setShowBanner(false)

    const timer = setTimeout(() => {
      setShowBanner(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <ValentinesPopup />
      {showBanner && <DiscountBanner />}
    </>
  )
}
