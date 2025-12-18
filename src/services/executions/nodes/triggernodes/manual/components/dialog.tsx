import DialogLayout from "@/components/common/dialog-layout"
import type { DialogProps } from "@/types/execution/nodes/props";





const ManualTriggerDialog = ({
    open,
    onOpenChange,
}:Readonly<DialogProps>) => {

    return (
        <DialogLayout tittle="Manual Trigger" description="Settings of Manual trigger" open={open} onOpenChange={onOpenChange}>
            <p>No Setting Required for Manual Trigger, It will execute  Manualy by clicking execute</p>
        </DialogLayout>
    )
}

export default ManualTriggerDialog;