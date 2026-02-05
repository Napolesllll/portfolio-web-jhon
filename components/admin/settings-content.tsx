"use client";

import { motion, Variants } from "framer-motion";
import { ProfileInfo } from "@/components/admin/profile-info";
import { SecuritySettings } from "@/components/admin/security-settings";
import { AppearanceSettings } from "@/components/admin/appearance-settings";
import { NotificationSettings } from "@/components/admin/notification-settings";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0 },
    },
};

interface SettingsContentProps {
    name?: string | null;
    email?: string | null;
    role?: string | null;
}

export function SettingsContent({ name, email, role }: SettingsContentProps) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 lg:grid-cols-2"
        >
            {/* Left Column */}
            <div className="space-y-8">
                <ProfileInfo
                    name={name}
                    email={email}
                    role={role}
                />
                <AppearanceSettings />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                <SecuritySettings />
                <NotificationSettings />
            </div>
        </motion.div>
    );
}
