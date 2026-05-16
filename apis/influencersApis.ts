import axiosApiInstance from "./apiAxiosInstance";


export interface Influencer {
  id: number;
  email: string;
  note: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GrantInfluencerBody {
  email: string;
  note: string;
  is_active: boolean;
}

// ─── API Functions ───────────────────────────────────────────────────────────

export const fetchInfluencers = async (search?: string): Promise<Influencer[]> => {
  const { data } = await axiosApiInstance.get("/dashboard/influencers/", {
    params: { search: search || undefined },
  });
  return data;
};

export const grantInfluencerAccess = async (body: GrantInfluencerBody): Promise<Influencer> => {
  const { data } = await axiosApiInstance.post("/dashboard/influencers/", body);
  return data;
};

export const revokeInfluencerAccess = async (id: number): Promise<void> => {
  await axiosApiInstance.delete(`/dashboard/influencers/${id}/`);
};