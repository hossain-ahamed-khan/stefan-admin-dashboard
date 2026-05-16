import axiosApiInstance from "./apiAxiosInstance";

export type VerifiedStatus = "Verified" | "Pending";
export type Source = "User OCR" | "Manual Admin" | "API";

export interface Products {
  id: number;
  barcode: string;
  product_name: string;
  brand: string;
  ingredient_list: string[] | string;
  source: Source;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginatedProductsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Products[];
}

export interface GetProductsParams {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
}

export interface CreateProductBody {
  barcode: string;
  product_name: string;
  brand: string;
  ingredient_list: string[];
  source: string;
  is_verified: boolean;
  is_active: boolean;
}

export type UpdateProductBody = Partial<CreateProductBody>;

// ─── API Functions ───────────────────────────────────────────────────────────

export const getProducts = async (params: GetProductsParams): Promise<PaginatedProductsResponse> => {
  const { data } = await axiosApiInstance.get("/dashboard/internal-products/", {
    params: {
      page: params.page,
      page_size: params.page_size,
      search: params.search || undefined,
      ordering: params.ordering || undefined,
    },
  });
  return data;
};

export const createProduct = async ( body: CreateProductBody ): Promise<Products> => {
  const { data } = await axiosApiInstance.post("/dashboard/internal-products/", body );
  return data;
};

export const updateProduct = async ( id: number, body: UpdateProductBody): Promise<Products> => {
  const { data } = await axiosApiInstance.patch(`/dashboard/internal-products/${id}/`, body);
  return data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axiosApiInstance.delete(`/dashboard/internal-products/${id}/`);
};

