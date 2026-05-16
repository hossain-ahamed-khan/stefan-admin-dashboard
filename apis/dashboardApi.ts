import axiosApiInstance from "./apiAxiosInstance";

// Types
export interface OverviewData {
  total_users: number;
  active_subscriptions: number;
  analysis_this_month: number;
  influencer_accounts: number;
}

export interface UserInsightsData {
  labels: string[];
  values: number[];
}

export interface DashboardUser {
  id: number;
  plan: string;
  email: string;
  created_at: string;
  status: string;
}

export interface UsersData {
  count: number;
  next: string | null;
  previous: string | null;
  results: DashboardUser[];
}

// API calls
export const getDashboardOverview = async (): Promise<OverviewData> => {
  const { data } = await axiosApiInstance.get("/dashboard/overview/");
  return data.data; // unwrap the `data` key from { success, data }
};

export const getUserInsights = async (): Promise<UserInsightsData> => {
  const { data } = await axiosApiInstance.get("/dashboard/user-insights/");
  return data;
};

export const getDashboardUsers = async (): Promise<UsersData> => {
  const { data } = await axiosApiInstance.get("/dashboard/users/");
  return data;
};