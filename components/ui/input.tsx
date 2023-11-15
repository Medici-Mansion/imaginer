import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  rightIcon: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, rightIcon, ...props }, ref) => {
    return (
      <div className="relative">
        <div className="flex relative">
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <Image
              src={"/images/send.png"}
              width={20}
              height={20}
              alt="send"
              className="absolute right-0 flex items-center pr-2 cursor-pointer"
            />
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
