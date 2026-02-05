import { auth } from "@/auth/auth";
import { SettingsHeader } from "@/components/admin/settings-header";
import { SettingsContent } from "@/components/admin/settings-content";

export default async function SettingsPage() {
    const session = await auth();

    return (
        <div className="relative min-h-screen pb-20">
            {/* Background Gradient */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-950" />

            {/* Header */}
            <div className="container mx-auto max-w-4xl px-4 pt-16 pb-12">
                <SettingsHeader />
            </div>

            {/* Settings Content */}
            <div className="container mx-auto max-w-4xl px-4">
                <SettingsContent
                    name={session?.user?.name}
                    email={session?.user?.email}
                    role={session?.user?.role}
                />
            </div>
        </div>
    );
}