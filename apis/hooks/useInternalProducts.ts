import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, CreateProductBody, deleteProduct, getProducts, GetProductsParams, updateProduct, UpdateProductBody } from "../internalProductApis";

// ─── Query Keys ──────────────────────────────────────────────────────────────

export const PRODUCT_KEYS = {
  all: ["internalProducts"] as const,
  list: (params: GetProductsParams) => ["internalProducts", params] as const,
};

// ─── Hooks ───────────────────────────────────────────────────────────────────

export const useGetProducts = (params: GetProductsParams = {}) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.list(params),
    queryFn: () => getProducts(params),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateProductBody) => createProduct(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: UpdateProductBody }) =>
      updateProduct(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
    },
  });
};