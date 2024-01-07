"use client";
import { capitalizeFirstLetter } from "@/lib/parser";
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
  const preRef = useRef<HTMLSpanElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const calcResize = useCallback(() => {
    if (cardRef.current && boxRef.current) {
      const childBounding = cardRef.current.getBoundingClientRect();
      const preBounding = preRef.current?.getBoundingClientRect();
      if (
        bounding.height > childBounding.height &&
        bounding.top + childBounding.height <= childBounding?.top
      ) {
        setDirection({ direction: "bottom", left: 0 });
      } else {
        setDirection({
          direction: "top",
          left: label === "composition" ? -(preBounding?.width || 0) : 0,
        });
      }
    }
  }, [bounding]);

  useEffect(() => {
    calcResize();
  }, [calcResize]);
  return (
    <div ref={wrapperRef} className={cn("inline text-2xl font-medium")}>
      {pre ? <span ref={preRef}>{pre}&nbsp;</span> : ""}
      <div ref={cardRef} className={cn("inline-flex relative text-primary")}>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                ref={boxRef}
                layoutId={label}
                className={cn(
                  "block text-sm rounded-sm px-5 text-white whitespace-nowrap",
                  !text
                    ? "text-base"
                    : direction.direction === "top"
                    ? "-top-[20px] absolute"
                    : "-top-[20px] absolute",
                  pathname.replace("/", "") === label.replace(" ", "")
                    ? "bg-primary text-black"
                    : "bg-deactivate",
                  className
                )}
                style={{
                  left: `${direction.left}px`,
                  ...extractPropsByClassName.style,
                }}
                {...extractPropsByClassName}
              >
                {capitalizeFirstLetter(label)}
              </motion.div>
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
