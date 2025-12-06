import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize client-side Supabase safely
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export interface Client {
    id: string;
    name: string;
    email: string;
    status: string;
    program: string;
    progress: number;
    last_check_in?: string;
    created_at: string;
}

export function useClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDemo, setIsDemo] = useState(false);

    useEffect(() => {
        // If no supabase client, we can't fetch real data
        if (!supabase) {
            console.warn('Supabase keys missing.');
            setClients([]);
            setIsDemo(true);
            setLoading(false);
            return;
        }

        const fetchClients = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('clients')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setClients(data as Client[]);
            } catch (err: any) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();

        // Real-time Subscription
        const channel = supabase
            .channel('clients-realtime')
            .on(
                'postgres_changes',
                {
                    event: '*', // Listen to all changes
                    schema: 'public',
                    table: 'clients',
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setClients((prev) => [payload.new as Client, ...prev]);
                    } else if (payload.eventType === 'DELETE') {
                        setClients((prev) => prev.filter(c => c.id !== payload.old.id));
                    } else if (payload.eventType === 'UPDATE') {
                        setClients((prev) => prev.map(c => c.id === payload.new.id ? payload.new as Client : c));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return { clients, loading, error, isDemo };
}
