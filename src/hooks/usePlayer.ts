import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./useAuth";

export type Player = {
  id: string;
  first_name: string;
  last_name: string;
  name: string;
};

export function usePlayer() {
  const { session } = useAuth();
  const userId = session?.user.id;

  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

   async function load() {
  try {
    const { data, error } = await supabase
      .from("players")
      .select("id, first_name, last_name, name")
      .eq("profile_id", userId)
      .maybeSingle();

    if (cancelled) return;

    if (error) {
      setError(error.message);
    } else {
      setPlayer(data);
    }
  } catch {
    if (!cancelled) setError("Kunde inte hämta spelardata");
  } finally {
    if (!cancelled) setLoading(false);
  }
}

    load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { player, loading, error, setPlayer };
}