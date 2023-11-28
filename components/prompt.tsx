"use client";

import usePrompt from "@/store";
import { usePathname } from "next/navigation";
import BoxText from "./box-text";

const Prompt = () => {
  const prompt = usePrompt();
  const { promptData } = prompt || {};
  const { subject, style, composition, tone, artisticreference } =
    promptData || {};
  console.log(promptData, "<<promptData");
  return (
    <div className="pt-10">
      <BoxText label="composition" pre="A" text={composition} sub=" , " />
      <BoxText label="style" sub="-depliction of " text={style} />
      <BoxText label="subject" text={subject} />
      <BoxText label="tone" sub="," text={tone} />
      <BoxText
        label="artisticreference"
        pre="reminiscent of "
        text={artisticreference}
      />
    </div>
  );
};

export default Prompt;
