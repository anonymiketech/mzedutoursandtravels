"use client"

import { useState } from "react"
import { MessageCircle, X, AlertCircle, CheckCircle } from "lucide-react"
import emailjs from "@emailjs/browser"

export default function QuoteRequestButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    tripDates: "",
    groupSize: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (submitStatus !== "idle") {
      setSubmitStatus("idle")
    }
  }

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone || !formData.destination) {
      setSubmitStatus("error")
      setErrorMessage("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      emailjs.init("3Zv-eJbyMM9GKmH-k")

      await emailjs.send("service_m4fhkgu", "template_lrphgmf", {
        from_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        destination: formData.destination,
        trip_dates: formData.tripDates || "Not specified",
        group_size: formData.groupSize || "Not specified",
        message: formData.message || "No additional message",
      })

      setSubmitStatus("success")
      setTimeout(() => {
        setShowForm(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          destination: "",
          tripDates: "",
          groupSize: "",
          message: "",
        })
        setSubmitStatus("idle")
      }, 2000)
    } catch (error) {
      console.error("EmailJS Error:", error)
      setSubmitStatus("error")
      setErrorMessage("Failed to send quote request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsApp = () => {
    const message = "Hi, I'm interested in getting a quote for a tour package."
    const whatsappURL = `https://wa.me/254723471093?text=${encodeURIComponent(message)}`
    window.open(whatsappURL, "_blank")
  }

  return (
    <>
      {/* Floating Button */}
      <div
        className={`fixed right-4 sm:right-6 bottom-24 z-40 transition-all duration-300 ${
          isExpanded ? "md:translate-x-0" : "translate-x-0"
        }`}
      >
        {/* Expanded Menu */}
        {isExpanded && (
          <div className="absolute bottom-20 right-0 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* Quote Request Form Button */}
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 group w-fit ml-auto"
            >
              <span className="text-sm font-semibold">Quote Request Form</span>
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition">
                <MessageCircle className="w-5 h-5" />
              </div>
            </button>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 group w-fit ml-auto"
            >
              <span className="text-sm font-semibold">WhatsApp</span>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition">
                <MessageCircle className="w-5 h-5" />
              </div>
            </button>
          </div>
        )}

        {/* Main Floating Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-16 h-16 bg-primary hover:bg-primary/90 text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 relative group"
        >
          {isExpanded ? (
            <X className="w-7 h-7" />
          ) : (
            <>
              <MessageCircle className="w-7 h-7" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                1
              </span>
            </>
          )}
        </button>
      </div>

      {/* Quote Request Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 md:overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in duration-300 my-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-6 text-center relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="font-serif text-2xl font-bold text-white">Get Your Quote</h3>
              <p className="text-white/80 mt-2 text-sm">Fill out the form and we&apos;ll get back to you shortly</p>
            </div>

            {/* Form Content */}
            <div className="p-6 md:p-8">
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-900">Quote Request Sent!</p>
                    <p className="text-sm text-green-700 mt-1">We&apos;ll contact you soon with your personalized quote.</p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-900">Request Failed</p>
                    <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
                  </div>
                </div>
              )}

              {submitStatus !== "success" && (
                <form className="space-y-6" onSubmit={handleSubmitForm}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                    />
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                      className="bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                    >
                      <option value="">Select Destination *</option>
                      <option value="amboseli">Amboseli National Park</option>
                      <option value="tsavo">Tsavo Game Reserve</option>
                      <option value="shimba">Shimba Hills Reserve</option>
                      <option value="coast">Coastal Tour</option>
                      <option value="custom">Custom Package</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="date"
                      name="tripDates"
                      value={formData.tripDates}
                      onChange={handleChange}
                      className="bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                    />
                    <select
                      name="groupSize"
                      value={formData.groupSize}
                      onChange={handleChange}
                      className="bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                    >
                      <option value="">Group Size</option>
                      <option value="1-2">1-2 people</option>
                      <option value="3-5">3-5 people</option>
                      <option value="6-10">6-10 people</option>
                      <option value="10+">10+ people</option>
                    </select>
                  </div>

                  <textarea
                    name="message"
                    placeholder="Tell us more about your trip requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg font-bold text-lg hover:opacity-90 transition disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Quote Request"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
