import { Dialog,DialogContent,DialogDescription,DialogTitle,DialogHeader } from "../ui/dialog"
import {Separator} from "../ui/separator";
interface Props {
    children?: React.ReactNode,
    open:boolean,
    onOpenChange:(open:boolean)=>void,
    title?:string,
    description?:string,
}
const DialogLayout = ({
    children,
    open,
    onOpenChange,
    title,
    description,
}:Readonly<Props>) => {
    return (
        <Dialog open={open}  onOpenChange={onOpenChange}>

            <DialogContent className="max-h-full overflow-y-auto ms-0" >
            <DialogHeader>
                {title && <DialogTitle>{title}</DialogTitle>}
                {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
            <Separator />
                {children}
            </DialogContent>
        </Dialog>
    )
}


export default DialogLayout;