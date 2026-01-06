import { inngest } from "@/inngest/client";
import type { GetStepTools } from "inngest";
type StepTool = GetStepTools<typeof inngest>
export type NodeExecutor<T> = (args: {
    data: T;
    context: Record<string, unknown>;
    step: StepTool;
}) => Promise<Record<string,unknown>>;