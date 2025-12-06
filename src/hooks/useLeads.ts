import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { leadService } from '@/lib/services/leadService';

// Initialize client-side Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export interface Lead {
    id: string;
    project_id: string;
    email: string;
    name?: string;
    phone?: string;
    message?: string;
    source?: string;
    status: string;
    created_at: string;
}

export function useLeads(projectId: string) {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!projectId) return;

        // Initial Fetch
        const loadLeads = async () => {
            try {
                setLoading(true);
                const data = await leadService.fetchLeads(projectId, supabase);
                setLeads(data as Lead[]);
            } catch (err: any) {
                console.error('Error loading leads:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadLeads();

        // Real-time Subscription
        const channel = supabase
            .channel('leads-realtime')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'inbound_leads',
                    filter: `project_id=eq.${projectId}`,
                },
                (payload) => {
                    // Add new lead to state instantly
                    const newLead = payload.new as Lead;
                    setLeads((prev) => [newLead, ...prev]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [projectId]);

    return { leads, loading, error };
}
