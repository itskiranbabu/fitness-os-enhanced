import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Lazy client creation
const getSupabase = () => {
    if (!supabaseUrl || !supabaseServiceKey) {
        return null;
    }
    return createClient(supabaseUrl, supabaseServiceKey);
};

// Validation Schema
const LeadSchema = z.object({
    projectId: z.string().min(1),
    email: z.string().email(),
    name: z.string().optional(),
    phone: z.string().optional(),
    message: z.string().optional(),
    source: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. Validate Input
        const validatedData = LeadSchema.parse(body);

        // 2. Get Supabase Client
        const supabase = getSupabase();

        // --- DEMO MODE (Fallback) ---
        if (!supabase) {
            console.warn('⚠️ Supabase keys missing. Simulating lead capture in DEMO MODE.');

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 800));

            const demoLead = {
                id: 'demo-' + Date.now(),
                ...validatedData,
                created_at: new Date().toISOString(),
                status: 'NEW_LEAD',
                note: 'This is a demo lead because Supabase keys are not set.'
            };

            return NextResponse.json({
                success: true,
                lead: demoLead,
                isDemo: true,
                message: "Lead captured in Demo Mode (Configure Supabase for real data)"
            }, { status: 201 });
        }
        // -----------------------------

        // 3. Insert into Supabase
        const { data, error } = await supabase
            .from('inbound_leads')
            .insert({
                project_id: validatedData.projectId,
                email: validatedData.email,
                name: validatedData.name || 'Anonymous',
                phone: validatedData.phone,
                message: validatedData.message,
                source: validatedData.source || 'Website Funnel',
                status: 'NEW',
                created_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase Insert Error:', error);
            // Don't crash on DB error, maybe return formatted error
            return NextResponse.json({ error: 'Failed to save lead', details: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, lead: data }, { status: 201 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            // Safe access to errors
            return NextResponse.json({ error: 'Invalid data', details: (error as any).errors || error }, { status: 400 });
        }
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
