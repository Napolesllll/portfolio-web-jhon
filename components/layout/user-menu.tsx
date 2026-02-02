"use client";

import { User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type UserMenuProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: "USER" | "ADMIN";
  };
};

export function UserMenu({ user }: UserMenuProps) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-2 rounded-lg p-2 transition-smooth hover:bg-background-secondary">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "User"}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
        )}
        <span className="hidden text-sm font-medium md:block">
          {user.name || user.email}
        </span>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="glass rounded-lg border border-border p-2 shadow-lg">
          <div className="border-b border-border px-3 py-2">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-foreground-tertiary">{user.email}</p>
          </div>

          <div className="space-y-1 py-2">
            {user.role === "ADMIN" && (
              <Link
                href="/admin"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-smooth hover:bg-background-tertiary"
              >
                <LayoutDashboard className="h-4 w-4" />
                Admin Panel
              </Link>
            )}

            <Link
              href="/settings"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-smooth hover:bg-background-tertiary"
            >
              <Settings className="h-4 w-4" />
              Configuración
            </Link>

            <form action={logout}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 transition-smooth hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}