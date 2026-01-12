"use server";

import { inngest } from "@/inngest/client";
import { Events } from "@/inngest/event-type";


export const triggerWorkflowExecution = async (id: string) => {
    if (!id) throw new Error("Id is required.");
    await inngest.send({
        name:Events.WORKFLOW_EXECUTE,
        data: { id }
    });
    return true;
};