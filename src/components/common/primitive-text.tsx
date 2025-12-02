import { cn } from "@/lib/utils";
import React, { useState, useRef, useEffect } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Check, X, Pencil } from "lucide-react";

interface PrimitiveTextProps extends React.ComponentProps<"div"> {
  text: string;
  editable?: boolean; // by default, true
  onConfirm?: (updatedText: string) => void;
  onCancel?: () => void;
  renderEditButton?: boolean;
  editButtonClassName?: string;
  inputClassName?: string;
}

const PrimitiveText: React.FC<PrimitiveTextProps> = ({
  text,
  className,
  editable = true,
  onConfirm,
  onCancel,
  renderEditButton = true,
  editButtonClassName,
  inputClassName,
  ...props
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(text);
  const [internalText, setInternalText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInternalText(text);
    setValue(text);
  }, [text]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const handleConfirm = () => {
    setEditing(false);
    setInternalText(value);
    if (onConfirm) {
      onConfirm(value);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setValue(internalText);
    if (onCancel) onCancel();
  };

  return (
    <div className={cn("relative flex items-center group", className)} {...props}>
      {!editing ? (
        <>
          <span className="wrap-break-word">{internalText}</span>
          {editable && renderEditButton && (
            <PrimitiveTextEdit
              aria-label="text-edit-button"
              className={cn(
                "ml-2 opacity-0 group-hover:opacity-100 transition-opacity",
                editButtonClassName
              )}
              onClick={() => setEditing(true)}
            >
              <Pencil className="w-4 h-4" />
            </PrimitiveTextEdit>
          )}
        </>
      ) : (
        <>
          <input
            ref={inputRef}
            className={cn(
              "border rounded px-2 py-1 text-sm mr-2 outline-none focus:ring-1 focus:ring-primary",
              inputClassName
            )}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") handleConfirm();
              if (e.key === "Escape") handleCancel();
            }}
          />
          <button
            type="button"
            aria-label="confirm"
            className="ml-1 size-6 rounded-full flex items-center justify-center transition-colors"
            onClick={handleConfirm}
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="cancel"
            className="ml-1 size-6 rounded-full flex items-center justify-center bg-destructive hover:bg-destructive/50 text-destructive-foreground transition-colors"
            onClick={handleCancel}
          >
            <X className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
};

const PrimitiveTextEdit = ({
  className,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      aria-label="text-edit-button"
      className={cn(
        "size-8 rounded-full cursor-pointer flex items-center justify-center hover:bg-accent transition-colors",
        className
      )}
      tabIndex={0}
      {...props}
    >
      {children}
    </Comp>
  );
};

export {
  PrimitiveText,
  PrimitiveTextEdit
};