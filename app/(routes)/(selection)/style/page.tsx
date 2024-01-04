"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { style } from "@/images";
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

const StylePage = () => {
  const router = useRouter();
  const { addPrompt, promptData } = usePrompt();

  const selectedId = useMemo(
    () => style.findIndex((item) => item.value === promptData.style),
    [promptData.style]
  );

  return (
    <>
      <div className="text-center text-[40px]">
        What style of image would you like?{" "}
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
            {style.map((img, index) => (
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
            router.push("/artisticreference");
          }}
          disabled={false}
          className="bg-c2 px-16 text-white"
        >
          Create
        </SubmitButton>
      </div>
    </>
  );
};

export default StylePage;
