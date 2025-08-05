import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";

export function useUserDisplayName() {
  const { user, getUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDisplayName = async () => {
      if (!user) {
        setDisplayName("");
        setLoading(false);
        return;
      }

      try {
        const userProfile = await getUserProfile();
        
        if (userProfile?.firstName) {
          setDisplayName(userProfile.firstName);
        } else {
          // Fallback to email prefix if no first name
          setDisplayName(user.email?.split("@")[0] || "User");
        }
      } catch (error) {
        console.warn("Error loading user display name:", error);
        setDisplayName(user.email?.split("@")[0] || "User");
      } finally {
        setLoading(false);
      }
    };

    loadDisplayName();
  }, [user, getUserProfile]);

  return { displayName, loading };
}
