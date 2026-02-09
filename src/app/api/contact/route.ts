import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: { name, email, phone: phone || null, message },
    });

    // Optional: Send notification email via Resend
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_...") {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "Chidiac Optic <noreply@chidiacoptic.com>",
          to: "info@chidiacoptic.com",
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        });
      } catch {
        // Email sending is optional — don't fail the request
      }
    }

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
