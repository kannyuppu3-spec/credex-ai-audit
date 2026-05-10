"use client";

import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [aiSummary, setAiSummary] = useState("");

  const [tool, setTool] = useState("ChatGPT");
  const [plan, setPlan] = useState("Plus");
  const [monthlySpend, setMonthlySpend] = useState("");
  const [seats, setSeats] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [useCase, setUseCase] = useState("Coding");

  const [email, setEmail] = useState("");

  const [result, setResult] = useState("");

  const [monthlySavings, setMonthlySavings] = useState(0);
  const [annualSavings, setAnnualSavings] = useState(0);

  const [shareUrl, setShareUrl] = useState("");

  // Load localStorage + auth
  useEffect(() => {
    const savedTool = localStorage.getItem("tool");
    const savedPlan = localStorage.getItem("plan");
    const savedMonthlySpend = localStorage.getItem("monthlySpend");
    const savedSeats = localStorage.getItem("seats");
    const savedTeamSize = localStorage.getItem("teamSize");
    const savedUseCase = localStorage.getItem("useCase");

    if (savedTool) setTool(savedTool);
    if (savedPlan) setPlan(savedPlan);
    if (savedMonthlySpend) setMonthlySpend(savedMonthlySpend);
    if (savedSeats) setSeats(savedSeats);
    if (savedTeamSize) setTeamSize(savedTeamSize);
    if (savedUseCase) setUseCase(savedUseCase);

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Save localStorage
  useEffect(() => {
    localStorage.setItem("tool", tool);
    localStorage.setItem("plan", plan);
    localStorage.setItem("monthlySpend", monthlySpend);
    localStorage.setItem("seats", seats);
    localStorage.setItem("teamSize", teamSize);
    localStorage.setItem("useCase", useCase);
  }, [tool, plan, monthlySpend, seats, teamSize, useCase]);

  // Google Login
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  // Logout
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Generate Audit
  const generateAudit = async () => {
    setLoading(true);

    let recommendation = "";
    let savings = 0;

    if (plan === "Team" && Number(seats) < 3) {
      recommendation =
        `Your ${tool} Team plan may be too expensive for a small team. Downgrading to Plus could reduce costs.`;

      savings = 30;

    } else if (Number(monthlySpend) > 500) {
      recommendation =
        `Your AI spending is relatively high. Usage optimization may reduce unnecessary expenses.`;

      savings = 100;

    } else if (Number(teamSize) > 20) {
      recommendation =
        `Large teams often benefit from centralized AI billing and seat optimization.`;

      savings = 75;

    } else if (useCase === "Writing") {
      recommendation =
        `Content teams often overspend on overlapping AI writing tools.`;

      savings = 40;

    } else if (useCase === "Coding") {
      recommendation =
        `Developer teams can reduce AI expenses through optimized seat allocation.`;

      savings = 50;

    } else {
      recommendation =
        `Your current AI stack appears reasonably optimized.`;

      savings = 10;
    }

    setResult(recommendation);

    // AI Summary API
    const response = await fetch("/api/audit-summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tool,
        plan,
        monthlySpend,
        teamSize,
        useCase,
      }),
    });

    const aiData = await response.json();

    setAiSummary(aiData.summary);

    setMonthlySavings(savings);
    setAnnualSavings(savings * 12);

    // Save Audit
    const { data, error } = await supabase
  .from("audits")
  .insert([
    {
      tool,
      plan,
      monthly_spend: monthlySpend,
      seats,
      team_size: teamSize,
      use_case: useCase,
      recommendation,
      monthly_savings: savings,
      annual_savings: savings * 12,
      summary: aiSummary,
    },
  ])
  .select();

console.log("INSERT DATA:", data);
console.log("INSERT ERROR:", error);

if (data && data.length > 0) {

  const generatedUrl =
    `${window.location.origin}/audit/${data[0].id}`;

  setShareUrl(generatedUrl);
}
setLoading(false);
};
  // Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text("Credex AI Audit Report", 20, 20);

    doc.setFontSize(14);

    doc.text(`Tool: ${tool}`, 20, 50);
    doc.text(`Plan: ${plan}`, 20, 60);
    doc.text(`Monthly Spend: $${monthlySpend}`, 20, 70);
    doc.text(`Team Size: ${teamSize}`, 20, 80);

    doc.text(`Monthly Savings: $${monthlySavings}`, 20, 100);
    doc.text(`Annual Savings: $${annualSavings}`, 20, 110);

    doc.text("Recommendation:", 20, 130);

    doc.text(result, 20, 140, {
      maxWidth: 160,
    });

    doc.text("AI Summary:", 20, 170);

    doc.text(aiSummary, 20, 180, {
      maxWidth: 160,
    });

    doc.save("credex-audit-report.pdf");
  };

  // Send Email
  const sendEmail = async () => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          tool,
          plan,
          monthlySavings,
          annualSavings,
          recommendation: result,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Email sent successfully!");
      } else {
        toast.error("Failed to send email");
      }

    } catch (error) {
      console.log(error);
    }
  };

  // Copy Share Link
  const copyShareLink = async () => {
    try {

      await navigator.clipboard.writeText(shareUrl);

      toast.success("Link copied!");

    } catch (error) {

      console.log(error);

      const textArea = document.createElement("textarea");

      textArea.value = shareUrl;

      document.body.appendChild(textArea);

      textArea.select();

      document.execCommand("copy");

      document.body.removeChild(textArea);

      toast.success("Link copied!");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-800">

        <h1 className="text-2xl font-bold">
          Credex Audit
        </h1>

        {user ? (
          <div className="flex items-center gap-4">

            <p className="text-sm text-gray-400">
              {user.email}
            </p>

            <button
              onClick={signOut}
              className="bg-red-500 px-4 py-2 rounded-xl font-semibold"
            >
              Logout
            </button>

          </div>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="bg-white text-black px-4 py-2 rounded-xl font-semibold"
          >
            Login with Google
          </button>
        )}

      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">

        <h1 className="text-5xl md:text-7xl font-bold max-w-4xl leading-tight">
          Stop Overspending on AI Tools
        </h1>

        <p className="text-gray-400 mt-6 max-w-2xl text-lg">
          Audit your startup’s AI stack in under 60 seconds.
        </p>

      </section>

      {/* Form */}
      <section className="px-8 pb-24">

        <div className="max-w-3xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-8">

          <h2 className="text-3xl font-bold text-center">
            Start Your Free AI Spend Audit
          </h2>

          <form className="mt-10 space-y-6">

            <select
              value={tool}
              onChange={(e) => setTool(e.target.value)}
              className="w-full p-3 rounded-xl bg-black border border-gray-700"
            >
              <option>ChatGPT</option>
              <option>Claude</option>
              <option>Cursor</option>
              <option>GitHub Copilot</option>
              <option>Gemini</option>
            </select>

            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full p-3 rounded-xl bg-black border border-gray-700"
            >
              <option>Free</option>
              <option>Plus</option>
              <option>Team</option>
              <option>Enterprise</option>
            </select>

            <input
              type="number"
              value={monthlySpend}
              onChange={(e) => setMonthlySpend(e.target.value)}
              placeholder="Monthly Spend"
              className="w-full p-3 rounded-xl bg-black border border-gray-700"
            />

            <input
              type="number"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              placeholder="Seats"
              className="w-full p-3 rounded-xl bg-black border border-gray-700"
            />

            <input
              type="number"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              placeholder="Team Size"
              className="w-full p-3 rounded-xl bg-black border border-gray-700"
            />

            <select
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              className="w-full p-3 rounded-xl bg-black border border-gray-700"
            >
              <option>Coding</option>
              <option>Writing</option>
              <option>Research</option>
              <option>Data Analysis</option>
              <option>Mixed</option>
            </select>

            <button
              type="button"
              onClick={generateAudit}
              disabled={loading}
              className="w-full bg-white text-black py-3 rounded-xl font-semibold"
            >
              {loading ? "Generating..." : "Generate Audit"}
            </button>

          </form>

          {result && (
            <div className="mt-10 space-y-6">

              <div className="bg-black border border-gray-800 rounded-2xl p-6">

                <h2 className="text-2xl font-bold text-green-400">
                  Audit Result
                </h2>

                <p className="mt-4 text-gray-300 text-lg">
                  {result}
                </p>

              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

                <h3 className="text-2xl font-bold text-blue-400">
                  AI Summary
                </h3>

                <p className="mt-4 text-gray-300">
                  {aiSummary}
                </p>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black border border-gray-700 mt-4"
                />

                <button
                  onClick={sendEmail}
                  className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold mt-4"
                >
                  Send Report to Email
                </button>

                <button
                  onClick={downloadPDF}
                  className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold mt-4"
                >
                  Download PDF Report
                </button>

                <div className="bg-black border border-gray-800 rounded-2xl p-6 mt-6">

  <h3 className="text-xl font-bold mb-4">
    Share Audit
  </h3>

  <p className="text-green-400 break-all mb-4">
    {shareUrl || "No share URL yet"}
  </p>

  <button
    type="button"
    onClick={copyShareLink}
    className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold"
  >
    Copy Share Link
  </button>

</div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-black border border-gray-800 rounded-2xl p-6">

                  <p className="text-gray-400">
                    Monthly Savings
                  </p>

                  <h3 className="text-4xl font-bold mt-3">
                    ${monthlySavings}
                  </h3>

                </div>

                <div className="bg-black border border-gray-800 rounded-2xl p-6">

                  <p className="text-gray-400">
                    Annual Savings
                  </p>

                  <h3 className="text-4xl font-bold text-green-400 mt-3">
                    ${annualSavings}
                  </h3>

                </div>

              </div>

            </div>
          )}

        </div>

      </section>

    </main>
  );
}