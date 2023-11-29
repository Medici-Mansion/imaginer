"use client";
import usePrompt from "@/store";
import BoxText from "./box-text";
import {
  HTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface PromptProps extends HTMLAttributes<HTMLDivElement> {
  cache?: boolean;
}
const Prompt = ({ cache = false, ...props }: PromptProps) => {
  const prompt = usePrompt();
  const cachePrompt = useRef(prompt);
  const { promptData } = cache ? cachePrompt.current : prompt || {};
  const { subject, style, composition, tone, artisticreference } =
    promptData || {};
  const boxRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const [bounding, setBounding] = useState({
    bottom: 0,
    height: 0,
  });
  const boxItem = useMemo(() => {
    if (!mounted) return {};
    const boxes: {
      [key: string]: {
        text: string;
        pre: string;
        sub: string;
        direction?: "top" | "bottom";
        description?: string;
      };
    } = {
      composition: {
        text: composition,
        pre: "A",
        sub: ",  ",
        description: "Image Composite Description",
      },
      style: {
        text: style,
        sub: "-depliction of ",
        pre: "",
      },
      subject: {
        text: subject,
        sub: "",
        pre: "",
      },
      tone: {
        text: tone,
        sub: ",",
        pre: "",
      },
      artisticreference: {
        text: artisticreference,
        sub: "",
        pre: "reminiscent of",
      },
    };
    return boxes;
  }, [artisticreference, composition, mounted, style, subject, tone]);

  const resizeHandler = useCallback(() => {
    if (boxRef.current) {
      const { height, y } = boxRef.current?.getBoundingClientRect();
      setBounding((prev) => ({ bottom: y, height: 40 }));
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    if (boxRef.current) {
      boxRef.current.addEventListener("resize", resizeHandler);
      window.addEventListener("resize", resizeHandler);
      return () => {
        boxRef.current?.removeEventListener("resize", resizeHandler);
        window.removeEventListener("resize", resizeHandler);
      };
    }
  }, [resizeHandler]);

  useEffect(() => {
    requestIdleCallback(resizeHandler);
  }, [promptData]);

  return (
    <div {...props} className={cn("pt-10", props.className)} ref={boxRef}>
      {Object.entries(boxItem).map(([key, value]) => (
        <BoxText
          key={key}
          bounding={bounding}
          label={key}
          pre={value.pre}
          sub={value.sub}
          text={value.text}
          description={value.description}
        />
      ))}
    </div>
  );
};

export default Prompt;
