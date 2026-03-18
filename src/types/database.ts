export interface Promoter {
  id: string;
  email: string;
  name: string;
  business_name: string | null;
  phone: string | null;
  instagram: string | null;
  avatar_url: string | null;
  plan: "starter" | "pro" | "elite";
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_status: "trialing" | "active" | "past_due" | "canceled";
  trial_ends_at: string | null;
  twilio_phone: string | null;
  twilio_sid: string | null;
  bot_name: string;
  bot_personality: string;
  brand_color: string;
  logo_url: string | null;
  landing_page_slug: string | null;
  sms_limit: number;
  sms_used: number;
  venue_limit: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Venue {
  id: string;
  promoter_id: string;
  name: string;
  slug: string | null;
  city: string;
  genre: string | null;
  guest_list_url: string | null;
  referral_url: string | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Event {
  id: string;
  promoter_id: string;
  venue_id: string | null;
  venue_name: string;
  date: string;
  day_of_week: string;
  artist: string;
  genre: string | null;
  notes: string | null;
  created_at: string;
}

export interface GuestListEntry {
  id: string;
  promoter_id: string;
  phone: string;
  name: string;
  email: string | null;
  venue: string;
  event_date: string;
  party_size: number;
  men: number;
  women: number;
  status: "pending" | "confirmed" | "checked_in" | "no_show";
  source: "sms" | "web" | "manual" | "blast";
  submitted_to_venue: boolean;
  created_at: string;
}

export interface Contact {
  id: string;
  promoter_id: string;
  phone: string;
  name: string | null;
  email: string | null;
  instagram: string | null;
  tags: string[];
  notes: string | null;
  total_visits: number;
  last_contact: string;
  created_at: string;
}

export interface Message {
  id: string;
  promoter_id: string;
  phone: string;
  direction: "inbound" | "outbound";
  body: string;
  channel: "sms" | "web" | "email";
  created_at: string;
}

export interface Booking {
  id: string;
  promoter_id: string;
  phone: string | null;
  name: string;
  email: string | null;
  arrival_date: string | null;
  departure_date: string | null;
  party_size: number;
  notes: string | null;
  source: "manual" | "bot" | "web";
  status: "upcoming" | "confirmed" | "completed" | "cancelled";
  created_at: string;
}

export interface Blast {
  id: string;
  promoter_id: string;
  message: string;
  channel: "sms" | "email";
  recipients: number;
  sent: number;
  failed: number;
  status: "draft" | "sending" | "sent" | "failed";
  scheduled_for: string | null;
  sent_at: string | null;
  created_at: string;
}

// Plan limits
export const PLAN_LIMITS = {
  starter: { sms: 500, venues: 1, blasts: false, bookings: false, landing_page: false },
  pro: { sms: 1500, venues: 3, blasts: true, bookings: true, landing_page: false },
  elite: { sms: 5000, venues: 999, blasts: true, bookings: true, landing_page: true },
} as const;
