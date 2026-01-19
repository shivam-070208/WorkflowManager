import PlaceholderNode from "@/components/react-flow/placeholder-node";
import { NodeType } from "@/generated/prisma/enums";
import {
  HttpRequestNode,
  ManualTriggerNode,
  WebHookNode,
  ResendNode,
} from "@/services/executions/nodes";

export const NodesTypes: Partial<Record<NodeType, React.FC>> = {
  [NodeType.INITIAL]: PlaceholderNode,
  [NodeType.MANUALTRIGGER]: ManualTriggerNode,
  [NodeType.WEBHOOK]: WebHookNode,
  [NodeType.HTTPREQUEST]: HttpRequestNode,
  [NodeType.RESEND]: ResendNode,
};
