import { useEffect, useState } from "react";

type ContentData<T> = {
  data: T;
  loading: boolean;
  error: string | null;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export function useContent<T>(key: string, fallback: T): ContentData<T> {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE}/api/content/${encodeURIComponent(key)}`);
        if (!res.ok) {
          // If content not yet in DB, keep fallback silently
          setLoading(false);
          return;
        }
        const json = await res.json();
        if (!cancelled && json && json.data != null) {
          setData(json.data as T);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Failed to load content");
          console.error("useContent error", err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [key]);

  return { data, loading, error };
}

