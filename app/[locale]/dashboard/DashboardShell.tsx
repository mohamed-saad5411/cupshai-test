"use client";

import DashboardSidebar from "@/components/creator/DashboardSidebar";
import DashboardSidebarRes from "@/components/creator/DashboardSidebarRes";
import { useAuthSession } from "@/hooks/useAuthSession";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
    const { isLoggedIn } = useAuthSession();

    return (
        <div className="min-h-screen flex flex-col  lg:grid lg:grid-cols-5">
            <div>
                <aside className="md:col-span-1  hidden md:block w-full border-b lg:border-b-0 lg:border-r border-slate-200 bg-white">
                    <DashboardSidebar />
                </aside>
                <nav className={` ${isLoggedIn ? "block" : "lg:col-span-1 md:hidden w-full border-b lg:border-b-0 lg:border-r border-slate-200 bg-white"}`}>
                    <DashboardSidebarRes />
                </nav>
            </div>
            <main className="lg:col-span-4 w-full bg-[#FAFAF8] mt-14">
                {children}
            </main>
        </div>
    );
}