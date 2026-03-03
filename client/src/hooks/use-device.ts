import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

export function useDeviceStatus() {
  return useQuery({
    queryKey: [api.deviceStatus.get.path],
    queryFn: async () => {
      const res = await fetch(api.deviceStatus.get.path, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch device status");
      return api.deviceStatus.get.responses[200].parse(await res.json());
    },
    refetchInterval: 3000,
  });
}

export function useUpdateDeviceStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (updates: z.infer<typeof api.deviceStatus.update.input>) => {
      const res = await fetch(api.deviceStatus.update.path, {
        method: api.deviceStatus.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.deviceStatus.update.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to update device status");
      }
      return api.deviceStatus.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.deviceStatus.get.path] });
    },
    onError: (err) => {
      toast({
        title: "Lỗi Hệ Thống",
        description: `Không thể cập nhật: ${err.message}`,
        variant: "destructive",
      });
    }
  });
}
