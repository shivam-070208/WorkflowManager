import DialogLayout from "@/components/common/dialog-layout";
import { DialogProps } from "@/types/execution/nodes/props";

const GithubHooksDialog = ({
open,
onOpenChange
}:Readonly<DialogProps>) =>{
    <DialogLayout open={open} onOpenChange={onOpenChange} description="Configure Github Web Hooks" tittle="Github Web Hooks" >
        
    </DialogLayout>
}

export default GithubHooksDialog;