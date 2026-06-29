import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDupeProduct, CreateDupeProducts, deleteDupeProduct, getDupeProduct, getDupeProductsByExpensiveProduct, GetDupeProductsParams, UpdateDupeProduct, updateDupeProduct } from "../dupeProductApis";
import { PRODUCT_KEYS as EXPENSIVE_KEYS } from "./useExpensiveProducts";

export const PRODUCT_KEYS = {
  all: ["dupeProducts"] as const,
  list: (params: GetDupeProductsParams) => ["dupeProducts", params] as const,
};

export const useGetDupeProducts = (params: GetDupeProductsParams = {}) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.list(params),
    queryFn: () => getDupeProduct(params),
  });
};

export const useGetDupeProductsByExpensiveProduct = (
  expensive_product_id: number,
  params: GetDupeProductsParams = {}
) => {
  return useQuery({
    queryKey: ["dupeProducts", expensive_product_id, params],
    queryFn: () => getDupeProductsByExpensiveProduct(expensive_product_id, params),
  });
}

export const useCreateDupeProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateDupeProducts) => createDupeProduct(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
       queryClient.invalidateQueries({ queryKey: EXPENSIVE_KEYS.all });
    },
  });
};

export const useUpdateDupeProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: UpdateDupeProduct }) =>
      updateDupeProduct(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
      queryClient.invalidateQueries({ queryKey: EXPENSIVE_KEYS.all });
    },
  });
};

export const useDeleteDupeProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteDupeProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
      queryClient.invalidateQueries({ queryKey: EXPENSIVE_KEYS.all });
    },
  });
};