import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchInfluencers, grantInfluencerAccess, revokeInfluencerAccess } from "../influencersApis";

// ─── Query Keys ──────────────────────────────────────────────────────────────

const INFLUENCER_KEYS = {
  list: (search?: string) => ["influencers", search] as const,
};

export const useGetInfluencers = (search?: string) => {
  return useQuery({
    queryKey: INFLUENCER_KEYS.list(search),
    queryFn: () => fetchInfluencers(search),
  });
};

export const useGrantInfluencerAccess = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: grantInfluencerAccess,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["influencers"] });
    },
  });
};

export const useRevokeInfluencerAccess = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: revokeInfluencerAccess,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["influencers"] });
    },
  });
};