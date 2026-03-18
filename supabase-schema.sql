-- VelvetAI Multi-Tenant Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- PROMOTERS (Tenants)
-- ============================================
create table promoters (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  password_hash text not null,
  name text not null,
  business_name text,
  phone text,
  instagram text,
  avatar_url text,
  -- Subscription & billing
  plan text not null default 'starter' check (plan in ('starter', 'pro', 'elite')),
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text default 'trialing' check (subscription_status in ('trialing', 'active', 'past_due', 'canceled')),
  trial_ends_at timestamp with time zone default (now() + interval '14 days'),
  -- Twilio
  twilio_phone text,
  twilio_sid text,
  -- Bot customization
  bot_name text default 'VelvetAI',
  bot_personality text default 'friendly, helpful, knowledgeable about nightlife',
  -- Branding
  brand_color text default '#9333ea',
  logo_url text,
  landing_page_slug text unique,
  -- Limits
  sms_limit integer default 500,
  sms_used integer default 0,
  venue_limit integer default 1,
  -- Status
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ============================================
-- VENUES (Per Promoter)
-- ============================================
create table venues (
  id uuid primary key default uuid_generate_v4(),
  promoter_id uuid not null references promoters(id) on delete cascade,
  name text not null,
  slug text,
  city text default 'Las Vegas',
  genre text,
  guest_list_url text,
  referral_url text,
  notes text,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- ============================================
-- EVENTS
-- ============================================
create table events (
  id uuid primary key default uuid_generate_v4(),
  promoter_id uuid not null references promoters(id) on delete cascade,
  venue_id uuid references venues(id) on delete set null,
  venue_name text not null,
  date date not null,
  day_of_week text not null,
  artist text not null,
  genre text,
  notes text,
  created_at timestamp with time zone default now()
);

-- ============================================
-- GUEST LIST
-- ============================================
create table guest_list (
  id uuid primary key default uuid_generate_v4(),
  promoter_id uuid not null references promoters(id) on delete cascade,
  phone text not null,
  name text not null,
  email text,
  venue text not null,
  event_date date not null,
  party_size integer not null default 1,
  men integer default 0,
  women integer default 0,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'checked_in', 'no_show')),
  source text default 'sms' check (source in ('sms', 'web', 'manual', 'blast')),
  submitted_to_venue boolean default false,
  created_at timestamp with time zone default now()
);

-- ============================================
-- CONTACTS
-- ============================================
create table contacts (
  id uuid primary key default uuid_generate_v4(),
  promoter_id uuid not null references promoters(id) on delete cascade,
  phone text not null,
  name text,
  email text,
  instagram text,
  tags text[] default '{}',
  notes text,
  total_visits integer default 0,
  last_contact timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  unique(promoter_id, phone)
);

-- ============================================
-- MESSAGES (SMS History)
-- ============================================
create table messages (
  id uuid primary key default uuid_generate_v4(),
  promoter_id uuid not null references promoters(id) on delete cascade,
  phone text not null,
  direction text not null check (direction in ('inbound', 'outbound')),
  body text not null,
  channel text default 'sms' check (channel in ('sms', 'web', 'email')),
  created_at timestamp with time zone default now()
);

-- ============================================
-- BOOKINGS (Trip Management)
-- ============================================
create table bookings (
  id uuid primary key default uuid_generate_v4(),
  promoter_id uuid not null references promoters(id) on delete cascade,
  phone text,
  name text not null,
  email text,
  arrival_date date,
  departure_date date,
  party_size integer default 1,
  notes text,
  source text default 'manual' check (source in ('manual', 'bot', 'web')),
  status text default 'upcoming' check (status in ('upcoming', 'confirmed', 'completed', 'cancelled')),
  created_at timestamp with time zone default now()
);

-- ============================================
-- BLASTS (Mass Messages)
-- ============================================
create table blasts (
  id uuid primary key default uuid_generate_v4(),
  promoter_id uuid not null references promoters(id) on delete cascade,
  message text not null,
  channel text default 'sms' check (channel in ('sms', 'email')),
  recipients integer default 0,
  sent integer default 0,
  failed integer default 0,
  status text default 'draft' check (status in ('draft', 'sending', 'sent', 'failed')),
  scheduled_for timestamp with time zone,
  sent_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- ============================================
-- LEADS (From landing page signups)
-- ============================================
create table leads (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text not null,
  business_name text,
  instagram text,
  city text,
  venues text,
  message text,
  plan text default 'starter',
  converted boolean default false,
  created_at timestamp with time zone default now()
);

-- ============================================
-- INDEXES
-- ============================================
create index idx_venues_promoter on venues(promoter_id);
create index idx_events_promoter on events(promoter_id);
create index idx_events_date on events(date);
create index idx_guest_list_promoter on guest_list(promoter_id);
create index idx_guest_list_event_date on guest_list(event_date);
create index idx_guest_list_phone on guest_list(phone);
create index idx_contacts_promoter on contacts(promoter_id);
create index idx_contacts_phone on contacts(phone);
create index idx_messages_promoter on messages(promoter_id);
create index idx_messages_phone on messages(phone);
create index idx_bookings_promoter on bookings(promoter_id);
create index idx_blasts_promoter on blasts(promoter_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
alter table promoters enable row level security;
alter table venues enable row level security;
alter table events enable row level security;
alter table guest_list enable row level security;
alter table contacts enable row level security;
alter table messages enable row level security;
alter table bookings enable row level security;
alter table blasts enable row level security;

-- Service role policies (server-side only)
create policy "Service role full access" on promoters for all using (true) with check (true);
create policy "Service role full access" on venues for all using (true) with check (true);
create policy "Service role full access" on events for all using (true) with check (true);
create policy "Service role full access" on guest_list for all using (true) with check (true);
create policy "Service role full access" on contacts for all using (true) with check (true);
create policy "Service role full access" on messages for all using (true) with check (true);
create policy "Service role full access" on bookings for all using (true) with check (true);
create policy "Service role full access" on blasts for all using (true) with check (true);
