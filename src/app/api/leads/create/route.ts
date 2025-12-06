import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Supabase credentials missing");
}

const supabase = createClient(supabaseUrl || '', supabaseServiceKey || '');

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

        // 2. Insert into Supabase
        // Note: 'inbound_leads' table must exist in Supabase
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
            return NextResponse.json({ error: 'Failed to save lead', details: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, lead: data }, { status: 201 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
