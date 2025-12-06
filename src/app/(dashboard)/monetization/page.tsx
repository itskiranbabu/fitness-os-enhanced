'use client';

import React from 'react';
import { CreditCard, Plus, CheckCircle, ExternalLink, DollarSign, Package } from 'lucide-react';
import { useClients } from '@/hooks/useClients';
import { useBusinessOS } from '@/providers/BusinessOSProvider';

export default function MonetizationPage() {
    const { clients, loading } = useClients();
    const { config } = useBusinessOS();

    const activeClients = clients.filter(c => c.status === 'Active').length;

    // Revenue Logic
    const getRevenueStats = () => {
        let avgPrice = 0;
        switch (config.vertical) {
            case 'AGENCY_OS': avgPrice = 2000; break;
            case 'REAL_ESTATE_OS': avgPrice = 15000; break;
            case 'CREATOR_OS': avgPrice = 97; break;
            default: avgPrice = 200; break;
        }
        return {
            amount: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(activeClients * avgPrice),
            subs: activeClients
        };
    };

    const stats = getRevenueStats();

    // Dynamic Products Logic
    const getProducts = () => {
        switch (config.vertical) {
            case 'AGENCY_OS':
                return [
                    {
                        id: 1, name: "Consulting Hour", price: "$500", type: "One-Time",
                        features: ["Strategy Audit", "roadmap Design", "Recording Included"], cta: "Copy Payment Link", status: "ACTIVE"
                    },
                    {
                        id: 2, name: "Growth Retainer", price: "$3,000/mo", type: "Recurring",
                        features: ["Weekly Syncs", "Done-For-You Outreach", "Priority Support"], cta: "Copy Payment Link", status: "ACTIVE"
                    },
                    {
                        id: 3, name: "Full Service Agency", price: "$10,000/mo", type: "Recurring",
                        features: ["Dedicated Account Manager", "Unlimited Edits", "Content Production"], cta: "Copy Payment Link", status: "ACTIVE"
                    }
                ];
            case 'CREATOR_OS':
                return [
                    { id: 1, name: "Creator Handbook", price: "$49", type: "Digital Product", features: ["PDF Guide", "Templates"], cta: "Copy Link", status: "ACTIVE" },
                    { id: 2, name: "Mastermind Community", price: "$99/mo", type: "Recurring", features: ["Discord Access", "Weekly Q&A"], cta: "Copy Link", status: "ACTIVE" },
                    { id: 3, name: "Brand Deal Consulting", price: "$1,500", type: "Service", features: ["Contract Review", "Negotiation"], cta: "Copy Link", status: "ACTIVE" }
                ];
            default: // Fitness
                return [
                    {
                        id: 1, name: "Jumpstart Guide", price: "$97", type: "One-Time",
                        features: ["8-Week Digital Guide", "Nutrition Plan", "Workout Routines"], cta: "Copy Payment Link", status: "ACTIVE"
                    },
                    {
                        id: 2, name: "1:1 Online Coaching", price: "$297/month", type: "Recurring",
                        features: ["Weekly Coaching Calls", "Daily Accountability", "Custom Plans"], cta: "Copy Payment Link", status: "ACTIVE"
                    }
                ];
        }
    };

    const products = getProducts();

    return (
        <div className="p-8 max-w-7xl mx-auto w-full">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Monetization</h1>
                    <p className="text-slate-400">Manage your {config.verticalName || 'BusinessOS'} products and revenue.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-200 transition-colors">
                    <ExternalLink size={16} />
                    Open Stripe Dashboard
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Revenue Card (Real-Time based on Client Count) */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">
                        <CreditCard size={14} /> Estimated MRR
                    </div>
                    <div className="text-5xl font-extrabold text-white mb-2">{stats.amount}</div>
                    <p className="text-slate-500 text-sm">Active Clients: {stats.subs} {loading && '...'}</p>
                </div>

                {/* Product Cards */}
                {products.map(product => (
                    <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col hover:border-slate-700 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-lg text-white">{product.name}</h3>
                            <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full uppercase">
                                {product.status}
                            </span>
                        </div>

                        <div className="text-2xl font-bold text-indigo-400 mb-1">{product.price}</div>
                        <div className="text-xs text-slate-500 uppercase font-bold mb-6">{product.type}</div>

                        <ul className="space-y-3 mb-8 flex-1">
                            {product.features.map((f, i) => (
                                <li key={i} className="flex gap-2 text-sm text-slate-300">
                                    <CheckCircle size={16} className="text-green-500 min-w-[16px] mt-0.5" />
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-bold border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2">
                            <DollarSign size={16} />
                            {product.cta}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
