import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SEED_EVIDENCE, SEED_PROFILE } from "./seed";
import { buildRecommendations, computeTrustProfile } from "./scoring";
import type { Evidence, UserProfile } from "./types";

const STORAGE_KEY = "trustpulse-state-v1";

export function isProfileComplete(p: UserProfile): boolean {
  return !!(
    p.fullName.trim() &&
    p.occupation.trim() &&
    /^\d{1,2}(\.\d)?$/.test(p.yearsInBusiness.trim()) &&
    p.location.trim()
  );
}

interface StoreValue {
  hydrated: boolean;
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  evidence: Evidence[];
  addEvidence: (e: Evidence) => void;
  removeEvidence: (id: string) => void;
  analyzed: boolean;
  setAnalyzed: (v: boolean) => void;
  reset: () => void;
  trust: ReturnType<typeof computeTrustProfile>;
  recommendations: ReturnType<typeof buildRecommendations>;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile>(SEED_PROFILE);
  const [evidence, setEvidence] = useState<Evidence[]>(SEED_EVIDENCE);
  const [analyzed, setAnalyzedState] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          profile?: UserProfile;
          evidence?: Evidence[];
          analyzed?: boolean;
        };
        if (parsed.profile) setProfileState(parsed.profile);
        if (Array.isArray(parsed.evidence)) setEvidence(parsed.evidence);
        if (typeof parsed.analyzed === "boolean") setAnalyzedState(parsed.analyzed);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile, evidence, analyzed }));
    } catch {
      /* ignore quota errors */
    }
  }, [profile, evidence, analyzed, hydrated]);

  const setProfile = useCallback((p: UserProfile) => setProfileState(p), []);
  const addEvidence = useCallback((e: Evidence) => setEvidence((prev) => [e, ...prev]), []);
  const removeEvidence = useCallback(
    (id: string) => setEvidence((prev) => prev.filter((e) => e.id !== id)),
    [],
  );
  const setAnalyzed = useCallback((v: boolean) => setAnalyzedState(v), []);
  const reset = useCallback(() => {
    setProfileState(SEED_PROFILE);
    setEvidence(SEED_EVIDENCE);
    setAnalyzedState(false);
  }, []);

  const trust = useMemo(() => computeTrustProfile(evidence), [evidence]);
  const recommendations = useMemo(() => buildRecommendations(trust, evidence), [trust, evidence]);

  const value = useMemo(
    () => ({
      hydrated,
      profile,
      setProfile,
      evidence,
      addEvidence,
      removeEvidence,
      analyzed,
      setAnalyzed,
      reset,
      trust,
      recommendations,
    }),
    [hydrated, profile, setProfile, evidence, addEvidence, removeEvidence, analyzed, setAnalyzed, reset, trust, recommendations],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
