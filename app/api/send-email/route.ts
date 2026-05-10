import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {

  const body = await req.json();

  const {
    email,
    tool,
    plan,
    monthlySavings,
    annualSavings,
    recommendation,
  } = body;

  try {

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your Credex AI Audit Report",
      html: `
        <h1>Credex AI Audit</h1>

        <p><strong>Tool:</strong> ${tool}</p>

        <p><strong>Plan:</strong> ${plan}</p>

        <p><strong>Monthly Savings:</strong> $${monthlySavings}</p>

        <p><strong>Annual Savings:</strong> $${annualSavings}</p>

        <p>${recommendation}</p>
      `,
    });

    return Response.json({
      success: true,
    });

  } catch (error) {

    return Response.json({
      success: false,
      error,
    });

  }
}