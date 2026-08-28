import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-xl bg-elevated px-3.5 text-sm text-fg shadow-hairline",
        "placeholder:text-subtle",
        "transition-[box-shadow] duration-150 ease-out",
        "focus-visible:shadow-hairline-hover focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  );
});
