import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRoutingProduct, CreateRoutingProductPayload, deleteRoutingProduct, getRoutingProducts, GetRoutingProductsParams, updateRoutingProduct, UpdateRoutingProductBody, uploadRoutingProductFile } from "../routingProductsApis";


// ─── Query Keys ──────────────────────────────────────────────────────────────

export const PRODUCT_KEYS = {
  all: ["routingProducts"] as const,
  list: (params: GetRoutingProductsParams) => ["routingProducts", params] as const,
};

// ─── Hooks ───────────────────────────────────────────────────────────────────

export const useGetRoutingProducts = (params: GetRoutingProductsParams = {}) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.list(params),
    queryFn: () => getRoutingProducts(params),
  });
};

export const useCreateRoutingProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateRoutingProductPayload) => createRoutingProduct(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
    },
  });
};

export const useUploadRoutingProductFile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) => uploadRoutingProductFile(file),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: PRODUCT_KEYS.all,
            });
        },
    });
};

export const useUpdateRoutingProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: UpdateRoutingProductBody }) =>
      updateRoutingProduct(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
    },
  });
};

export const useDeleteRoutingProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteRoutingProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
    },
  });
};