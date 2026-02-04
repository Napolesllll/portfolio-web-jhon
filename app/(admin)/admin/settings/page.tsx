import { auth } from "@/auth/auth";
import { User, Lock, Palette, Bell } from "lucide-react";

export default async function SettingsPage() {
    const session = await auth();

    return (
        <div>
            <div className="mb-8">
                <h1 className="mb-2 font-display text-3xl font-bold">
                    Configuración
                </h1>
                <p className="text-foreground-secondary">
                    Administra tu cuenta y preferencias
                </p>
            </div>

            <div className="space-y-6">
                {/* Perfil */}
                <div className="rounded-xl border border-border bg-background-secondary p-6">
                    <div className="mb-4 flex items-center gap-3">
                        <User className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold">Perfil</h2>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm text-foreground-secondary">
                                Nombre
                            </label>
                            <p className="font-medium">{session?.user?.name}</p>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm text-foreground-secondary">
                                Email
                            </label>
                            <p className="font-medium">{session?.user?.email}</p>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm text-foreground-secondary">
                                Rol
                            </label>
                            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                {session?.user?.role}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Seguridad */}
                <div className="rounded-xl border border-border bg-background-secondary p-6">
                    <div className="mb-4 flex items-center gap-3">
                        <Lock className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold">Seguridad</h2>
                    </div>
                    <p className="text-sm text-foreground-secondary">
                        La gestión de contraseñas se realizará en una futura actualización.
                    </p>
                </div>

                {/* Apariencia */}
                <div className="rounded-xl border border-border bg-background-secondary p-6">
                    <div className="mb-4 flex items-center gap-3">
                        <Palette className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold">Apariencia</h2>
                    </div>
                    <p className="text-sm text-foreground-secondary">
                        Usa el toggle en el navbar para cambiar entre modo claro y oscuro.
                    </p>
                </div>

                {/* Notificaciones */}
                <div className="rounded-xl border border-border bg-background-secondary p-6">
                    <div className="mb-4 flex items-center gap-3">
                        <Bell className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold">Notificaciones</h2>
                    </div>
                    <p className="text-sm text-foreground-secondary">
                        Sistema de notificaciones disponible en una futura actualización.
                    </p>
                </div>
            </div>
        </div>
    );
}