"use client";

import { Images } from "@/types";

import ImageCard from "@/components/image-card";
import SubmitButton from "@/components/submit-button";
import { useRouter } from "next/navigation";
import usePrompt from "@/store";
import { useMemo } from "react";

const images: Images[] = [
  { id: 1, href: "/images/style1.png", value: "Anime" },
  { id: 2, href: "/images/style2.png", value: "Hyper Realistic" },
  { id: 3, href: "/images/style3.png", value: "Sci-fi" },
  { id: 4, href: "/images/style4.png", value: "Photo" },
  { id: 5, href: "/images/style5.png", value: "Painting" },
];

const StylePage = () => {
  const router = useRouter();
  const { addPrompt, promptData } = usePrompt();

  const selectedId = useMemo(
    () => images.findIndex((item) => item.value === promptData.style),
    [promptData.style]
  );

  return (
    <>
      <div className="text-center text-[40px]">
        What style of image would you like?{" "}
      </div>
      <div className="flex justify-evenly pt-16">
        {images.map((img, index) => (
          <ImageCard
            key={img.id}
            href={img.href}
            id={index}
            selectId={selectedId}
            setSelectId={() => addPrompt({ style: img.value })}
            value={img.value}
          />
        ))}
      </div>
      <div className="flex justify-end pt-10">
        <SubmitButton
          onClick={() => {
            router.push("/artisticreference");
          }}
          disabled={false}
          className="bg-[#5854FF] px-16 text-white"
        >
          Create
        </SubmitButton>
      </div>
    </>
  );
};

export default StylePage;
