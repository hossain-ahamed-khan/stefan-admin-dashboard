import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category, createCategory, CreateCategoryPayload, CreateCategoryResponse, getCategory, getCategoryById } from "../categoriesApis";


// Get all categories
export const useCategory = () => {
    return useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: getCategory,
    });
};


// Get single category by id
export const useCategoryById = (id: number) => {
    return useQuery<Category>({
        queryKey: ["category", id],
        queryFn: () => getCategoryById(id),
        enabled: !!id,
    });
};

// Create category
export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation<
        CreateCategoryResponse,
        Error,
        CreateCategoryPayload
    >({
        mutationFn: createCategory,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },
    });
};