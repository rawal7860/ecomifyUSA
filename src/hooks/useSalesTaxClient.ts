import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSalesTaxSupabase, type SalesTaxClient } from "@/lib/salestax";

export function useSalesTaxClient() {
  const router = useRouter();
  const [client, setClient] = useState<SalesTaxClient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const supabase = getSalesTaxSupabase();
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.replace("/salestax/portal/login");
          return;
        }
        const { data, error: queryError } = await supabase.from("salestax_clients").select("*").eq("user_id", session.user.id).maybeSingle();
        if (queryError) throw queryError;
        if (!data) throw new Error("Your sales tax profile could not be found. Please contact support.");
        if (active) setClient(data as SalesTaxClient);
      } catch (loadError) {
        if (active) setError(loadError instanceof Error ? loadError.message : "Unable to load your account.");
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => { active = false; };
  }, [router]);

  return { client, loading, error };
}
