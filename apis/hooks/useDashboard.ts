import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview, getUserInsights, getDashboardUsers } from "../dashboardApi";

export const DASHBOARD_KEYS = {
  overview: ["dashboard", "overview"] as const,
  userInsights: ["dashboard", "user-insights"] as const,
  users: ["dashboard", "users"] as const,
};

export const useDashboardOverview = () =>
  useQuery({
    queryKey: DASHBOARD_KEYS.overview,
    queryFn: getDashboardOverview,
  });

export const useUserInsights = () =>
  useQuery({
    queryKey: DASHBOARD_KEYS.userInsights,
    queryFn: getUserInsights,
  });

export const useDashboardUsers = () =>
  useQuery({
    queryKey: DASHBOARD_KEYS.users,
    queryFn: getDashboardUsers,
  });