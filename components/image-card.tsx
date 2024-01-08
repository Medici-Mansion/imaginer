"use client";

import Image from "next/image";

import { cn, replacePathname } from "@/lib/utils";
import { ImageCardProps } from "@/types";
import { usePathname } from "next/navigation";
import usePrompt from "@/store";
import { useCallback, useEffect, useState } from "react";

const ImageCard = ({ href, id, selectId, value }: ImageCardProps) => {
  const pathname = usePathname();
  const { addPrompt, promptData } = usePrompt();
  const [loading, setLoading] = useState(true);

  const promptName = replacePathname(pathname);

  useEffect(() => {
    setLoading(false);
  }, []);

  const clickImageHandler = useCallback(
    (value: string, id: number, href: string) => {
      const isSameProperty = promptData[promptName].some((item) => {
        return item.id === id;
      });

      if (isSameProperty) {
        const filterPrompt = promptData[promptName].filter(
          (item) => item.id !== id
        );

        addPrompt({
          [promptName]: filterPrompt,
        });
      } else {
        addPrompt({
          [promptName]: [...promptData[promptName], { value, id, href }],
        });
      }
    },
    [addPrompt, promptData, promptName]
  );

  return (
    <div
      className={cn(
        "flex flex-col items-center space-y-4 h-[300px]",
        !loading && Array.isArray(selectId) && selectId.includes(id)
          ? ""
          : "opacity-50",
        !loading && Array.isArray(selectId) && selectId.length === 0
          ? "opacity-100"
          : ""
      )}
    >
      <Image
        className={cn(
          "rounded-3xl",
          !loading &&
            Array.isArray(selectId) &&
            selectId.includes(id) &&
            "border-4 border-primary",
          !loading && Array.isArray(selectId) && selectId.length === 0
            ? "opacity-100"
            : ""
        )}
        src={href}
        width={200}
        height={200}
        alt="image"
        onClick={() => clickImageHandler(value, id, href)}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
      />
      <div className="text-center text-image leading-none">{value}</div>
    </div>
  );
};

export default ImageCard;
