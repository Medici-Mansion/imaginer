"use client";
import { capitalizeFirstLetter } from "@/lib/parser";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Images } from "@/types";

interface BoxTextProps extends HTMLMotionProps<"div"> {
  block: boolean;
  label: string;
  text?: Omit<Images, "href">[];
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
  block,
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
  const router = useRouter();

  const paragraphRefs = useRef<Map<string, HTMLParagraphElement>>(new Map());

  const calcResize = useCallback(() => {
    if (cardRef.current && boxRef.current) {
      const childBounding = cardRef.current.getBoundingClientRect();
      const preBounding = preRef.current?.getBoundingClientRect();
      let boundBottomHeight = Infinity;
      text?.map((item) => {
        const pRef = paragraphRefs.current.get(item.value);
        if (pRef) {
          const { bottom } = pRef.getBoundingClientRect();
          if (boundBottomHeight >= Math.floor(bottom)) {
            boundBottomHeight = Math.floor(bottom);
            pRef.style.marginTop = "0px";
          } else {
            pRef.style.marginTop = "20px";
          }
        }
      });
      if (
        bounding.height > childBounding.height &&
        bounding.top + childBounding.height <= childBounding?.top
      ) {
        setDirection({ direction: "bottom", left: 0 });
      } else {
        setDirection({
          direction: "top",
          // left: label === "composition" ? -(preBounding?.width || 0) : 0,
          left: 0,
        });
      }
    }
  }, [bounding]);

  useEffect(() => {
    calcResize();
  }, [calcResize]);
  const routerMap = {
    style: "/style",
    subject: "/",
    mood: "/mood",
    tone: "/tone",
    "artistic reference": "/artisticreference",
    composition: "/composition",
  };
  const isEndsWithComma = label.includes("artistic");
  return (
    <div ref={wrapperRef} className={cn("inline text-2xl font-medium")}>
      {pre ? <>{pre}&nbsp;</> : ""}
      <div
        ref={cardRef}
        className={cn(
          "inline-flex relative text-primary flex-wrap items-end",
          !text?.length && "bottom-1"
        )}
      >
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                ref={boxRef}
                layoutId={label}
                onClick={() =>
                  block &&
                  router.push(routerMap[label as keyof typeof routerMap])
                }
                className={cn(
                  "text-sm rounded-sm px-2 text-white whitespace-nowrap flex items-center",
                  block && "cursor-pointer",
                  !text?.length
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
                  transition: "background-color 0.2s ease-in-out",
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
        {text?.map((item, index) => (
          <p
            className="duration-150"
            ref={(ref) => {
              if (ref) {
                paragraphRefs.current.set(item.value, ref);
              }
            }}
            key={item.value}
          >
            {item.value}
            {index !== text.length - 1 && (
              <small className="text-white text-[100%]">,&nbsp;</small>
            )}
          </p>
        ))}
        {isEndsWithComma && sub && (
          <small className="text-white bottom-0 text-[100%]">
            &nbsp;
            {label === "mood" && !text?.length
              ? sub?.replace("mood ", " ")
              : sub}
            &nbsp;
          </small>
        )}
      </div>
      {!isEndsWithComma && sub && (
        <small className="text-white bottom-0 text-[100%]">
          &nbsp;
          {label === "mood" && !text?.length ? sub?.replace("mood ", " ") : sub}
          &nbsp;
        </small>
      )}
    </div>
  );
};

export default BoxText;
