'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Target,
    Globe,
    FileText,
    Zap,
    CreditCard,
    TrendingUp,
    ShoppingBag,
    Settings,
    LogOut
} from 'lucide-react';

import { useBusinessOS } from '@/providers/BusinessOSProvider';

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { config } = useBusinessOS();

    const handleSignOut = () => {
        router.push('/');
    };

    return (
        <aside className="w-64 border-r border-slate-800 bg-slate-900 hidden md:flex flex-col">
            <div className="p-6 border-b border-slate-800">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-white">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                        <span className="text-white">{config.verticalName ? config.verticalName.charAt(0) : 'B'}</span>
                    </div>
                    {config.verticalName || 'BusinessOS'}
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                <NavItem current={pathname} href="/dashboard" icon={LayoutDashboard} label="Mission Control" />
                <NavItem current={pathname} href="/clients" icon={Users} label="CRM" />
                <NavItem current={pathname} href="/leads" icon={Target} label="Lead Pipeline" />
                <NavItem current={pathname} href="/funnels/editor/new" icon={Globe} label="Funnel Builder" />
                <NavItem current={pathname} href="/growth" icon={FileText} label="Content Engine" />
                <NavItem current={pathname} href="/automations" icon={Zap} label="Automations" />
                <NavItem current={pathname} href="/monetization" icon={CreditCard} label="Monetization" />
                <NavItem current={pathname} href="/growth" icon={TrendingUp} label="Growth Lab" />
                <NavItem current={pathname} href="/marketplace" icon={ShoppingBag} label="Marketplace" />
                <NavItem current={pathname} href="/settings" icon={Settings} label="System" />
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg w-full transition-colors"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}

function NavItem({ href, icon: Icon, label, current }: { href: string; icon: any; label: string; current: string }) {
    const isActive = current === href || (href !== '/dashboard' && current.startsWith(href));
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all group ${isActive ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
                }`}
        >
            <Icon size={18} className={isActive ? 'text-indigo-400' : 'group-hover:text-white transition-colors'} />
            {label}
        </Link>
    );
}
