import DialogLayout from "@/components/common/dialog-layout";
import { DialogProps } from "@/types/execution/nodes/props";

const WebHookDialog = ({
open,
onOpenChange
}:Readonly<DialogProps<never>>) => {
    return (
    <DialogLayout open={open} onOpenChange={onOpenChange} description="Configure Github Web Hooks" title="Github Web Hooks" >
        
    </DialogLayout>
    );
}
export default WebHookDialog;