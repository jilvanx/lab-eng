"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const successMessages: { [key: string]: string } = {
  "/api/customers": "Cliente cadastrado com sucesso!",
  "/api/works": "Obra cadastrada com sucesso!",
  "/api/ruptures": "Ruptura cadastrada com sucesso!",
};

const useGet = <T>(url: string) => {
  const fetch = (): Promise<T> =>
    axios.get(url).then((response) => {
      return response.data;
    });

  const notEnabled = url.includes("new");

  const { data, error, isLoading } = useQuery<T>({
    queryKey: [url],
    queryFn: fetch,
    enabled: !notEnabled,
  });

  return { data, error, isLoading };
};

const usePost = <T>() => {
  const queryClient = useQueryClient();

  return useMutation<T, Error, { url: string; data: T }>({
    mutationFn: async <T>({
      url,
      data,
    }: {
      url: string;
      data: T;
    }): Promise<T> => {
      const response = await axios.post<T>(url, data);
      return response.data;
    },
    onSuccess: (_data, variables) => {
      const successMessage = successMessages[variables.url];
      if (successMessage) {
        toast.success(successMessage);
      }
      queryClient.invalidateQueries({ queryKey: [variables.url] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};

const usePut = <T>() => {
  return useMutation<T, Error, { url: string; data: T }>({
    mutationFn: async <T>({
      url,
      data,
    }: {
      url: string;
      data: T;
    }): Promise<T> => {
      const response = await axios.put<T>(url, data);
      return response.data;
    },
    onSuccess: (_data, variables) => {
      const successMessage = successMessages[variables.url];
      if (successMessage) {
        toast.success(successMessage);
      }
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};

const useDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ url, id }: { url: string; id: string }) => {
      const response = await axios.delete(`${url}/${id}`);
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [variables.url] });
      toast.success("Item deletado com sucesso!");
    },
  });
};

export { useGet, usePost, usePut, useDelete };
