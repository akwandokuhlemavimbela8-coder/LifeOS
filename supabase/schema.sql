-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles / User State Table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  xp integer default 0,
  level integer default 1,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tasks Table
create table public.tasks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  completed boolean default false,
  xp_value integer default 25,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habits Table
create table public.habits (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  streak integer default 0,
  completed_today boolean default false,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) Rules
alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.habits enable row level security;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Users can manage own tasks" on public.tasks for all using (auth.uid() = user_id);
create policy "Users can manage own habits" on public.habits for all using (auth.uid() = user_id);
