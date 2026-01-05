import React from "react";
import { cn } from "@/lib/utils";

export type ContainerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export type ContainerPadding = "none" | "sm" | "md" | "lg";

const sizeClasses: Record<ContainerSize, string> = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full",
};

const paddingClasses: Record<ContainerPadding, string> = {
  none: "p-0",
  sm: "p-2 sm:p-4",
  md: "p-4 sm:p-6",
  lg: "p-6 sm:p-8",
};

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: ContainerSize;
  padding?: ContainerPadding;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  as: Component = "div",
  size = "lg",
  padding = "md",
  ...props
}) => {
  return (
    <Component
      className={cn(
        "w-full mx-auto",
        sizeClasses[size],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Container;

