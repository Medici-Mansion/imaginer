"use client";
import { capitalizeFirstLetter } from "@/lib/paser";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";

interface BoxTextProps extends HTMLMotionProps<"div"> {
  label: string;
  text?: string;
  sub?: string;
  pre?: string;
}
const BoxText = ({ label, text, sub, ...rest }: BoxTextProps) => {
  const { className, pre, ...extractPropsByClassName } = rest;

  return (
    <div className={cn("inline text-3xl")}>
      {pre}
      <div className={cn("relative inline-flex", pre && "ml-2", sub && "mr-2")}>
        {!text ? (
          <motion.div
            layoutId={label}
            className={cn(
              "block bg-activate text-md rounded-sm px-5 py-1 leading-9 text-xl",
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
              "block bg-activate text-md rounded-sm px-5 py-1 leading-9 absolute -top-full left-0 text-xl",
              className
            )}
            initial="initial"
            {...extractPropsByClassName}
          >
            {capitalizeFirstLetter(label)}
          </motion.div>
        )}
        {text}
      </div>
      {sub}
    </div>
  );
};

export default BoxText;
