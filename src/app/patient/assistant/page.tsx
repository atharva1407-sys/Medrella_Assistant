import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth";
import { getInsuranceProvider } from "@/lib/insurance";
import { AssistantChat } from "./assistant-chat";

export const dynamic = "force-dynamic";

export default async function AssistantPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirectTo=/patient/assistant");
  if (user.role !== "PATIENT") redirect("/doctor/dashboard");

  const configured = Boolean(process.env.SARVAM_API_KEY?.trim());
  const firstName = user.name.split(" ")[0] || "there";

  return (
    <div className="space-y-5">
      <div>
        <div className="text-[11px] font-bold tracking-wider text-slate-400">PATIENT CARE · VIRTUAL HELPER</div>
        <h1 className="text-2xl font-bold text-slate-900">Medrella Assistant</h1>
        <p className="text-sm text-slate-500">
          Ask in English, Hindi or Marathi: find a doctor, check open slots, review your appointments and insurance.
        </p>
      </div>
      <AssistantChat firstName={firstName} configured={configured} insuranceEnabled={Boolean(getInsuranceProvider())} />
    </div>
  );
}
