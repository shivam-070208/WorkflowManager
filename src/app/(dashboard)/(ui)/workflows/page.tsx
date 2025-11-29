import { WorkflowContainer,WorkflowList } from "@/services/workflows/components/Workflows";
import { HydrateClient } from "@/trpc/server";
import React, { Suspense } from "react";
import { prefetchWorkflows } from "@/services/workflows/server/prefetch";
function page() {
  prefetchWorkflows({page:1,limit:10});
  return (
      <WorkflowContainer >
    <HydrateClient>
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-10">
            Loading workflows...
          </div>
        }
      >
        <WorkflowList />
      </Suspense>
    </HydrateClient>
    </WorkflowContainer>
  );
}

export default page;
