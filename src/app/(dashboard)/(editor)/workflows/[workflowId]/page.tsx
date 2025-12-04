import React, { Suspense } from "react";
import EditorHeader from "@/services/editor/components/editor-header";
import { prefetchWorkflowById } from "@/services/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import LoaderView from "@/components/common/loading-view";
import Editor from "@/services/editor/components/editor";
interface Props {
    params: Promise<{
        workflowId: string
    }>
}

const Page = async ({ params }: Props) => {
    const { workflowId } = await params;
    prefetchWorkflowById({ id: workflowId });
    return (
        <div className="flex-1 flex flex-col">
            <HydrateClient>
                <Suspense fallback={<LoaderView />}>
                    <EditorHeader workflowId={workflowId} />
                    <Editor />
                </Suspense>
            </HydrateClient>
        </div>
    )
}

export const dynamicParams = false;
export default Page
