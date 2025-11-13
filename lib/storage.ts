// lib/storage.ts
import * as FileSystem from "expo-file-system";
import { supabase, DEFAULT_BUCKET } from "@/lib/supabase";
import { decode as atob } from "base-64";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function todayPath() {
  const d = new Date();
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}`;
}

/**
 * Upload a local image (fileUri) to Supabase Storage.
 * Returns { path, publicUrl } (bucket is public in your demo setup).
 */
export async function uploadImageFromUri(
  fileUri: string,
  userId: string = "anon",
  bucket: string = DEFAULT_BUCKET
) {
  // Read file as base64 string
  const base64 = await FileSystem.readAsStringAsync(fileUri, {
    encoding: "base64", // ✅ correct literal
  });

  // Decode base64 → bytes
const bytes = Uint8Array.from(atob(base64), (c: string) => c.charCodeAt(0));

  // Simple unique-ish filename
  const filename = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.jpg`;

  const path = `${userId}/${todayPath()}/${filename}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, bytes, {
      contentType: "image/jpeg",
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return { path, publicUrl: data.publicUrl };
}
