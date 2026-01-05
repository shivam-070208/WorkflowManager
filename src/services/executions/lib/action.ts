"use server";

import { inngest } from "@/inngest/client";


export const triggerWorkflowExecution = async (id: string) => {
    if (!id) throw new Error("Id is required.");
    await inngest.send({
        name: "workflow/execute",
        data: { id }
    });
    return true;
};