import Link from "next/link";
import { auth } from "@/auth/auth";
import { UserMenu } from "./user-menu";
import { Button } from "@/components/ui/button";

export async function AuthButton() {
  const session = await auth();

  if (session?.user) {
    return <UserMenu user={session.user} />;
  }

  return (
    <Button asChild size="sm">
      <Link href="/login">Iniciar sesión</Link>
    </Button>
  );
}
