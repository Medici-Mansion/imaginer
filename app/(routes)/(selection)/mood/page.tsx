"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { mood } from "@/images";
import usePrompt from "@/store";
import { getStartIndex } from "@/lib/utils";

import ImageCard from "@/components/image-card";
import SubmitButton from "@/components/submit-button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ArtisticPage = () => {
  const router = useRouter();
  const { addPrompt, promptData } = usePrompt();

  const selectedId = useMemo(
    () => mood.findIndex((item) => item.value === promptData.mood),
    [promptData.mood]
  );

  const startIndex = (index: number) => {
    return getStartIndex(index);
  };

  return (
    <div>
      <div className="text-center text-[40px]">
        What mood of image would you like?
      </div>
      <div className="flex justify-evenly pt-16">
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: 5,
            startIndex: startIndex(selectedId || 0),
          }}
          className="w-full"
        >
          <CarouselContent>
            {mood.map((img, index) => (
              <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/5">
                <div className="p-1">
                  <span className="text-3xl font-semibold">
                    <ImageCard
                      key={img.id}
                      href={img.href}
                      id={index}
                      selectId={selectedId}
                      setSelectId={() => addPrompt({ mood: img.value })}
                      value={img.value}
                    />
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex justify-end pt-10">
        <SubmitButton
          onClick={() => {
            router.push("/tone");
          }}
          disabled={false}
          className="bg-primary px-16 text-white"
        >
          Create
        </SubmitButton>
      </div>
    </div>
  );
};

export default ArtisticPage;
