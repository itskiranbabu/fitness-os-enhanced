import Sidebar from '@/components/dashboard/Sidebar';
import { Menu } from 'lucide-react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-950 flex text-slate-200 font-sans selection:bg-indigo-500/30">
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <div className="md:hidden h-16 border-b border-slate-800 bg-slate-900 flex items-center px-4 justify-between">
                    <span className="font-bold text-white">BusinessOS</span>
                    <button className="text-slate-400"><Menu /></button>
                </div>

                {children}
            </main>
        </div>
    );
}
