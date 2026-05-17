import axiosApiInstance from "./apiAxiosInstance";

export interface ExpensiveProduct {
    id: number;
    brand: string;
    product_name: string;
    price: string;
    search_terms: string;
    key_active_ingredients: string;
    dupe_products: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface ExpensiveProductResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: ExpensiveProduct[];
}

export interface GetExpensiveProductsParams {
    page?: number;
    page_size?: number;
    search?: string;
}

export interface CreateExpensiveProduct {
    brand: string;
    product_name: string;
    price: string;
    search_terms: string;
    key_active_ingredients: string;
    is_active: boolean;
}

export interface CreateExpensiveProductResponse {
    status: string;
    message: string;
    data: {
        brand: string;
        product_name: string;
        price: string;
        search_terms: string;
        key_active_ingredients: string;
        dupe_products: number;
        is_active: boolean;
        created_at: string;
        updated_at: string;
    };
}

export type UpdateExpensiveProduct = Partial<CreateExpensiveProduct>;


export const getExpensiveProduct = async (params: GetExpensiveProductsParams): Promise<ExpensiveProductResponse> => {
    const { data } = await axiosApiInstance.get("/dashboard/expensive-products/", {
        params: {
            page: params.page,
            page_size: params.page_size,
            search: params.search || undefined,
        },
    });
    return data;
};

export const createExpensiveProduct = async (body: CreateExpensiveProduct): Promise<CreateExpensiveProductResponse> => {
    const { data } = await axiosApiInstance.post("/dashboard/expensive-products/", body);
    return data; 
};

export const updateExpensiveProduct = async (id: number, body: UpdateExpensiveProduct) => {
    const { data } = await axiosApiInstance.patch(`/dashboard/expensive-products/${id}/`, body);
    return data;
};

export const deleteExpensiveProduct = async (id: number) => {
    const { data } = await axiosApiInstance.delete(`/dashboard/expensive-products/${id}/`);
    return data;
};

