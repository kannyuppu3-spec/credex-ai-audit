import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      
      <h1 className="text-5xl font-bold text-center">
        Audit Your AI Spend
      </h1>

      <p className="text-gray-400 mt-6 text-center max-w-2xl">
        Discover where your startup is overspending on AI tools and save thousands every year.
      </p>

      <button className="mt-8 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200">
        Start Free Audit
      </button>

    </main>
  );
}
