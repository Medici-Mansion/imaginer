"use client";
import MjImages from "@/components/mj-images";
import useMj from "@/lib/hooks/useMj";
import { makePrompt } from "@/lib/parser";
import usePrompt from "@/store";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SubmitButton from "@/components/submit-button";

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
      generateImage(prompt);
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

  return (
    <>
      <div className="flex justify-center w-1/3 mx-auto">
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
      {isDone ? (
        <div className="flex justify-end pt-10">
          <SubmitButton
            onClick={() => {
              clear();
              router.refresh();
              router.replace("/");
            }}
            disabled={false}
            className="bg-primary px-16 text-white"
          >
            Retry
          </SubmitButton>
        </div>
      ) : null}
      <AnimatePresence>
        {image && key ? (
          <motion.div
            className="fixed left-0 top-0 w-[100dvw] h-[100dvh] flex items-center justify-center"
            animate="animate"
            exit="exit"
            variants={{
              animate: {
                backdropFilter: "blur(4px)",
              },
              exit: {
                backdropFilter: "blur(0px)",
              },
            }}
            onClick={() => {
              router.back();
            }}
          >
            <motion.div
              layoutId={key}
              className="relative w-2/5 border-[#F9E06C] border-4 overflow-hidden aspect-square rounded-3xl"
            >
              <Image src={image} alt="result" width={1000} height={1000} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default GeneragePage;
