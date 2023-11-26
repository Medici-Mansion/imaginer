"use client";

import { useMemo, useState } from "react";

import { Images } from "@/types";
import ImageCard from "@/components/image-card";
import usePrompt from "@/store";
import SubmitButton from "@/components/submit-button";
import { useRouter } from "next/navigation";

const images: Images[] = [
  { id: 1, href: "/images/composition1.png", value: "Close-up" },
  { id: 2, href: "/images/composition2.png", value: "Medium Shot" },
  { id: 3, href: "/images/composition3.png", value: "Long Shot" },
  { id: 4, href: "/images/composition4.png", value: "Low Angle" },
  { id: 5, href: "/images/composition5.png", value: "Side view" },
];

const CompositionPage = () => {
  const { addPrompt, promptData } = usePrompt();
  const router = useRouter();

  const selectedId = useMemo(
    () => images.findIndex((item) => item.value === promptData.composition),
    [promptData.composition]
  );
  return (
    <div className="pt-28">
      <div className="text-center text-[40px]">
        What composition of image would you like?{" "}
      </div>
      <div className="flex justify-evenly pt-16">
        {images.map((img, index) => (
          <ImageCard
            key={img.id}
            href={img.href}
            id={index}
            selectId={selectedId}
            setSelectId={(id) => addPrompt({ composition: images[id].value })}
            value={img.value}
          />
        ))}
      </div>
      <div className="flex justify-end pt-10">
        <SubmitButton
          onClick={() => {
            router.push("/generate");
          }}
          disabled={false}
          className="bg-[#5854FF] px-16 text-white"
        >
          Create
        </SubmitButton>
      </div>
    </div>
  );
};

export default CompositionPage;
