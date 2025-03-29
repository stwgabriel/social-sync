import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate the data
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real application, you would send an email here
    // Example with a mail service like Nodemailer, SendGrid, etc.

    // Also could store the message in a database
    // Example with a database like MongoDB, PostgreSQL, etc.

    // For now, we'll just log the data and return a success response
    console.log("Contact form submission:", { name, email, subject, message })

    // Simulate a small delay to show the loading state in the UI
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

