"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import usePrompt from "@/store";
import { artistic } from "@/images";
import { getStartIndex } from "@/lib/utils";

import SubmitButton from "@/components/submit-button";
import ImageCard from "@/components/image-card";
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

  const startIndex = (index: number) => {
    return getStartIndex(index);
  };

  const selectedId = promptData.artisticreference.map((item) => item.id);

  return (
    <div>
      <div className="text-center text-title">
        What artistic reference would you like?{" "}
      </div>
      <div className="flex justify-evenly pt-16">
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: 5,
            startIndex: startIndex(
              selectedId.length === 0 ? 0 : selectedId.sort((a, b) => a - b)[0]
            ),
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {artistic.map((img, index) => (
              <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/5">
                <div className="p-1">
                  <span>
                    <ImageCard
                      key={img.id}
                      href={img.href}
                      id={index}
                      selectId={selectedId}
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
    </div>
  );
};

export default ArtisticPage;
