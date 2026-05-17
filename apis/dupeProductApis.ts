import axiosApiInstance from "./apiAxiosInstance";

export interface ExpensiveProduct {
    id: number;
    brand: string;
    product_name: string;
    price: string;
}

export interface DupeProduct {
    id: number;
    expensive_product: ExpensiveProduct;
    brand: string;
    product_name: string;
    price: string;
    saving_percent: number;
    retailer: string;
    make_verified: boolean;
    why_it_works: string;
    awin_tracking_URL: string;
    is_active: boolean;
    created_by: string;
    created_at: string;
    updated_at: string;
}

export interface DupeProductResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: DupeProduct[];
}

export interface GetDupeProductsParams {
    page?: number;
    page_size?: number;
    ordering?: string;
    search?: string;
}

export interface CreateDupeProducts {
    expensive_product: number;
    brand: string;
    product_name: string;
    price: string;
    retailer: string;
    make_verified: boolean;
    why_it_works: string;
    awin_tracking_URL: string;
}

export interface CreateDupeProductsResponse {
  id: number;
  expensive_product: ExpensiveProduct;
  brand: string;
  product_name: string;
  price: string;
  saving_percent: number;
  retailer: string;
  make_verified: boolean;
  why_it_works: string;
  awin_tracking_URL: string;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export type UpdateDupeProduct = Partial<CreateDupeProducts>;

export const getDupeProduct = async (params : GetDupeProductsParams): Promise<DupeProductResponse> => {
    const { data } = await axiosApiInstance.get("/dashboard/dupe-products/", {
        params: {
            page: params.page,
            page_size: params.page_size,
            ordering: params.ordering,
            search: params.search || undefined,
        },
    });
    return data;
};

export const createDupeProduct = async (body: CreateDupeProducts): Promise<CreateDupeProductsResponse> => {
    const { data } = await axiosApiInstance.post("/dashboard/dupe-products/", body);
    return data; 
};

export const updateDupeProduct = async (id: number, body: UpdateDupeProduct) => {
    const { data } = await axiosApiInstance.patch(`/dashboard/dupe-products/${id}/`, body);
    return data;
};

export const deleteDupeProduct = async (id: number) => {
    const { data } = await axiosApiInstance.delete(`/dashboard/dupe-products/${id}/`);
    return data;
};