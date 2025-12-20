import DialogLayout from "@/components/common/dialog-layout";
import { DialogProps } from "@/types/execution/nodes/props";

const WebHookDialog = ({
open,
onOpenChange
}:Readonly<DialogProps>) => {
    return (
    <DialogLayout open={open} onOpenChange={onOpenChange} description="Configure Github Web Hooks" tittle="Github Web Hooks" >
        
    </DialogLayout>
    );
}
export default WebHookDialog;