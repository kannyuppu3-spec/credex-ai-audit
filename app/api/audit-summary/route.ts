import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const body = await req.json();

  const {
    tool,
    plan,
    monthlySpend,
    teamSize,
    useCase,
  } = body;

  let summary = "";

  if (Number(monthlySpend) > 500) {

    summary =
      `Your organization is spending heavily on AI tooling. Consolidating redundant subscriptions and optimizing seat allocation could significantly reduce recurring operational costs while maintaining productivity.`;

  } else if (useCase === "Coding") {

    summary =
      `Developer-focused AI workflows benefit most from optimized seat distribution and centralized billing. Your current setup shows opportunities for cost-efficient scaling.`;

  } else if (useCase === "Writing") {

    summary =
      `Content-focused teams often accumulate overlapping AI writing subscriptions. Standardizing tools across teams may improve efficiency and reduce monthly spend.`;

  } else if (Number(teamSize) > 20) {

    summary =
      `Larger teams typically achieve better cost efficiency through enterprise-level AI management and usage monitoring strategies.`;

  } else {

    summary =
      `Your current AI stack appears relatively optimized, though periodic audits can still uncover hidden savings opportunities and redundant tooling.`;
  }

  return NextResponse.json({
    summary,
  });
}