import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosApiInstance from "./apiAxiosInstance";


export interface UserResult {
  id: number;
  email: string;
  skin_type: string[] | null;
  analysis_monthly: string;
  subscription_plan: string;
  Influencer: string;
  created_at: string;
  is_active: boolean;
}

export interface UsersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: UserResult[];
}

export interface GetUsersParams {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
}


export const USER_KEYS = {
  list: (params: GetUsersParams) => ["userData", params] as const,
};


export const useGetUsers = (params: GetUsersParams = {}) => {
  return useQuery({
    queryKey: USER_KEYS.list(params),
    queryFn: async (): Promise<UsersResponse> => {
      const { data } = await axiosApiInstance.get("/dashboard/user-management/", {
        params: {
          page: params.page,
          page_size: params.page_size,
          search: params.search || undefined,  // don't send empty string
          ordering: params.ordering,
        },
      });
      return data;
    },
  });
};


export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await axiosApiInstance.delete(`/dashboard/user-management/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });
};