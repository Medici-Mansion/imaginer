"use client";

import { useMemo } from "react";

import { Images } from "@/types";
import ImageCard from "@/components/image-card";
import usePrompt from "@/store";
import SubmitButton from "@/components/submit-button";
import { useRouter } from "next/navigation";

const images: Images[] = [
  { id: 1, href: "/images/artistic1.png", value: "Terror" },
  { id: 2, href: "/images/artistic2.png", value: "Colorful" },
  { id: 3, href: "/images/artistic3.png", value: "Light" },
  { id: 4, href: "/images/artistic4.png", value: "Muted" },
  { id: 5, href: "/images/artistic5.png", value: "Gloomy" },
];

const ArtisticPage = () => {
  const { addPrompt, promptData } = usePrompt();
  const router = useRouter();
  const selectedId = useMemo(
    () => images.findIndex((item) => item.value === promptData.mood),
    [promptData.mood]
  );
  return (
    <div>
      <div className="text-center text-[40px]">
        What mood of image would you like?
      </div>
      <div className="flex justify-evenly pt-16">
        {images.map((img, index) => (
          <ImageCard
            key={img.id}
            href={img.href}
            id={index}
            selectId={selectedId}
            setSelectId={(id) => addPrompt({ mood: images[id].value })}
            value={img.value}
          />
        ))}
      </div>
      <div className="flex justify-end pt-10">
        <SubmitButton
          onClick={() => {
            router.push("/tone");
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

export default ArtisticPage;
