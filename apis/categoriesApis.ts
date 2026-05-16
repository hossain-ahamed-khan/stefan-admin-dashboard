import axiosApiInstance from "./apiAxiosInstance";

export interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

// Request Payload
export interface CreateCategoryPayload {
    name: string;
}

// Response Type
export interface CreateCategoryResponse {
    status: string;
    message: string;
    data: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
    };
}

export const getCategory = async (): Promise<Category[]> => {
    const { data } = await axiosApiInstance.get("/dashboard/categories/");
    return data;
};

export const getCategoryById = async (id: number): Promise<Category> => {
    const { data } = await axiosApiInstance.get(
        `/dashboard/categories/${id}/`
    );
    return data;
};

export const createCategory = async (
    body: CreateCategoryPayload
): Promise<CreateCategoryResponse> => {
    const { data } = await axiosApiInstance.post(
        "/dashboard/categories/",
        body
    );

    return data;
};