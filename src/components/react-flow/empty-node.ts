import { NodeType } from "@/generated/prisma/enums";
import { Node } from "@xyflow/react";

export type NodePosition = {
    x:number 
    y:number
}

interface ConstructorProps {
    _id?:string
    _position?:NodePosition
}
export class EmptyNode implements Node {
    type: NodeType = NodeType.INITIAL;
    id: string;
    position:NodePosition;
    data: Record<string, unknown>;

    constructor({_id ,_position}:ConstructorProps) {
        this.id = _id || "0";
        this.position = _position || { x: 0, y: 0 };
        this.data = {};
    }
}