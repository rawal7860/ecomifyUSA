import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export const profileService = {
  // Get the current user's profile
  async getCurrentProfile(): Promise<Profile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    console.log("Get current profile:", { data, error });
    if (error) {
      console.error("Profile fetch error:", error);
      return null;
    }
    return data;
  },

  // Update the current user's profile
  async updateProfile(updates: ProfileUpdate): Promise<Profile> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id)
      .select()
      .single();

    console.log("Update profile:", { data, error });
    if (error) throw error;
    return data;
  },

  // Create or update profile (upsert)
  async upsertProfile(profileData: Partial<Profile>): Promise<Profile> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        ...profileData,
      })
      .select()
      .single();

    console.log("Upsert profile:", { data, error });
    if (error) throw error;
    return data;
  },
};