"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const res = await fetch("/api/counter");
        const data = await res.json();

        setCount(data.count || 0);
      } catch (error) {
        console.log("Failed to fetch counter:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounter();
  }, []);

const updateCounter = async (newValue: number) => {
  setCount(newValue);

  try {
    await fetch("/api/counter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        count: newValue,
      }),
    });
  } catch (error) {
    console.log("Failed to update counter:", error);
  }
};

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-8 text-white">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/10 text-sm text-indigo-200 mb-4">
            PostgreSQL Counter
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            Persistent Counter App
          </h1>

          <p className="mt-4 text-slate-300 leading-relaxed">
            Counter value is now stored inside PostgreSQL and remains synced
            across refreshes.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-cyan-500 to-purple-600 opacity-30 rounded-full"></div>

            <div className="relative h-40 w-40 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center shadow-2xl border border-white/20">
              <span className="text-6xl font-black">
                {loading ? "..." : count}
              </span>
            </div>
          </div>

          <p className="mt-5 text-slate-300 text-lg">Database Synced</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <button
            onClick={() => updateCounter(count + 1)}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 font-semibold transition-all duration-300 hover:scale-[1.03]"
          >
            Increment
          </button>

          <button
            onClick={() => updateCounter(count - 1)}
            className="rounded-xl bg-gradient-to-r from-pink-500 to-red-500 px-5 py-3 font-semibold transition-all duration-300 hover:scale-[1.03]"
          >
            Decrement
          </button>
        </div>
      </div>
    </main>
  );
}