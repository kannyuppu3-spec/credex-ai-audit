"use client";
import { useEffect, useState } from "react";
import { supabase } from  "@/lib/supabase";
import Image from "next/image";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [tool, setTool] = useState("ChatGPT");
const [plan, setPlan] = useState("Plus");
const [monthlySpend, setMonthlySpend] = useState("");
const [seats, setSeats] = useState("");
const [teamSize, setTeamSize] = useState("");
const [useCase, setUseCase] = useState("Coding");
const [result, setResult] = useState("");
const [monthlySavings, setMonthlySavings] = useState(0);

const [annualSavings, setAnnualSavings] = useState(0);
useEffect(() => {

  localStorage.setItem("tool", tool);
  localStorage.setItem("plan", plan);
  localStorage.setItem("monthlySpend", monthlySpend);
  localStorage.setItem("seats", seats);
  localStorage.setItem("teamSize", teamSize);
  localStorage.setItem("useCase", useCase);

}, [tool, plan, monthlySpend, seats, teamSize, useCase]);
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

  const getSession = async () => {
    const { data } = await supabase.auth.getSession();

    if (data.session) {
      setUser(data.session.user);
    }
  };

  getSession();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setUser(session?.user ?? null);
    }
  );

  return () => subscription.unsubscribe();

}, []);
const generateAudit = async () => {
  
setLoading(true);
  let recommendation = "";
  let savings = 0;

  // Small team overpaying
  if (plan === "Team" && Number(seats) < 3) {

    recommendation =
      `Your ${tool} Team plan may be too expensive for a small team. Downgrading to Plus could significantly reduce costs.`;

    savings = 30;
  }

  // High spending
  else if (Number(monthlySpend) > 500) {

    recommendation =
      `Your AI spending is relatively high. Credex enterprise credits and usage optimization may reduce unnecessary expenses.`;

    savings = 100;
  }

  // Large team recommendation
  else if (Number(teamSize) > 20) {

    recommendation =
      `Large teams often benefit from centralized AI billing and seat optimization strategies.`;

    savings = 75;
  }

  // Marketing use case
  else if (useCase === "Marketing") {

    recommendation =
      `Marketing teams often overspend on overlapping AI content tools. Consolidation may reduce costs.`;

    savings = 40;
  }

  // Coding use case
  else if (useCase === "Coding") {

    recommendation =
      `Developer teams can often reduce AI expenses through shared enterprise tooling and optimized seat allocation.`;

    savings = 50;
  }

  // Default
  else {

    recommendation =
      `Your current AI stack appears reasonably optimized.`;

    savings = 10;
  }

  setMonthlySavings(savings);

  setAnnualSavings(savings * 12);

  setResult(
    recommendation
  );
  const { error } = await supabase
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
    },
  ]);

if (error) {
  console.log(error);
}
else {
  console.log("Audit saved successfully");
}setLoading(false);
};
const signInWithGoogle = async () => {

  const { data, error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: "http://localhost:3000",
  },
});

  if (error) {
    console.log(error);
  }
};const signOut = async () => {
  await supabase.auth.signOut();
  setUser(null);
};
useEffect(() => {

  const checkUser = async () => {

    const { data } = await supabase.auth.getUser();

    if (data.user) {
      setUser(data.user);
    }

  };

  checkUser();

}, []);

  return (
    
    <main className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-800">

  <h1 className="text-2xl font-bold">
    Credex Audit
  </h1>

  {user ? (
    <button
      onClick={signOut}
      className="bg-red-500 text-white px-4 py-2 rounded-xl font-semibold"
    >
      Logout
    </button>
  ) : (
    <button
      onClick={signInWithGoogle}
      className="bg-white text-black px-4 py-2 rounded-xl font-semibold"
    >
      Login with Google
    </button>
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

      <button
  type="button"
  onClick={generateAudit}
  className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200"
>
  Generate Audit
</button>
    </form>

  </div>

</section>
    </main>
    
  );
  
}
