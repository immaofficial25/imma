import "server-only";
import { getAdminSession } from "next-auth/next";
import { redirect } from "next/navigation";
import GrantAccessForm from "@/app/admin/grants/GrantAccessForm";

export default async function GrantsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/");
  return <GrantAccessForm />;
}
