// @ts-nocheck
/// <reference lib="dom" />
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";


const corsHeaders = {
"Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};


function json(body: unknown, status = 200) {
return new Response(JSON.stringify(body), {
status,
headers: { "Content-Type": "application/json", ...corsHeaders },
});
}


serve(async (req: Request) => {
if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
try {
if (req.method !== "POST") return json({ error: "Use POST" }, 405);
const { image_url } = await req.json();
if (!image_url || typeof image_url !== "string") return json({ error: "image_url required (string)" }, 400);
const label = "potato"; const confidence = 0.91; // demo stub
return json({ image_url, label, confidence }, 200);
} catch (e) { return json({ error: String(e) }, 400); }
});