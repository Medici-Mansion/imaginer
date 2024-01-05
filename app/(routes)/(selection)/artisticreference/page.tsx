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
  const selectedId = useMemo(
    () =>
      artistic.findIndex((item) => item.value === promptData.artisticreference),
    [promptData.artisticreference]
  );

  const startIndex = (index: number) => {
    return getStartIndex(index);
  };

  return (
    <div>
      <div className="text-center text-[40px]">
        What artistic reference would you like?{" "}
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
            {artistic.map((img, index) => (
              <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/5">
                <div className="p-1">
                  <span className="text-3xl font-semibold">
                    <ImageCard
                      key={img.id}
                      href={img.href}
                      id={index}
                      selectId={selectedId}
                      setSelectId={() =>
                        addPrompt({ artisticreference: img.value })
                      }
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
            router.push("/composition");
          }}
          disabled={false}
          className="bg-c2 px-16 text-black"
        >
          Create
        </SubmitButton>
      </div>
    </div>
  );
};

export default ArtisticPage;
