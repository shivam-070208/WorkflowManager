import { WorkflowContainer,WorkflowList,WorkflowListHeader } from "@/services/workflows/components/Workflows";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import React, { Suspense } from "react";
import { prefetchWorkflows } from "@/services/workflows/server/prefetch";
import ErrorView from "@/components/common/error-view";
 function page() {
   try {
    prefetchWorkflows({page:1,limit:10});
   } catch (error) {
    console.log("here is the error")
   }
  return ( 
      <WorkflowContainer >
      <WorkflowListHeader />  
    <HydrateClient>
      
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-10">
            Loading workflows...
          </div>
        }
      >
            <ErrorBoundary fallbackRender={ErrorView}>
        <WorkflowList />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
    </WorkflowContainer>
  );
}

export default page;
