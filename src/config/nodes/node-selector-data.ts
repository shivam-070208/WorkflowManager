import { NodeType } from "@/generated/prisma/enums";
import type { LucideIcon } from "lucide-react";
import { Github, ClipboardList, MousePointerClick, Globe } from "lucide-react";

export type Node = {
  icon: LucideIcon;
  title: string;
  description: string;
  type: NodeType;
};

export const NodesOptions: Node[] = [
  {
    icon: Github,
    title: "Github Hooks",
    description: "Trigger workflows from Github events.",
    type: NodeType.GithubHooks,
  },
  {
    icon: ClipboardList,
    title: "Google Form",
    description: "Start workflow from Google Form submissions.",
    type: NodeType.GoogleForm,
  },
  {
    icon: MousePointerClick,
    title: "Manual Trigger",
    description: "Manually trigger your workflow.",
    type: NodeType.ManualTrigger,
  },
  {
    icon: Globe,
    title: "Webhook",
    description: "Trigger workflow from an incoming webhook.",
    type: NodeType.Webhook,
  },
];