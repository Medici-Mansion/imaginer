"use client";

import { useRouter } from "next/navigation";

import { style } from "@/images";
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

const StylePage = () => {
  const router = useRouter();
  const { promptData } = usePrompt();

  const startIndex = (index: number) => {
    return getStartIndex(index);
  };

  const selectedId = promptData.style.map((item) => item.id);

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
            startIndex: startIndex(
              selectedId.length === 0 ? 0 : selectedId.sort((a, b) => a - b)[0]
            ),
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
          className="bg-primary px-16 text-white"
        >
          Create
        </SubmitButton>
      </div>
    </>
  );
};

export default StylePage;
