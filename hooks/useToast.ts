// hooks/useToast.ts
import { useCallback, useState } from "react";

export function useToast() {
  const [toast, setToast] = useState<string | null>(null);

  const show = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  }, []);

  return { toast, show };
}
