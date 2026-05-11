import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const body = await req.json();

    const { email } = body;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Credex AI Audit Report",
      html: "<p>Your audit report was generated successfully.</p>",
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}