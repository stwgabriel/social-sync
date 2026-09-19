"use client"

import type React from "react"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Send } from "lucide-react"
import { submitContactForm } from "@/lib/actions"

export default function ContactSection() {
  const { translations } = useLanguage()
  const { toast } = useToast()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const { ref: sectionRef, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        toast({
          title: translations.contact.form.messageSent,
          duration: 5000,
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        toast({
          title: translations.contact.form.messageError,
          variant: "destructive",
          duration: 5000,
        })
      }
    } catch (error) {
      toast({
        title: translations.contact.form.messageError,
        variant: "destructive",
        duration: 5000,
      })
    }

    setIsSubmitting(false)
  }

  return (
    <section ref={sectionRef} className="py-20 w-full bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            className={cn(
              "text-3xl md:text-4xl font-bold mb-4 text-white opacity-0",
              sectionIsVisible && "animate-fade-in",
            )}
          >
            {translations.contact.title}
          </h2>
          <p
            className={cn("text-lg text-white/70 opacity-0", sectionIsVisible && "animate-fade-in animation-delay-200")}
          >
            {translations.contact.subtitle}
          </p>
          <div className="w-20 h-1 bg-[#DE5B80] mx-auto mt-6" />
        </div>

        <div className={cn("max-w-md mx-auto opacity-0", sectionIsVisible && "animate-fade-in animation-delay-400")}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Input
                  name="name"
                  placeholder={translations.contact.form.name}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/10 text-white placeholder:text-white/50"
                />
              </div>
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder={translations.contact.form.email}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/10 text-white placeholder:text-white/50"
                />
              </div>
              <div>
                <Input
                  name="subject"
                  placeholder={translations.contact.form.subject}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/10 text-white placeholder:text-white/50"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder={translations.contact.form.message}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-[120px] bg-white/10 border-white/10 text-white placeholder:text-white/50"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#DE5B80] hover:bg-[#DE5B80]/90 text-white"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  <span>{translations.contact.form.send}</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  <span>{translations.contact.form.send}</span>
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

