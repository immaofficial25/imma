import "server-only";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin";
import GrantAccessForm from "./GrantAccessForm";

export default async function GrantsPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
            Admin Tools
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            Grant Course Access
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Give a student access to any course without requiring payment.
            Access is granted immediately and can be revoked later if needed.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">
              Access Type
            </p>
            <p className="mt-2 text-lg font-semibold">
              Manual Grant
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">
              Payment Required
            </p>
            <p className="mt-2 text-lg font-semibold">
              No
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">
              Access Status
            </p>
            <p className="mt-2 text-lg font-semibold">
              Permanent
            </p>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="rounded-3xl border bg-card shadow-sm">
          <div className="border-b p-6">
            <h2 className="text-xl font-semibold">
              Add Student Access
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Enter the student's email and select the course you want
              to unlock.
            </p>
          </div>

          <div className="p-6">
            <GrantAccessForm />
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="font-medium text-amber-900">
            Important
          </h3>

          <ul className="mt-2 space-y-1 text-sm text-amber-800">
            <li>• Student must already have an account.</li>
            <li>• Access is granted immediately.</li>
            <li>• Duplicate grants are automatically prevented.</li>
            <li>• Existing purchases are not affected.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}