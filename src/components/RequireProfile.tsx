import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useStore, isProfileComplete } from "@/lib/store";

export const GATE_WARNING_KEY = "trustpulse-gate-warning";

/**
 * Route guard: blocks access to inner pages until the identity profile
 * is complete. Redirects to "/" and flags a warning to show there.
 */
export function RequireProfile({ children }: { children: ReactNode }) {
  const { profile, hydrated } = useStore();
  const navigate = useNavigate();
  const complete = isProfileComplete(profile);

  useEffect(() => {
    if (!hydrated || complete) return;
    try {
      window.sessionStorage.setItem(GATE_WARNING_KEY, "1");
    } catch {
      /* ignore */
    }
    navigate({ to: "/" });
  }, [hydrated, complete, navigate]);

  if (!hydrated || !complete) return null;
  return <>{children}</>;
}
