import axiosApiInstance from "./apiAxiosInstance";

export interface SkincareProduct {
  product_id?: number;
  brand: string;
  product_name: string;
  category: number;
  category_name?: string;
  // morning | night | both
  routine_slot: "morning" | "night" | "both";
  price: string;
  priority_score: number;
  suitable_skin_types: string;
  suitable_concerns: string;
  why_it_suits_this_profile: string;
  key_ingredients: string;
  awin_tracking_URL: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PaginatedRoutingProductsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SkincareProduct[];
}

export interface GetRoutingProductsParams {
  page?: number;
  search?: string;
  routine_slot?: string;
}

export interface CreateRoutingProductPayload {
  brand: string;
  product_name: string;
  category: number;
  routine_slot: "morning" | "night" | "both";
  price: string;
  priority_score: number;
  suitable_skin_types: string;
  suitable_concerns: string;
  why_it_suits_this_profile: string;
  key_ingredients: string;
  awin_tracking_URL: string;
}

export type UpdateRoutingProductBody = Partial<CreateRoutingProductPayload>;

export const getRoutingProducts = async (params: GetRoutingProductsParams): Promise<PaginatedRoutingProductsResponse> => {
  const { data } = await axiosApiInstance.get("/dashboard/routine-products/", {
    params: {
      page: params.page,
      search: params.search || undefined,
      routine_slot: params.routine_slot || undefined,
    },
  });
  return data;
};

export const createRoutingProduct = async ( body: CreateRoutingProductPayload ): Promise<SkincareProduct> => {
  const { data } = await axiosApiInstance.post("/dashboard/routine-products/", body );
  return data;
};

export const updateRoutingProduct = async ( id: number, body: UpdateRoutingProductBody): Promise<SkincareProduct> => {
  const { data } = await axiosApiInstance.patch(`/dashboard/routine-products/${id}/`, body);
  return data;
};

export const deleteRoutingProduct = async (id: number): Promise<void> => {
  await axiosApiInstance.delete(`/dashboard/routine-products/${id}/`);
};

