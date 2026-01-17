import { NodeType } from "@/generated/prisma/enums";
export const TriggerNodeTypes: NodeType[] = [
  NodeType.MANUALTRIGGER,
  NodeType.WEBHOOK,
];
export const WorkflowNodeTypes: NodeType[] = [
  NodeType.GOOGLEFORM,
  NodeType.HTTPREQUEST,
  NodeType.RESEND,
];
