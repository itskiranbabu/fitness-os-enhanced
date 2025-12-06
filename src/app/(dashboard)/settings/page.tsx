'use client';

import React from 'react';
import { Settings, Save, Bell, Shield, User } from 'lucide-react';
import { useBusinessOS } from '@/providers/BusinessOSProvider';

export default function SettingsPage() {
    const { config } = useBusinessOS();

    return (
        <div className="p-8 max-w-4xl mx-auto w-full">
            <h1 className="text-3xl font-bold text-white mb-2">System Settings</h1>
            <p className="text-slate-400 mb-8">Configure your {config.verticalName || 'BusinessOS'} environment.</p>

            <div className="space-y-6">
                {/* Profile Section */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                            A
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Admin User</h3>
                            <p className="text-sm text-slate-400">admin@businessos.ai</p>
                        </div>
                        <button className="ml-auto px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700">
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* General Settings */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Shield size={18} className="text-indigo-400" /> General
                    </h3>

                    <div className="grid gap-4">
                        <div className="flex justify-between items-center p-3 bg-slate-950 rounded-lg border border-slate-800">
                            <div>
                                <p className="text-sm font-medium text-white">Dark Mode</p>
                                <p className="text-xs text-slate-500">System default</p>
                            </div>
                            <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-950 rounded-lg border border-slate-800">
                            <div>
                                <p className="text-sm font-medium text-white">Notifications</p>
                                <p className="text-xs text-slate-500">Email alerts for new leads</p>
                            </div>
                            <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors">
                        <Save size={18} /> Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
