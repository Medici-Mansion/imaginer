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
  bounding: {
    top: number;
    bottom: number;
    left: number;
    right: number;
    height: number;
  };
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
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const calcResize = useCallback(() => {
    if (cardRef.current && wrapperRef.current) {
      const childBounding = cardRef.current.getBoundingClientRect();

      const wrapperBounding = wrapperRef.current?.getBoundingClientRect();
      if (bounding.top + childBounding.height < wrapperBounding?.top) {
        setDirection({ direction: "bottom", left: 0 });
      } else {
        setDirection({
          direction: "top",
          left:
            label === "composition"
              ? childBounding.width - wrapperBounding.width || 0
              : 0,
        });
      }
    }
  }, [bounding]);

  useEffect(() => {
    calcResize();
  }, [calcResize]);
  return (
    <div ref={wrapperRef} className={cn("inline text-2xl font-medium")}>
      {pre ? <span>{pre}&nbsp;</span> : ""}
      <div ref={cardRef} className={cn("inline-flex relative text-[#F9E06C]")}>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              {!text ? (
                <motion.div
                  layoutId={label}
                  className={cn(
                    "block text-md rounded-sm px-5 py-1 leading-9 text-xl text-white",
                    pathname.replace("/", "") === label.replace(" ", "")
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
                    "block text-md rounded-sm px-5 py-1 leading-9 absolute  text-xl text-white whitespace-nowrap",
                    direction.direction === "top" ? "-top-full" : "top-full",
                    pathname.replace("/", "") === label.replace(" ", "")
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
