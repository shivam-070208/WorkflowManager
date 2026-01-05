import DialogLayout from "@/components/common/dialog-layout"
import type { DialogProps } from "@/types/execution/nodes/props";





const ManualTriggerDialog = ({
    open,
    onOpenChange,
}:Readonly<DialogProps<never>>) => {

    return (
        <DialogLayout title="Manual Trigger" description="Settings of Manual Trigger" open={open} onOpenChange={onOpenChange}>            <p>No settings required for Manual Trigger. It will execute manually by clicking the execute button.</p>        </DialogLayout>
    )
}

export default ManualTriggerDialog;