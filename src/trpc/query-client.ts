import {
  QueryClient,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";

let queryClient: QueryClient | null = null;

export function makeQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 30, // 1 minute
        },
        dehydrate: {
          shouldDehydrateQuery: (query) => {
            return (
              defaultShouldDehydrateQuery(query) ||
              query.state.status === "pending"
            );
          },
        },
        mutations: {
          // example: add defaultShouldDehydrateMutation or other mutation settings
          // This is the default, but you can customize as needed
          // shouldDehydrate: defaultShouldDehydrateMutation,
        },
      },
    });
  }
  return queryClient;
}
