import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
} from "@/components/react-flow/base-node";
import NodeSelector from "@/services/editor/components/node-selector";
import { Plus } from "lucide-react";
import { useState } from "react";

const PlaceholderNode: React.FC = () => {
    const [isOpen, setOpen] = useState(false);
  return (
    <NodeSelector isOpen={isOpen} setOpen={setOpen}>
    <BaseNode className="flex h-auto w-auto cursor-pointer items-center justify-center border-2 border-foreground/60 border-dashed px-10 py-3 hover:ring-0">
      <BaseNodeContent>
        <Plus className="mx-auto my-2 text-gray-400" />
      </BaseNodeContent>
    </BaseNode>
    </NodeSelector>
  );
};

export default PlaceholderNode;
