import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createExpensiveProduct, CreateExpensiveProduct, deleteExpensiveProduct, getExpensiveProduct, GetExpensiveProductsParams, updateExpensiveProduct, UpdateExpensiveProduct, uploadDupeProductBulkFile } from "../expensiveProductApis";

export const PRODUCT_KEYS = {
  all: ["expensiveProducts"] as const,
  list: (params: GetExpensiveProductsParams) => ["expensiveProducts", params] as const,
};

export const useGetExpensiveProducts = (params: GetExpensiveProductsParams = {}) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.list(params),
    queryFn: () => getExpensiveProduct(params),
  });
};

export const useCreateExpensiveProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateExpensiveProduct) => createExpensiveProduct(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
    },
  });
};


export const useUploadDupeProductBulkFile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) => uploadDupeProductBulkFile(file),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: PRODUCT_KEYS.all,
            });
        },
    });
};

export const useUpdateExpensiveProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: UpdateExpensiveProduct }) =>
      updateExpensiveProduct(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
    },
  });
};

export const useDeleteExpensiveProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteExpensiveProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
    },
  });
};