export interface LeadData {
    projectId: string;
    email: string;
    name?: string;
    phone?: string;
    message?: string;
    source?: string;
}

export const leadService = {
    /**
     * Submit a new lead from the public funnel
     */
    submitLead: async (data: LeadData) => {
        try {
            const response = await fetch('/api/leads/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to submit lead');
            }

            return await response.json();
        } catch (error) {
            console.error('Lead Submission Error:', error);
            throw error;
        }
    },

    /**
     * Fetch leads for the CRM Dashboard (Client-side)
     * Uses the standard Supabase client (Authenticated)
     */
    fetchLeads: async (projectId: string, supabaseClient: any) => {
        const { data, error } = await supabaseClient
            .from('inbound_leads')
            .select('*')
            .eq('project_id', projectId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    }
};
