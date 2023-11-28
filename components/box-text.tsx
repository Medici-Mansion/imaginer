"use client";
import { capitalizeFirstLetter } from "@/lib/paser";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BoxTextProps extends HTMLMotionProps<"div"> {
  label: string;
  text?: string;
  sub?: string;
  pre?: string;
  bounding: { bottom: number; height: number };
  direction?: "top" | "bottom";
  description?: string;
}
const BoxText = ({
  label,
  text,
  sub,
  bounding,
  description,
  ...rest
}: BoxTextProps) => {
  const { className, pre, ...extractPropsByClassName } = rest;
  const [direction, setDirection] = useState<"top" | "bottom">("top");
  const boxRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (boxRef.current) {
      const childBounding = boxRef.current.getBoundingClientRect();
      const { bottom, height } = bounding;
      if (height + bottom >= childBounding.y) {
        setDirection("top");
      } else {
        setDirection("bottom");
      }
    }
  }, [bounding]);

  return (
    <div className={cn("inline text-3xl font-medium")} ref={boxRef}>
      {pre}
      <div
        className={cn(
          "relative inline-flex text-[#F9E06C]",
          pre && "ml-2"
          // sub && "mr-2"
        )}
      >
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              {!text ? (
                <motion.div
                  layoutId={label}
                  className={cn(
                    "block text-md rounded-sm px-5 py-1 leading-9 text-xl text-white",
                    pathname.replace("/", "") === label
                      ? "bg-activate"
                      : "bg-deactivate",
                    className
                  )}
                  {...extractPropsByClassName}
                >
                  {capitalizeFirstLetter(label)}
                </motion.div>
              ) : (
                <motion.div
                  layoutId={label}
                  className={cn(
                    "block text-md rounded-sm px-5 py-1 leading-9 absolute  left-0 text-xl text-white",
                    direction === "top" ? "-top-full" : "top-full",
                    pathname.replace("/", "") === label
                      ? "bg-activate"
                      : "bg-deactivate",
                    className
                  )}
                  initial="initial"
                  {...extractPropsByClassName}
                >
                  {capitalizeFirstLetter(label)}
                </motion.div>
              )}
            </TooltipTrigger>
            {description && (
              <TooltipContent side={direction}>
                <p>{description}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        {text}
      </div>
      {sub}
    </div>
  );
};

export default BoxText;
