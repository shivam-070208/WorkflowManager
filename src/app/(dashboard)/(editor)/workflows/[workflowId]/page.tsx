import React, { Suspense } from "react";
import { prefetchWorkflowById } from "@/services/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import LoaderView from "@/components/common/loading-view";
import { ErrorBoundary } from "react-error-boundary";
import Editor from "@/services/editor/components/editor";
import ErrorView from "@/components/common/error-view";
interface Props {
  params: Promise<{
    workflowId: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { workflowId } = await params;
  prefetchWorkflowById({ id: workflowId });
  return (
    <div className="flex flex-1 w-full flex-col">
      <HydrateClient>
        <ErrorBoundary fallbackRender={ErrorView}>
          <Suspense fallback={<LoaderView />}>
            <Editor workflowId={workflowId} />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </div>
  );
};

export const dynamicParams = false;
export default Page;
