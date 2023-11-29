"use client";

import { useMemo } from "react";

import { Images } from "@/types";
import ImageCard from "@/components/image-card";
import usePrompt from "@/store";
import SubmitButton from "@/components/submit-button";
import { useRouter } from "next/navigation";

const images: Images[] = [
  { id: 1, href: "/images/artistic1.png", value: "Pixar" },
  { id: 2, href: "/images/artistic2.png", value: "Disney" },
  { id: 3, href: "/images/artistic3.png", value: "Shinkai Makoto" },
  { id: 4, href: "/images/artistic4.png", value: "Rambrant" },
  { id: 5, href: "/images/artistic5.png", value: "Tim Burton" },
];

const ArtisticPage = () => {
  const { addPrompt, promptData } = usePrompt();
  const router = useRouter();
  const selectedId = useMemo(
    () =>
      images.findIndex((item) => item.value === promptData.artisticreference),
    [promptData.artisticreference]
  );
  return (
    <div>
      <div className="text-center text-[40px]">
        What artistic reference would you like?{" "}
      </div>
      <div className="flex justify-evenly pt-16">
        {images.map((img, index) => (
          <ImageCard
            key={img.id}
            href={img.href}
            id={index}
            selectId={selectedId}
            setSelectId={(id) =>
              addPrompt({ artisticreference: images[id].value })
            }
            value={img.value}
          />
        ))}
      </div>
      <div className="flex justify-end pt-10">
        <SubmitButton
          onClick={() => {
            router.push("/composition");
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
