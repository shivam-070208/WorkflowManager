import { Dialog,DialogContent,DialogDescription,DialogTitle,DialogHeader } from "../ui/dialog"
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
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent >
            <DialogHeader>
                {title && <DialogTitle>{title}</DialogTitle>}
                {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}


export default DialogLayout;