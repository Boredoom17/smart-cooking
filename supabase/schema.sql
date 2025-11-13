-- extensions
id uuid primary key default gen_random_uuid(),
user_id uuid references auth.users(id) on delete set null,
image_url text not null,
label text not null,
confidence double precision not null,
created_at timestamptz default now()
);


create table if not exists public.ingredients (
id uuid primary key default gen_random_uuid(),
name text unique not null,
category text check (category in ('vegetable','fruit','spice','grain','protein','dairy','other')) default 'other',
is_active boolean default true,
yolo_target boolean default false,
image_count int default 0,
created_at timestamptz default now()
);


create table if not exists public.recipes (
id uuid primary key default gen_random_uuid(),
title text not null,
instructions text not null,
image_url text,
created_at timestamptz default now()
);


create table if not exists public.recipe_ingredients (
recipe_id uuid references public.recipes(id) on delete cascade,
ingredient_id uuid references public.ingredients(id) on delete cascade,
quantity text,
primary key(recipe_id, ingredient_id)
);


create table if not exists public.favorites (
user_id uuid references auth.users(id) on delete cascade,
recipe_id uuid references public.recipes(id) on delete cascade,
created_at timestamptz default now(),
primary key(user_id, recipe_id)
);


create table if not exists public.feedback (
id uuid primary key default gen_random_uuid(),
user_id uuid references auth.users(id) on delete set null,
message text not null,
created_at timestamptz default now()
);


create table if not exists public.event_logs (
id uuid primary key default gen_random_uuid(),
user_id uuid references auth.users(id) on delete set null,
event text not null,
payload jsonb,
created_at timestamptz default now()
);


-- 4.2 RLS
alter table public.detections enable row level security;
alter table public.favorites enable row level security;
alter table public.feedback enable row level security;
alter table public.event_logs enable row level security;


create policy "detections read" on public.detections for select using (true);
create policy "detections insert own or anon" on public.detections for insert with check (auth.uid() = user_id or user_id is null);


create policy "favorites read own" on public.favorites for select using (auth.uid() = user_id);
create policy "favorites ins own" on public.favorites for insert with check (auth.uid() = user_id);
create policy "favorites del own" on public.favorites for delete using (auth.uid() = user_id);


create policy "feedback read own" on public.feedback for select using (auth.uid() = user_id);
create policy "feedback ins own or anon" on public.feedback for insert with check (auth.uid() = user_id or user_id is null);


create policy "events write" on public.event_logs for insert with check (true);