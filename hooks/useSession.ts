import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


export function useSession() {
const [user, setUser] = useState<Awaited<ReturnType<typeof supabase.auth.getUser>>["data"]["user"] | null>(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
let mounted = true;
supabase.auth.getUser().then(({ data }) => {
if (!mounted) return;
setUser(data.user ?? null);
setLoading(false);
});
const sub = supabase.auth.onAuthStateChange((_e, session) => {
setUser(session?.user ?? null);
});
return () => {
mounted = false;
sub.data.subscription.unsubscribe();
};
}, []);


return { user, loading };
}