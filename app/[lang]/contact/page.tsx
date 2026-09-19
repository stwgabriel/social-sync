"use client"

import type React from "react"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { MapPin, Mail, Phone, Instagram, Linkedin, Facebook } from "lucide-react"
import Link from "next/link"
import { submitContactForm } from "@/lib/actions"

export default function ContactPage() {
  const { translations } = useLanguage()
  const { toast } = useToast()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
    <div className="pt-16">
      {/* Header */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{translations.contact.title}</h1>
          <div className="w-20 h-1 bg-[#DE5B80] mx-auto mb-8" />
          <p className="text-xl text-white/70 max-w-3xl mx-auto">{translations.contact.subtitle}</p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-card rounded-xl p-8 border shadow-sm">
              <h2 className="text-2xl font-bold mb-6">{translations.contact.form.send}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium block mb-1">
                      {translations.contact.form.name}
                    </label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium block mb-1">
                      {translations.contact.form.email}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="text-sm font-medium block mb-1">
                      {translations.contact.form.subject}
                    </label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                  </div>
                  <div>
                    <label htmlFor="message" className="text-sm font-medium block mb-1">
                      {translations.contact.form.message}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
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
                    translations.contact.form.send
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Informações de Contato</h2>

              <div className="space-y-8">
                {/* <div className="flex items-start space-x-4">
                  <div className="bg-[#DE5B80]/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-[#DE5B80]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Endereço</h3>
                    <p className="text-muted-foreground">
                      Rua Exemplo, 123
                      <br />
                      São Paulo, SP
                      <br />
                      Brasil
                    </p>
                  </div>
                </div> */}

                <div className="flex items-start space-x-4">
                  <div className="bg-[#DE5B80]/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-[#DE5B80]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <Link href="mailto:contact@socialsync.com" className="text-muted-foreground hover:text-[#DE5B80]">
                      contact@socialsync.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#DE5B80]/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-[#DE5B80]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Telefone</h3>
                    <Link href="tel:+5511999999999" className="text-muted-foreground hover:text-[#DE5B80]">
                      +55 (11) 99999-9999
                    </Link>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Redes Sociais</h3>
                  <div className="flex space-x-4">
                    <Link
                      href="https://instagram.com"
                      className="bg-[#DE5B80]/10 p-3 rounded-full hover:bg-[#DE5B80]/20 transition-colors"
                    >
                      <Instagram className="h-6 w-6 text-[#DE5B80]" />
                      <span className="sr-only">Instagram</span>
                    </Link>
                    <Link
                      href="https://facebook.com"
                      className="bg-[#DE5B80]/10 p-3 rounded-full hover:bg-[#DE5B80]/20 transition-colors"
                    >
                      <Facebook className="h-6 w-6 text-[#DE5B80]" />
                      <span className="sr-only">Facebook</span>
                    </Link>
                    <Link
                      href="https://linkedin.com"
                      className="bg-[#DE5B80]/10 p-3 rounded-full hover:bg-[#DE5B80]/20 transition-colors"
                    >
                      <Linkedin className="h-6 w-6 text-[#DE5B80]" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/* <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Nossa Localização</h2>
          <div className="aspect-[16/9] max-h-[500px] rounded-xl overflow-hidden border shadow-sm">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-muted-foreground">Map placeholder - Google Maps would be integrated here</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}

