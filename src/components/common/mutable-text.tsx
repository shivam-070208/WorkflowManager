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

const MutableText: React.FC<PrimitiveTextProps> = ({
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
    <div
      className={cn("group relative flex items-center", className)}
      {...props}
    >
      {!editing ? (
        <>
          <span className="wrap-break-word outline-none">{internalText}</span>
          {editable && renderEditButton && (
            <MutableTextEdit
              aria-label="text-edit-button"
              className={cn(
                "ml-2 opacity-0 transition-opacity group-hover:opacity-100",
                editButtonClassName,
              )}
              onClick={() => setEditing(true)}
            >
              <Pencil className="h-4 w-4" />
            </MutableTextEdit>
          )}
        </>
      ) : (
        <>
          <input
            ref={inputRef}
            className={cn(
              "focus:ring-primary mr-2 rounded border px-2 py-1 text-sm outline-none focus:ring-1",
              inputClassName,
            )}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleConfirm();
              if (e.key === "Escape") handleCancel();
            }}
          />
          <button
            type="button"
            aria-label="confirm"
            className="ml-1 flex size-6 items-center justify-center rounded-full transition-colors"
            onClick={handleConfirm}
          >
            <Check className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="cancel"
            className="bg-destructive hover:bg-destructive/50 text-destructive-foreground ml-1 flex size-6 items-center justify-center rounded-full transition-colors"
            onClick={handleCancel}
          >
            <X className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
};

const MutableTextEdit = ({
  className,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot : "div";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      (e.currentTarget as HTMLElement).click();
    }
  };

  return (
    <Comp
      aria-label="text-edit-button"
      className={cn(
        "hover:bg-accent flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors",
        className,
      )}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </Comp>
  );
};
export { MutableText, MutableTextEdit };
