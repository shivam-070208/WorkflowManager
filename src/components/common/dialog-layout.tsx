import { Dialog,DialogContent,DialogDescription,DialogTitle,DialogHeader } from "../ui/dialog"
interface Props {
    children?: React.ReactNode,
    open:boolean,
    onOpenChange:(open:boolean)=>void,
    tittle?:string,
    description?:string,
}
const DialogLayout = ({
    children,
    open,
    onOpenChange,
    tittle,
    description,
}:Readonly<Props>) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
            <DialogHeader>
                {tittle && <DialogTitle>{tittle}</DialogTitle>}
                {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}


export default DialogLayout;