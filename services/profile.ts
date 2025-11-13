import { supabase } from "@/lib/supabase";
import { Profile } from "@/lib/types";


export async function getProfile(userId: string) {
const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
if (error) throw error;
return (data || null) as Profile | null;
}


export async function upsertProfile(userId: string, patch: Partial<Profile>) {
const { data, error } = await supabase
.from("profiles")
.upsert({ id: userId, ...patch, updated_at: new Date().toISOString() })
.select("*")
.single();
if (error) throw error;
return data as Profile;
}