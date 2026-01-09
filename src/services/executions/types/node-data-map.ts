
import { NodeType } from "@/generated/prisma/enums";

export type NodeDataMap = {
  [NodeType.HTTPREQUEST]: HttpRequestNodeDataTypes;
  [NodeType.MANUALTRIGGER]: never;

};