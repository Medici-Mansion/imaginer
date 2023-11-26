"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { replacePathname } from "@/lib/utils";
import { ImageCardProps } from "@/types";
import { usePathname } from "next/navigation";
import usePrompt from "@/store";

const ImageCard = ({
  href,
  id,
  selectId,
  setSelectId,
  value,
}: ImageCardProps) => {
  const pathname = usePathname();
  const { addPrompt } = usePrompt();

  const promptName = replacePathname(pathname);

  return (
    <div className="flex flex-col items-center space-y-4">
      <Image
        className={cn(
          "rounded-3xl",
          id === selectId ? "border-2 border-[#F9E06C]" : "opacity-50",
          selectId === 0 ? "opacity-100" : ""
        )}
        src={href}
        width={200}
        height={200}
        alt="image"
        onClick={() => {
          setSelectId(id);
          addPrompt({ [promptName]: value });
        }}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
      />
      <div>{value}</div>
    </div>
  );
};

export default ImageCard;
