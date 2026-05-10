"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {

  const [audits, setAudits] = useState<any[]>([]);

  useEffect(() => {
    fetchAudits();
  }, []);

  const fetchAudits = async () => {

    const { data, error } = await supabase
      .from("audits")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setAudits(data || []);
    }
  };

  const deleteAudit = async (id: number) => {

    await supabase
      .from("audits")
      .delete()
      .eq("id", id);

    fetchAudits();
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold mb-10">
        Audit Dashboard
      </h1>

      <div className="grid gap-6">

        {audits.map((audit) => (

          <div
            key={audit.id}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
          >

            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-2xl font-bold">
                  {audit.tool}
                </h2>

                <p className="text-gray-400 mt-2">
                  Plan: {audit.plan}
                </p>

                <p className="text-gray-400">
                  Monthly Spend: ${audit.monthly_spend}
                </p>

                <p className="text-gray-400">
                  Team Size: {audit.team_size}
                </p>

                <p className="text-green-400 mt-4">
                  Monthly Savings: ${audit.monthly_savings}
                </p>

                <p className="text-green-500">
                  Annual Savings: ${audit.annual_savings}
                </p>

                <p className="mt-4 text-gray-300">
                  {audit.recommendation}
                </p>

              </div>

              <button
                onClick={() => deleteAudit(audit.id)}
                className="bg-red-500 px-4 py-2 rounded-xl"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}