"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [tool, setTool] = useState("ChatGPT");
const [plan, setPlan] = useState("Plus");
const [monthlySpend, setMonthlySpend] = useState("");
const [seats, setSeats] = useState("");
const [teamSize, setTeamSize] = useState("");
const [useCase, setUseCase] = useState("Coding");
const [result, setResult] = useState("");
const generateAudit = () => {

  let recommendation = "";
  let savings = 0;

  // Rule 1
  if (plan === "Team" && Number(seats) < 3) {
    recommendation =
      `Your ${tool} Team plan may be too expensive for a small team. Switching to Plus could reduce unnecessary spending.`;

    savings = 30;
  }

  // Rule 2
  else if (monthlySpend && Number(monthlySpend) > 500) {
    recommendation =
      `Your AI spending is relatively high. You may benefit from discounted AI credits through Credex.`;

    savings = 100;
  }

  // Default
  else {
    recommendation =
      `Your current AI setup appears reasonably optimized.`;
  }

  setResult(
    `Potential Savings: $${savings}/month — ${recommendation}`
  );
};
  return (
    
    <main className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Credex Audit</h1>

        <button
  type="button"
  onClick={generateAudit}
  className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200"
>
  Generate Audit
</button>
{result && (
  <div className="mt-6 p-5 rounded-2xl border border-gray-700 bg-black">
    
    <h3 className="text-xl font-semibold text-green-400">
      Audit Result
    </h3>

    <p className="mt-3 text-gray-300">
      {result}
    </p>

  </div>
)}
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">

        <h1 className="text-5xl md:text-7xl font-bold max-w-4xl leading-tight">
          Stop Overspending on AI Tools
        </h1>

        <p className="text-gray-400 mt-6 max-w-2xl text-lg">
          Audit your startup’s AI stack in under 60 seconds and discover hidden savings opportunities.
        </p>

        <button className="mt-8 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200">
          Start Free Audit
        </button>

      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-20">

        <div className="border border-gray-800 rounded-2xl p-6 bg-gray-900">
          <h2 className="text-xl font-semibold">
            Instant AI Spend Analysis
          </h2>

          <p className="text-gray-400 mt-4">
            Detect where your team is wasting money on unnecessary AI subscriptions.
          </p>
        </div>

        <div className="border border-gray-800 rounded-2xl p-6 bg-gray-900">
          <h2 className="text-xl font-semibold">
            Smarter Plan Recommendations
          </h2>

          <p className="text-gray-400 mt-4">
            Find cheaper plans and better AI tools tailored to your use case.
          </p>
        </div>

        <div className="border border-gray-800 rounded-2xl p-6 bg-gray-900">
          <h2 className="text-xl font-semibold">
            Annual Savings Forecast
          </h2>

          <p className="text-gray-400 mt-4">
            See how much your startup can save every year with optimized AI spending.
          </p>
        </div>

      </section>
{/* Audit Form Section */}
<section className="px-8 pb-24">

  <div className="max-w-3xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-8">

    <h2 className="text-3xl font-bold text-center">
      Start Your Free AI Spend Audit
    </h2>

    <p className="text-gray-400 text-center mt-4">
      Enter your current AI tools and monthly spending.
    </p>

    <form className="mt-10 space-y-6">

      {/* Tool Name */}
      <div>
        <label className="block mb-2 font-medium">
          AI Tool
        </label>

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
      </div>

      {/* Plan */}
      <div>
        <label className="block mb-2 font-medium">
          Plan
        </label>

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
      </div>

      {/* Monthly Spend */}
      <div>
        <label className="block mb-2 font-medium">
          Monthly Spend ($)
        </label>

        <input
  type="number"
  value={monthlySpend}
  onChange={(e) => setMonthlySpend(e.target.value)}
  placeholder="100"
  className="w-full p-3 rounded-xl bg-black border border-gray-700"
/>
      </div>

      {/* Seats */}
      <div>
        <label className="block mb-2 font-medium">
          Number of Seats
        </label>

        <input
  type="number"
  value={seats}
  onChange={(e) => setSeats(e.target.value)}
  placeholder="5"
  className="w-full p-3 rounded-xl bg-black border border-gray-700"
/>
      </div>

      {/* Team Size */}
      <div>
        <label className="block mb-2 font-medium">
          Team Size
        </label>

        <input
  type="number"
  value={teamSize}
  onChange={(e) => setTeamSize(e.target.value)}
  placeholder="10"
  className="w-full p-3 rounded-xl bg-black border border-gray-700"
/>
      </div>

      {/* Use Case */}
      <div>
        <label className="block mb-2 font-medium">
          Primary Use Case
        </label>

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
      </div>

      <button className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200">
        Generate Audit
      </button>

    </form>

  </div>

</section>
    </main>
    
  );
  
}
