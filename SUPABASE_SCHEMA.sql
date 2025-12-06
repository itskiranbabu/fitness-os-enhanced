-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Inbound Leads Table (For Public Funnels)
create table inbound_leads (
  id uuid default uuid_generate_v4() primary key,
  project_id text not null, -- Can be linked to a projects table later
  email text not null,
  name text,
  phone text,
  message text,
  source text default 'Website Funnel',
  status text default 'NEW', -- NEW, CONTACTED, QUALIFIED, CLOSED
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table inbound_leads enable row level security;

-- Policy: Allow anonymous inserts (for public lead forms)
create policy "Allow anonymous inserts"
on inbound_leads for insert
to anon
with check (true);

-- Policy: Allow authenticated users to view leads (for CRM dashboard)
create policy "Allow authenticated view"
on inbound_leads for select
to authenticated
using (true);

-- 2. Automations Table
create table automations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  name text not null,
  active boolean default false,
  trigger_config jsonb not null,
  steps jsonb[] not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table automations enable row level security;

create policy "Users can manage their own automations"
on automations for all
to authenticated
using (auth.uid() = user_id);

-- 3. Products Table
create table products (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  name text not null,
  description text,
  price decimal(10,2) not null,
  billing_type text default 'ONE_TIME', -- ONE_TIME, SUBSCRIPTION
  stripe_product_id text,
  stripe_price_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table products enable row level security;

create policy "Users can manage their own products"
on products for all
to authenticated
using (auth.uid() = user_id);
