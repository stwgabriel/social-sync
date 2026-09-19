"use server"

import { client } from "@/lib/sanity"
import { resend } from "@/lib/resend"

type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
  language?: "pt" | "en"
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

export async function submitContactForm(formData: ContactFormData) {
  const name = formData.name.trim()
  const email = formData.email.trim().toLowerCase()
  const company = formData.subject.trim()
  const message = formData.message.trim()

  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return { success: false, message: "Invalid contact form data" }
  }

  const destination = process.env.CONTACT_TO_EMAIL
  const from = process.env.RESEND_FROM_EMAIL

  if (!process.env.RESEND_API_KEY || !destination || !from) {
    console.error("Missing RESEND_API_KEY, RESEND_FROM_EMAIL, or CONTACT_TO_EMAIL")
    return { success: false, message: "Email service is not configured" }
  }

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeCompany = escapeHtml(company || "—")
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />")
  const language = formData.language ?? "pt"
  const isPortuguese = language === "pt"

  const { error } = await resend.batch.send([
    {
      from,
      to: [destination],
      replyTo: email,
      subject: `Novo contato — ${company || name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#1C122F">
          <h1 style="color:#3C215B">Nova mensagem pelo site</h1>
          <p><strong>Nome:</strong> ${safeName}</p>
          <p><strong>E-mail:</strong> ${safeEmail}</p>
          <p><strong>Empresa:</strong> ${safeCompany}</p>
          <p><strong>Idioma:</strong> ${language.toUpperCase()}</p>
          <hr style="border:0;border-top:1px solid #e5e0ea;margin:24px 0" />
          <p style="line-height:1.65">${safeMessage}</p>
        </div>
      `,
    },
    {
      from,
      to: [email],
      replyTo: destination,
      subject: isPortuguese ? "Recebemos sua mensagem — Social Sync" : "We received your message — Social Sync",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#1C122F">
          <h1 style="color:#3C215B">${isPortuguese ? `Olá, ${safeName}!` : `Hi, ${safeName}!`}</h1>
          <p style="font-size:16px;line-height:1.65">
            ${
              isPortuguese
                ? "Obrigado por entrar em contato. Recebemos sua mensagem e retornaremos em breve."
                : "Thanks for reaching out. We received your message and will get back to you soon."
            }
          </p>
          <div style="margin-top:28px;padding:20px;border-radius:14px;background:#F1EFE7">
            <strong>${isPortuguese ? "Sua mensagem" : "Your message"}</strong>
            <p style="line-height:1.65">${safeMessage}</p>
          </div>
          <p style="margin-top:28px;color:#3C215B">Social Sync</p>
        </div>
      `,
    },
  ])

  if (error) {
    console.error("Resend contact email error:", error)
    return { success: false, message: "Failed to send message" }
  }

  if (process.env.SANITY_API_TOKEN && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      await client.create({
        _type: "contactMessage",
        name,
        email,
        subject: company,
        message,
        receivedAt: new Date().toISOString(),
        status: "new",
      })
    } catch (error) {
      console.error("Sanity contact storage error:", error)
    }
  }

  return { success: true, message: "Message sent successfully" }
}
