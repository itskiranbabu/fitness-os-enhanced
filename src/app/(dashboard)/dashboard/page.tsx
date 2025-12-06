'use client';

import { useLeads } from '@/hooks/useLeads';
import { useClients } from '@/hooks/useClients';
import { useBusinessOS } from '@/providers/BusinessOSProvider';
import { ArrowUpRight, Users, DollarSign, Activity, Calendar, Loader2, Target, TrendingUp, Home } from 'lucide-react';
import { format } from 'date-fns';

export default function DashboardPage() {
    const { leads, loading: leadsLoading } = useLeads('test-project-1');
    const { clients, loading: clientsLoading } = useClients();
    const { config } = useBusinessOS();

    const loading = leadsLoading || clientsLoading;

    // --- Dynamic Metrics Engine ---

    // Common Stats
    const totalLeads = leads.length;
    const today = new Date().toDateString();
    const newLeadsToday = leads.filter(l => new Date(l.created_at).toDateString() === today).length;

    const totalClients = clients.length;
    const activeClients = clients.filter(c => c.status === 'Active').length;

    // Vertical Specific Helpers
    const getStats = () => {
        switch (config.vertical) {
            case 'AGENCY_OS':
                return [
                    { title: "Monthly Recurring Revenue", value: processActiveClientsValue(activeClients, 2000), icon: DollarSign, color: "indigo" },
                    { title: "Active Clients", value: activeClients.toString(), change: `+${clients.filter(c => new Date(c.created_at).toDateString() === today).length} today`, icon: Users, color: "blue" },
                    { title: "Lead Pipeline Value", value: processPipelineValue(totalLeads, 1500), icon: Target, color: "emerald" },
                    { title: "Close Rate", value: calculateConversion(activeClients, totalLeads), icon: Activity, color: "purple" }
                ];
            case 'REAL_ESTATE_OS':
                return [
                    { title: "Gross Commission Income", value: processActiveClientsValue(activeClients, 15000), icon: DollarSign, color: "emerald" },
                    { title: "Active Listings", value: activeClients.toString(), change: "Properties", icon: Home, color: "blue" },
                    { title: "Buyer Leads", value: totalLeads.toString(), icon: Users, color: "indigo" },
                    { title: "Showings Scheduled", value: (totalLeads * 0.2).toFixed(0), icon: Calendar, color: "purple" }
                ];
            case 'CREATOR_OS':
                return [
                    { title: "Product Sales", value: processActiveClientsValue(activeClients, 97), icon: DollarSign, color: "green" },
                    { title: "Community Members", value: activeClients.toString(), icon: Users, color: "blue" },
                    { title: "Newsletter Subs", value: (totalLeads * 10).toString(), icon: TrendingUp, color: "pink" },
                    { title: "Engagement Rate", value: "4.2%", icon: Activity, color: "orange" }
                ];
            default: // FitnessOS
                return [
                    { title: "Total Revenue", value: processActiveClientsValue(activeClients, 200), icon: DollarSign, color: "indigo" },
                    { title: "Active Athletes", value: activeClients.toString(), change: `+${clients.filter(c => new Date(c.created_at).toDateString() === today).length} today`, icon: Users, color: "blue" },
                    { title: "Lead Pipeline", value: totalLeads.toString(), icon: Target, color: "crimson" },
                    { title: "Check-in Rate", value: calculateCheckinRate(clients), icon: Activity, color: "emerald" }
                ];
        }
    };

    const stats = getStats();

    return (
        <div className="p-8 max-w-7xl mx-auto w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">{config.verticalName || 'BusinessOS'} Dashboard</h1>
                <p className="text-slate-400">Real-time overview for your {config.niche || 'business'}.</p>

                {/* Connection Warning */}
                {!loading && leads.length === 0 && clients.length === 0 && (
                    <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg text-sm flex items-center gap-2">
                        ⚠️ No data found. Make sure your database is connected to see Real-Time Analytics.
                    </div>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} loading={loading} />
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Activity Feed */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 h-[400px] flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-4">Live Activity Feed</h3>
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                        {loading ? (
                            <div className="flex justify-center p-8"><Loader2 className="animate-spin text-slate-500" /></div>
                        ) : clients.length === 0 && leads.length === 0 ? (
                            <p className="text-slate-500 text-center py-10">Waiting for live data...</p>
                        ) : (
                            <>
                                {clients.slice(0, 5).map(c => (
                                    <ActivityItem key={c.id} title={`New Client: ${c.name}`} subtitle={`Signed up for ${c.program}`} time={c.created_at} type="sale" />
                                ))}
                                {leads.slice(0, 5).map(l => (
                                    <ActivityItem key={l.id} title={`New Lead: ${l.name}`} subtitle={`via ${l.source}`} time={l.created_at} type="lead" />
                                ))}
                            </>
                        )}
                    </div>
                </div>

                {/* Recent Leads/Clients List */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 overflow-hidden flex flex-col h-[400px]">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
                        Recent {config.vertical === 'AGENCY_OS' ? 'Inquiries' : 'Prospects'}
                        {loading && <Loader2 size={16} className="animate-spin text-indigo-500" />}
                    </h3>

                    <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                        {leads.length === 0 && !loading && (
                            <div className="text-center text-slate-500 py-10">
                                <p>No leads captured yet.</p>
                            </div>
                        )}

                        {leads.slice(0, 10).map((lead) => (
                            <div key={lead.id} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0 hover:bg-slate-800/30 p-2 rounded transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-xs font-bold text-white uppercase shadow-lg">
                                        {lead.name.slice(0, 2)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white truncate max-w-[120px]" title={lead.name}>{lead.name}</p>
                                        <p className="text-xs text-slate-500 truncate max-w-[120px]">{lead.source}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-slate-400 whitespace-nowrap">
                                    {lead.created_at ? format(new Date(lead.created_at), 'MMM d') : '-'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helpers
function processActiveClientsValue(count: number, avgValue: number) {
    if (count === 0) return "$0.00";
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(count * avgValue);
}

function processPipelineValue(count: number, estimatedValue: number) {
    if (count === 0) return "$0.00";
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: "compact" }).format(count * estimatedValue);
}

function calculateConversion(clients: number, leads: number) {
    if (leads === 0) return "0%";
    return ((clients / leads) * 100).toFixed(1) + "%";
}

function calculateCheckinRate(clients: any[]) {
    if (clients.length === 0) return "0%";
    const checkedIn = clients.filter(c => c.last_check_in).length;
    return ((checkedIn / clients.length) * 100).toFixed(0) + "%";
}

function StatCard({ title, value, change, icon: Icon, color, loading }: any) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-${color}-500/10 text-${color}-500`}>
                    <Icon size={20} />
                </div>
                {change && (
                    <span className={`flex items-center gap-1 text-xs font-medium ${change.includes('+') ? 'text-green-400' : 'text-slate-400'
                        }`}>
                        {change}
                    </span>
                )}
            </div>
            <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
            <p className="text-2xl font-bold text-white">{loading ? '...' : value}</p>
        </div>
    );
}

function ActivityItem({ title, subtitle, time, type }: any) {
    return (
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
            <div className={`w-2 h-2 mt-2 rounded-full ${type === 'sale' ? 'bg-green-500' : 'bg-blue-500'}`} />
            <div className="flex-1">
                <p className="text-sm font-medium text-white">{title}</p>
                <p className="text-xs text-slate-500">{subtitle}</p>
            </div>
            <span className="text-xs text-slate-600">{format(new Date(time), 'MMM d')}</span>
        </div>
    );
}
