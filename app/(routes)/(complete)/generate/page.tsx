"use client";
import MjImages from "@/components/mj-images";
import useMj from "@/lib/hooks/useMj";
import { makePrompt } from "@/lib/paser";
import usePrompt from "@/store";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";

import * as z from "zod";
const schema = z.object({
  prompt: z.string().min(1),
});

const GeneragePage = () => {
  const { promptData, clear } = usePrompt();
  const router = useRouter();
  const queue = useRef(new Map<"callback", () => void>());

  const { uri, isGenerating, progress, generateImage } = useMj();

  const parsedPrompt = useMemo(() => makePrompt(promptData), [promptData]);
  const generateImageAction = useCallback((prompt?: string) => {
    if (!prompt) return;
    generateImage(prompt);
  }, []);
  const isIdle = !isGenerating && !uri;

  useEffect(() => {
    if (!isGenerating) {
      queue.current.clear();
      queue.current.set("callback", () => {
        clear();
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
    <div>
      <div className="flex justify-center w-2/3 mx-auto py-4">
        <MjImages
          isIdle={isIdle}
          uri={uri}
          isDone={progress === 100}
          onImageSelected={(imgaeUrl) => {
            console.log(imgaeUrl);
          }}
        />
      </div>
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onValid)} className="flex space-x-3">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="grow">
                <Input
                  disabled={!isIdle}
                  {...field}
                  placeholder="What is your imagination?"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Generate</Button>
        </form>
      </Form> */}
    </div>
  );
};

export default GeneragePage;
