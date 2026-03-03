import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useSensorData() {
  return useQuery({
    queryKey: [api.sensorData.list.path],
    queryFn: async () => {
      const res = await fetch(api.sensorData.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch sensor data");
      return api.sensorData.list.responses[200].parse(await res.json());
    },
    refetchInterval: 3000, // Poll every 3 seconds for real-time dashboard feel
  });
}
