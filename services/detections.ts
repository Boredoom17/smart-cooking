import { supabase } from "@/lib/supabase";
import { callEdge } from "@/lib/supabase";
import { Detection } from "@/lib/types";


export async function inferAndInsert(image_url: string, user_id: string | null) {
const infer = await callEdge<{ image_url: string }, { label: string; confidence: number }>("infer", { image_url });
const { data, error } = await supabase
.from("detections")
.insert({ image_url, label: infer.label, confidence: infer.confidence, user_id })
.select("*")
.single();
if (error) throw error;
return data as Detection;
}


export async function listDetections(limit = 25) {
const { data, error } = await supabase
.from("detections")
.select("*")
.order("created_at", { ascending: false })
.limit(limit);
if (error) throw error;
return (data || []) as Detection[];
}