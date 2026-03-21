import { AuthContext } from "@/hooks/use-auth-context";
import { supabase } from "@/lib/supabase";
import { PropsWithChildren, useEffect, useState } from "react";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [claims, setClaims] = useState<
    Record<string, any> | undefined | null
  >();
  const [profile, setProfile] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Fetch the claims once, and subscribe to auth state changes
  useEffect(() => {
    const fetchClaims = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.auth.getClaims();
      if (error) {
        console.error("Error fetching claims:", error);
      }
      setClaims(data?.claims ?? null);
      setIsLoading(false);
    };
    fetchClaims();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setClaims(null);
      } else {
        setClaims(session.user);
      }
    });
    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  // Fetch the profile when the claims change
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      if (claims) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", claims.sub)
          .single();
        setProfile(data);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    };
    fetchProfile();
  }, [claims]);

  return (
    <AuthContext.Provider
      value={{
        claims,
        isLoading,
        profile,
        isLoggedIn: claims != null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
