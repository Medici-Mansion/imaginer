"use client";
import MjImages from "@/components/mj-images";
import Prompt from "@/components/prompt";
import useMj from "@/lib/hooks/useMj";
import { makePrompt } from "@/lib/paser";
import usePrompt from "@/store";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";

const GeneragePage = () => {
  const { promptData, clear } = usePrompt();
  const queue = useRef(new Map<"callback", () => void>());
  const router = useRouter();
  const searchParams = useSearchParams();
  const image = searchParams.get("image");
  const key = searchParams.get("key");

  const { uri, isGenerating, progress, generateImage, isDone } = useMj();

  const parsedPrompt = useMemo(() => makePrompt(promptData), [promptData]);
  const generateImageAction = useCallback(
    (prompt?: string) => {
      if (!prompt) return;
      generateImage(prompt, () => clear());
    },
    [clear, generateImage]
  );
  const isIdle = !isGenerating && !uri;

  useEffect(() => {
    if (!isGenerating) {
      queue.current.clear();
      queue.current.set("callback", () => {
        generateImageAction(parsedPrompt);
      });
    }

    requestIdleCallback(() => {
      if (queue.current.size) {
        const cb = queue.current.get("callback");
        queue.current.clear();
        cb?.();
      }
    });
  }, []);

  return image && key ? (
    <motion.div
      layoutId={key}
      className="relative border-[#F9E06C] border-4 overflow-hidden aspect-square rounded-3xl"
    >
      <Image src={image} alt="result" width={1000} height={1000} />
    </motion.div>
  ) : (
    <>
      <Prompt cache />
      <div className="flex justify-center w-2/3 mx-auto py-4 pt-10">
        <MjImages
          isIdle={isIdle}
          uri={uri}
          isDone={isDone}
          onImageSelected={({ image, key }) => {
            const params = new URLSearchParams();
            params.set("image", image);
            params.set("key", key + "");
            router.push("/generate?" + params.toString());
          }}
        />
      </div>
    </>
  );
};

export default GeneragePage;
