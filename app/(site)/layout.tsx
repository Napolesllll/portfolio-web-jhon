import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthButton } from "@/components/layout/auth-button";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Button } from "@/components/ui/button";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar>
        <Suspense fallback={<Button size="sm" disabled>Cargando...</Button>}>
          <AuthButton />
        </Suspense>
      </Navbar>
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}