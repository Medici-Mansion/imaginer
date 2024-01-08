"use client";
import usePrompt from "@/store";
import BoxText from "./box-text";
import {
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import { Images } from "@/types";
import { promptSetting } from "@/constants";

interface PromptProps extends HTMLMotionProps<"div"> {
  cache?: boolean;
  block?: boolean;
}
const Prompt = ({ cache = false, block = true, ...props }: PromptProps) => {
  const prompt = usePrompt();
  const cachePrompt = useRef(prompt);
  const { promptData, subject } = cache ? cachePrompt.current : prompt || {};

  const { style, composition, tone, artisticreference, mood } =
    promptData || {};
  const boxRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const [bounding, setBounding] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: 0,
  });
  const boxItem = useMemo(() => {
    if (!mounted) return {};
    const boxes: {
      [key: string]: {
        text: Omit<Images, "href">[];
        pre: string;
        sub: string;
        direction?: "top" | "bottom";
        description?: string;
      };
    } = {
      composition: {
        ...promptSetting["composition"],
        text: composition,
      },
      style: {
        ...promptSetting["style"],
        text: style,
      },
      subject: {
        ...promptSetting["subject"],
        text: [{ value: subject, id: 0 }],
      },
      mood: {
        ...promptSetting["mood"],
        text: mood,
      },
      tone: {
        ...promptSetting["tone"],
        text: tone,
      },
      "artistic reference": {
        ...promptSetting["artistic reference"],
        text: artisticreference,
      },
    };
    return boxes;
  }, [artisticreference, composition, mood, mounted, style, subject, tone]);

  const resizeHandler = useCallback(() => {
    if (boxRef.current) {
      const rect = boxRef.current?.getBoundingClientRect();
      setBounding((prev) => rect);
    }
  }, []);

  const boxItems = useMemo(
    () =>
      Object.entries(boxItem).filter(
        (item) => block || !!item?.[1].text.length
      ),
    [block, boxItem]
  );

  useEffect(() => {
    setMounted(true);
    let cr: HTMLDivElement;
    if (boxRef.current) {
      cr = boxRef.current;
      boxRef.current.addEventListener("resize", resizeHandler);
      window.addEventListener("resize", resizeHandler);
      return () => {
        cr.removeEventListener("resize", resizeHandler);
        window.removeEventListener("resize", resizeHandler);
      };
    }
  }, [resizeHandler]);

  useEffect(() => {
    setTimeout(() => resizeHandler(), 500);
  }, [promptData, resizeHandler]);
  return (
    <motion.div
      layoutId="prompt"
      {...props}
      className={cn("pt-10 leading-[60px]", props.className)}
    >
      <div ref={boxRef}>
        {boxItems.map(([key, value], index) => {
          return (
            <BoxText
              isLast={index === boxItems.length - 1}
              block={block}
              key={key}
              bounding={bounding}
              label={key}
              pre={value.pre}
              sub={value.sub}
              text={value.text}
              description={value.description}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default Prompt;
