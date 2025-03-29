"use server"

import { client } from "@/lib/sanity"
import nodemailer from "nodemailer"

type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

export async function submitContactForm(formData: ContactFormData) {
  try {
    // 1. Store the message in Sanity CMS
    await client.create({
      _type: "contactMessage",
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      receivedAt: new Date().toISOString(),
      status: "new",
    })

    // 2. Send email notification
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: process.env.EMAIL_SERVER_PORT === "465",
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form: ${formData.subject}`,
      text: `
        Name: ${formData.name}
        Email: ${formData.email}
        Subject: ${formData.subject}
        
        Message:
        ${formData.message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <h3>Message:</h3>
        <p>${formData.message.replace(/\n/g, "<br>")}</p>
      `,
    })

    return { success: true, message: "Message sent successfully" }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return { success: false, message: "Failed to send message" }
  }
}

