"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { tone } from "@/images";
import usePrompt from "@/store";

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
  const { addPrompt, promptData } = usePrompt();
  const router = useRouter();
  const selectedId = useMemo(
    () => tone.findIndex((item) => item.value === promptData.tone),
    [promptData.tone]
  );
  return (
    <div>
      <div className="text-center text-[40px]">
        What tone of image would you like?
      </div>
      <div className="flex justify-evenly pt-16">
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: 5,
          }}
          className="w-full"
        >
          <CarouselContent>
            {tone.map((img, index) => (
              <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/5">
                <div className="p-1">
                  <span className="text-3xl font-semibold">
                    <ImageCard
                      key={img.id}
                      href={img.href}
                      id={index}
                      selectId={selectedId}
                      setSelectId={() => addPrompt({ style: img.value })}
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
            router.push("/generate");
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
