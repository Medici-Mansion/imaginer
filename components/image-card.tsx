import Image from "next/image";

import { cn } from "@/lib/utils";
import { ImageCardProps } from "@/types";

const ImageCard = ({ href, id, selectId, setSelectId }: ImageCardProps) => {
  return (
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
      onClick={() => setSelectId(id)}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
    />
  );
};

export default ImageCard;
