"use client";

import usePrompt from "@/store";
import { usePathname } from "next/navigation";

const Prompt = () => {
  const pathname = usePathname();
  const prompt = usePrompt();
  const { promptData } = prompt || {};
  const { subject, style, composition, tone, artisticreference } =
    promptData || {};

  return (
    <div className="pt-10">
      {/* {pathname !== "/" ? (
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
      ) : null} */}
      {/* {pathname !== "/" && (
        <div>
          {`A ${composition ? composition : "composition"} , ${
            style || "Style"
          }-depiction of a ${subject || ""}, in ${
            tone ? tone : "Tone"
          }, reminiscent of ${
            artisticreference ? artisticreference : "Artistic reference"
          }`}
        </div>
      )} */}
    </div>
  );
};

export default Prompt;
