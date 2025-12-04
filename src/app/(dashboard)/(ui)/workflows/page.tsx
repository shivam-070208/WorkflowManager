import { WorkflowContainer,WorkflowList,WorkflowListHeader } from "@/services/workflows/components/workflows";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import React, { Suspense } from "react";
import { prefetchWorkflows } from "@/services/workflows/server/prefetch";
import ErrorView from "@/components/common/error-view";
import LoaderView from "@/components/common/loading-view";
 function page() {
  
    prefetchWorkflows({page:1,limit:10});
   
  return ( 
      <WorkflowContainer >
      <WorkflowListHeader />  
    <HydrateClient>
      
      <Suspense
       fallback={<LoaderView />}
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
