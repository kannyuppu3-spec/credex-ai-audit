import { supabase } from "@/lib/supabase";

export default async function AuditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const { data: audit, error } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  console.log(audit);
  console.log(error);

  if (error || !audit) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-500">
          Audit Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-8 py-20">

      <div className="max-w-3xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-green-400 mb-8">
          Shared Audit Report
        </h1>

        <div className="space-y-4">

          <p>
            <span className="text-gray-400">Tool:</span>{" "}
            {audit.tool}
          </p>

          <p>
            <span className="text-gray-400">Plan:</span>{" "}
            {audit.plan}
          </p>

          <p>
            <span className="text-gray-400">Monthly Spend:</span>{" "}
            ${audit.monthly_spend}
          </p>

          <p>
            <span className="text-gray-400">Team Size:</span>{" "}
            {audit.team_size}
          </p>

          <p>
            <span className="text-gray-400">Use Case:</span>{" "}
            {audit.use_case}
          </p>

          <p>
            <span className="text-gray-400">Recommendation:</span>{" "}
            {audit.recommendation}
          </p>

          <p>
            <span className="text-gray-400">Monthly Savings:</span>{" "}
            ${audit.monthly_savings}
          </p>

          <p>
            <span className="text-gray-400">Annual Savings:</span>{" "}
            ${audit.annual_savings}
          </p>

          <p>
            <span className="text-gray-400">AI Summary:</span>{" "}
            {audit.summary}
          </p>

        </div>

      </div>

    </main>
  );
}