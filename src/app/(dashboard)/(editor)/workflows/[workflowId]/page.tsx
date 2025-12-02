import React from "react";
import EditorHeader from "@/services/editor/components/editor-header";
import { prefetchWorkflowById } from "@/services/workflows/server/prefetch";
interface Props {
    params: Promise< {
        workflowId: string
    }>
}

const Page = async ({ params }: Props) => {
    const { workflowId } = await params;
    prefetchWorkflowById({id:workflowId});
    return (
        <div className="flex-1 flex flex-col">
            <EditorHeader workflowId={workflowId} />
            </div>
    )
}

export const dynamicParams = false;
export default Page
