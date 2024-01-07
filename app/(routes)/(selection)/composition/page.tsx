"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { composition } from "@/images";
import usePrompt from "@/store";

import SubmitButton from "@/components/submit-button";
import ImageCard from "@/components/image-card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CompositionPage = () => {
  const { addPrompt, promptData } = usePrompt();
  const router = useRouter();

  const selectedId = useMemo(
    () =>
      composition.findIndex((item) => item.value === promptData.composition),
    [promptData.composition]
  );
  return (
    <>
      <div className="text-center text-[40px]">
        What composition of image would you like?{" "}
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
            {composition.map((img, index) => (
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
            router.push("/mood");
          }}
          disabled={false}
          className="bg-primary px-16 text-white"
        >
          Create
        </SubmitButton>
      </div>
    </>
  );
};

export default CompositionPage;
