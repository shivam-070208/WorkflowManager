import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

export const useSubscription = () => {
  return useQuery({
    queryKey: ["membership"],
    queryFn: async () => {
      const { data } = await authClient.customer.state();
      return data;
    },
  });
};

export const useListActivationSubscription = () => {
  const { data: customerState, isLoading, ...rest } = useSubscription();
  if (
    customerState?.activeSubscriptions &&
    customerState?.activeSubscriptions.length > 0
  )
    return {
      isActive: true,
      currentSubscription: customerState?.activeSubscriptions[0],
      ...rest,
      isLoading:isLoading
    };
  return {
    isActive: false,
    ...rest,
    isLoading:isLoading
  };
};
