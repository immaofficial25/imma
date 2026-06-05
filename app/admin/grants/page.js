import "server-only";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin";
import GrantAccessForm from "./GrantAccessForm";

export default async function GrantsPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/");
  }

  return <GrantAccessForm />;
}