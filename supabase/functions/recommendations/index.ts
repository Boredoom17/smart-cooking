// @ts-nocheck
/// <reference lib="dom" />
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";


const corsHeaders = {
"Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};


function json(body: unknown, status = 200) {
return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...corsHeaders } });
}


const DEMO = {
potato: [
{ title: "Masala Aloo", ingredients: ["potato","oil","salt","turmeric","cumin","chili"], steps: ["Parboil","Temper","Crisp"] },
{ title: "Aloo Paratha", ingredients: ["potato","atta","salt","spices","oil"], steps: ["Mash","Stuff","Pan-fry"] },
],
};


serve(async (req: Request) => {
if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
try {
if (req.method !== "POST") return json({ error: "Use POST" }, 405);
const { label, top_k = 3 } = await req.json();
if (!label || typeof label !== "string") return json({ error: "label required (string)" }, 400);
const arr = (DEMO as any)[label.toLowerCase()] || [];
return json({ label, recipes: arr.slice(0, Math.min(10, Number(top_k) || 3)) }, 200);
} catch (e) { return json({ error: String(e) }, 400); }
});