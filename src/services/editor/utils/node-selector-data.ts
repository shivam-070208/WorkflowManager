import { NodeType } from "@/generated/prisma/enums";
import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  MousePointerClick,
  Globe,
  Webhook,
  RefreshCw as ResendIcon,
  Brain,
} from "lucide-react";

export type Node = {
  icon: LucideIcon;
  title: string;
  description: string;
  type: NodeType;
};

export const NodesOptions: Node[] = [
  {
    icon: Webhook,
    title: "Webhook",
    description: "Trigger workflows from webhook events.",
    type: NodeType.WEBHOOK,
  },
  {
    icon: ClipboardList,
    title: "Google Form",
    description: "Start workflows from Google Form submissions.",
    type: NodeType.GOOGLEFORM,
  },
  {
    icon: MousePointerClick,
    title: "Manual Trigger",
    description: "Manually trigger your workflow.",
    type: NodeType.MANUALTRIGGER,
  },
  {
    icon: Globe,
    title: "HTTP Request",
    description: "Make an HTTP request to perform an action.",
    type: NodeType.HTTPREQUEST,
  },
  {
    icon: ResendIcon,
    title: "Resend",
    description: "Send a gmail using resend as a services.",
    type: NodeType.RESEND,
  },
  {
    icon: Brain,
    title: "AI Agent",
    description:
      "Use AI providers (ChatGPT, Google AI, Claude) for intelligent automation.",
    type: NodeType.AIAGENTS,
  },
];
