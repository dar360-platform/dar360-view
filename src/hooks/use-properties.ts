import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

// Example: Get all properties
export function useProperties() {
  return useQuery({
    queryKey: ['properties'],
    queryFn: () => api.properties.getAll(),
  });
}

// Example: Get single property
export function useProperty(id: string) {
  return useQuery({
    queryKey: ['properties', id],
    queryFn: () => api.properties.getById(id),
    enabled: !!id, // Only run if id exists
  });
}

// Example: Create property mutation
export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.properties.create(data),
    onSuccess: () => {
      // Invalidate and refetch properties list
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

// Example: Update property mutation
export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      api.properties.update(id, data),
    onSuccess: (_, variables) => {
      // Invalidate specific property and properties list
      queryClient.invalidateQueries({ queryKey: ['properties', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

// Example: Delete property mutation
export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.properties.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}
