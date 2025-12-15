import DialogLayout from "@/components/common/dialog-layout"
import { useState } from "react"
interface Props{
    open:boolean,
    onOpenChange:(open:boolean)=>void
}
const ManualTriggerDialog = ({
    open,
    onOpenChange,
}:Readonly<Props>) => {


    return (
        <DialogLayout tittle="Manual Trigger" description="Settings of Manual trigger" open={open} onOpenChange={onOpenChange}>
            <p>No Setting Required for Manual Trigger, It will execute  Manualy</p>
        </DialogLayout>
    )
}

export default ManualTriggerDialog;