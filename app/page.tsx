import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Credex Audit</h1>

        <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200">
          Start Audit
        </button>
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

    </main>
  );
}
