"use client";
import { isNumeric } from "@/lib/paser";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
interface MjImagesProps {
  uri?: string;
  imageCount?: number;
  isIdle: boolean;
  selected?: boolean;
  isDone: boolean;
  onImageSelected?: (imageUrl: string) => void;
}

const CANVAS_COUNT = 4;

const mjSchama = z.object({
  imageUrl: z.string(),
});

const MjImages = ({
  isIdle,
  uri,
  selected,
  isDone,
  onImageSelected,
  imageCount = CANVAS_COUNT,
}: MjImagesProps) => {
  const imageRef = useRef<HTMLImageElement>();
  const canvasesRef = useRef<(HTMLCanvasElement | null)[]>(
    Array(imageCount).fill(null)
  );

  const ids = useMemo(
    () =>
      Array(imageCount)
        .fill(null)
        .map((_, idx) => new Date().getTime() + idx + ""),
    [imageCount]
  );

  const form = useForm<z.infer<typeof mjSchama>>({
    resolver: zodResolver(mjSchama),
    defaultValues: {
      imageUrl: "",
    },
  });

  const selectedIndex = form.watch().imageUrl;

  const draw = useCallback(() => {
    const image = imageRef.current;
    if (uri && image) {
      image.onload = () => {
        const canvases = canvasesRef.current.filter(
          Boolean
        ) as HTMLCanvasElement[];

        if (canvases.length && imageRef.current) {
          var width = imageRef.current.width / 2;
          var height = imageRef.current.height / 2;
          canvases.forEach((canvas, i) => {
            const context = canvas.getContext("2d");
            if (context) {
              context.clearRect(0, 0, window.innerWidth, window.innerHeight);
              var offsetX = (i % 2) * width;
              var offsetY = Math.floor(i / 2) * height;
              context.drawImage(
                image,
                offsetX,
                offsetY,
                width,
                height,
                0,
                0,
                2048,
                2048
              );
            }
          });
        }
      };
      image.src = uri;
    }
  }, [uri]);

  useEffect(() => {
    imageRef.current = new Image();
    imageRef.current.crossOrigin = "Anonymous";
    draw();
    window.addEventListener("resize", draw);
    return () => {
      window.removeEventListener("resize", draw);
    };
  }, [draw]);
  return (
    <>
      {isIdle || !uri ? (
        <div className="w-full aspect-square flex justify-center items-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-foreground via-secondary-foreground to-primary-foreground inline-block text-8xl py-2">
            Imaginer
          </span>
        </div>
      ) : (
        <Controller
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <div className="relative w-full grid grid-cols-2 gap-4">
              {canvasesRef.current.map((_, index) => (
                <div key={ids[index]} className="relative">
                  <input
                    className="peer hidden"
                    type="radio"
                    name="image"
                    id={ids[index]}
                    onChange={() => {
                      if (!isDone) return;
                      field.onChange(index + "");
                      canvasesRef.current[index]?.toBlob((blob) => {
                        if (blob) {
                          const blobUrl = URL.createObjectURL(blob);
                          onImageSelected && onImageSelected(blobUrl);
                        }
                      });
                    }}
                  />
                  <label
                    htmlFor={ids[index]}
                    className="absolute w-full h-full z-20"
                  />
                  <canvas
                    ref={(element) => {
                      canvasesRef.current[index] = element;
                    }}
                    width={2048}
                    height={2048}
                    className={cn(
                      "aspect-square rounded-3xl w-full h-full border border-transparent peer-hover:border-[#F9E06C] peer-checked:border-[#F9E06C] duration-200",
                      isDone &&
                        isNumeric(selectedIndex) &&
                        "opacity-50 peer-checked:opacity-100"
                    )}
                  />
                </div>
              ))}
            </div>
          )}
        />
      )}
    </>
  );
};

export default MjImages;
