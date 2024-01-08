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
import { Button } from "@/components/ui/button";

const GeneragePage = () => {
  const { promptData, subject, clear } = usePrompt();
  const queue = useRef(new Map<"callback", () => void>());
  const router = useRouter();
  const searchParams = useSearchParams();
  const image = searchParams.get("image");
  const key = searchParams.get("key");

  const { uri, isGenerating, progress, generateImage, isDone } = useMj();

  const parsedPrompt = useMemo(
    () => makePrompt({ ...promptData, subject: [{ value: subject }] }),
    [promptData]
  );
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
            className="bg-200 text-primary px-16"
          >
            Restart
          </SubmitButton>
        </div>
      ) : null}
      <AnimatePresence>
        {image && key ? (
          <motion.div className="fixed left-0 top-0 w-[100dvw] h-[100dvh] flex items-center flex-col space-y-8 justify-center z-[999]">
            <motion.div
              animate="animate"
              exit="exit"
              className="fixed w-[100dvw] h-[100dvh]"
              variants={{
                animate: {
                  backdropFilter: "blur(4px)",
                  backgroundColor: "rgba(0,0,0,0.5)",
                },
                exit: {
                  backdropFilter: "blur(0px)",
                  backgroundColor: "rgba(0,0,0,0)",
                },
              }}
              onClick={() => {
                router.back();
              }}
            />
            <motion.div
              layoutId={key}
              className="relative w-2/5 border-primary border-4 overflow-hidden aspect-square rounded-3xl"
            >
              <button
                className="absolute top-2 right-2"
                onClick={() => router.back()}
              >
                <svg
                  className="w-12 h-12"
                  width="52"
                  height="52"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.3613 20.3612L27.7225 26L33.3613 31.6387C33.481 31.7503 33.577 31.8849 33.6437 32.0344C33.7103 32.1839 33.7461 32.3453 33.749 32.5089C33.7519 32.6725 33.7218 32.8351 33.6605 32.9868C33.5992 33.1386 33.5079 33.2765 33.3922 33.3922C33.2765 33.5079 33.1386 33.5992 32.9869 33.6604C32.8351 33.7217 32.6726 33.7518 32.5089 33.749C32.3453 33.7461 32.1839 33.7103 32.0344 33.6436C31.8849 33.577 31.7503 33.481 31.6388 33.3612L26 27.7225L20.3613 33.3612C20.1302 33.5765 19.8246 33.6937 19.5089 33.6882C19.1932 33.6826 18.8919 33.5547 18.6686 33.3314C18.4453 33.1081 18.3174 32.8068 18.3118 32.4911C18.3063 32.1754 18.4235 31.8698 18.6388 31.6387L24.2775 26L18.6388 20.3612C18.4235 20.1302 18.3063 19.8246 18.3118 19.5089C18.3174 19.1932 18.4453 18.8919 18.6686 18.6686C18.8919 18.4453 19.1932 18.3174 19.5089 18.3118C19.8246 18.3063 20.1302 18.4235 20.3613 18.6387L26 24.2775L31.6388 18.6387C31.8698 18.4235 32.1754 18.3063 32.4911 18.3118C32.8068 18.3174 33.1081 18.4453 33.3314 18.6686C33.5547 18.8919 33.6826 19.1932 33.6882 19.5089C33.6937 19.8246 33.5765 20.1302 33.3613 20.3612ZM46.7188 26C46.7188 30.0978 45.5036 34.1035 43.227 37.5107C40.9504 40.9179 37.7146 43.5735 33.9287 45.1416C30.1429 46.7098 25.977 47.1201 21.958 46.3206C17.9389 45.5212 14.2472 43.5479 11.3496 40.6504C8.45207 37.7528 6.4788 34.0611 5.67936 30.042C4.87993 26.023 5.29023 21.8571 6.85838 18.0713C8.42653 14.2854 11.0821 11.0496 14.4893 8.77299C17.8965 6.49638 21.9022 5.28125 26 5.28125C31.493 5.2877 36.7591 7.47263 40.6432 11.3568C44.5274 15.2409 46.7123 20.507 46.7188 26ZM44.2813 26C44.2813 22.3843 43.2091 18.8498 41.2003 15.8435C39.1915 12.8371 36.3364 10.494 32.9959 9.11033C29.6555 7.72666 25.9797 7.36463 22.4335 8.07002C18.8873 8.7754 15.6299 10.5165 13.0732 13.0732C10.5165 15.6299 8.77541 18.8873 8.07003 22.4335C7.36464 25.9797 7.72667 29.6555 9.11034 32.9959C10.494 36.3364 12.8372 39.1915 15.8435 41.2003C18.8498 43.2091 22.3843 44.2812 26 44.2812C30.8468 44.2759 35.4936 42.3481 38.9209 38.9209C42.3481 35.4936 44.2759 30.8468 44.2813 26Z"
                    fill="white"
                  />
                </svg>
              </button>
              <Image src={image} alt="result" width={1000} height={1000} />
            </motion.div>
            <Button
              className="z-10"
              onClick={() => {
                const link = document.createElement("a");
                link.download = "image";
                link.href = image;
                link.click();
              }}
            >
              <svg
                width="25"
                height="24"
                className="mr-2"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.5 3C12.9142 3 13.25 3.33579 13.25 3.75V14.6893L16.4697 11.4697C16.7626 11.1768 17.2374 11.1768 17.5303 11.4697C17.8232 11.7626 17.8232 12.2374 17.5303 12.5303L12.5 17.5607L7.46967 12.5303C7.17678 12.2374 7.17678 11.7626 7.46967 11.4697C7.76256 11.1768 8.23744 11.1768 8.53033 11.4697L11.75 14.6893V3.75C11.75 3.33579 12.0858 3 12.5 3ZM4.25 15C4.66421 15 5 15.3358 5 15.75V19.5H20V15.75C20 15.3358 20.3358 15 20.75 15C21.1642 15 21.5 15.3358 21.5 15.75V19.5C21.5 20.3284 20.8284 21 20 21H5C4.17157 21 3.5 20.3284 3.5 19.5V15.75C3.5 15.3358 3.83579 15 4.25 15Z"
                  fill="#232329"
                />
              </svg>
              Download
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default GeneragePage;
