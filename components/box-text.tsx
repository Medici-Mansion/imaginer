"use client";
import { capitalizeFirstLetter } from "@/lib/paser";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [direction, setDirection] = useState<{
    direction: "top" | "bottom";
    left: number;
  }>({ direction: "top", left: 0 });
  const boxRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const calcResize = useCallback(() => {
    if (boxRef.current) {
      const childBounding = boxRef.current.getBoundingClientRect();
      const { bottom, height } = bounding;
      const wrapperBounding = wrapperRef.current?.getBoundingClientRect();
      const left = wrapperBounding
        ? wrapperBounding.left - childBounding.left
        : 0;
      if (height + bottom >= childBounding.y) {
        setDirection({ direction: "top", left: left || 0 });
      } else {
        setDirection({ direction: "bottom", left: 0 });
      }
    }
  }, [bounding]);

  useEffect(() => {
    calcResize();
  }, [calcResize]);

  return (
    <div className={cn("inline text-3xl font-medium")} ref={wrapperRef}>
      {pre ? <span>{pre}&nbsp;</span> : ""}
      <div ref={boxRef} className={cn("inline-flex relative text-[#F9E06C]")}>
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
                    "block text-md rounded-sm px-5 py-1 leading-9 absolute  text-xl text-white",
                    direction.direction === "top" ? "-top-full" : "top-full",
                    pathname.replace("/", "") === label
                      ? "bg-activate"
                      : "bg-deactivate",
                    className
                  )}
                  style={{
                    left: `${direction.left}px`,
                  }}
                  initial="initial"
                  {...extractPropsByClassName}
                >
                  {capitalizeFirstLetter(label)}
                </motion.div>
              )}
            </TooltipTrigger>
            {description && (
              <TooltipContent side={direction.direction}>
                <p>{description}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        {text}
      </div>
      {sub}&nbsp;
    </div>
  );
};

export default BoxText;
