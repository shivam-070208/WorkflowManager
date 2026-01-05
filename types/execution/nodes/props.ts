export interface DialogProps<T> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: T;
}