import { NodeType } from "@/generated/prisma/enums";
import { Node } from "@xyflow/react";

export const EmptyNode:Node = {
    type:NodeType.Initial,
    id:"0",
    position:{x:0,y:0},
    data:{}

}