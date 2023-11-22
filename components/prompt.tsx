"use client";

import usePrompt from "@/store";
import { usePathname } from "next/navigation";

const Prompt = () => {
  const pathname = usePathname();
  const prompt = usePrompt();
  const { promptData } = prompt || {};
  const { subject, style, mood, composition, tone, artistic } =
    promptData || {};

  return (
    <div className="pt-10">
      {pathname !== "/" ? (
        <div className="flex gap-1">
          <div>A</div>
          <div>
            {composition ? (
              <div>
                <div className="bg-[#5F5F5F] px-2">composition</div>
                <div className="text-[#F9E37E]">awefawefawefawef</div>
              </div>
            ) : (
              // composition
              <div className="bg-[#5F5F5F] px-2">composition</div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Prompt;
