import { cn } from "@/lib/utils";

const Separator = ({ height }: { height?: number }) => {
  return (
    <div
      className={cn(
        "my-8  w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700",
        !height ? "h-1" : `h-[${height}px]`
      )}
    />
  );
};

export { Separator };
