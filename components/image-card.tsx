import Image from "next/image";

import { cn } from "@/lib/utils";
import { ImageCardProps } from "@/types";

const ImageCard = ({ href, id, selectId, setSelectId }: ImageCardProps) => {
  return (
    <Image
      className={cn(
        "rounded-3xl",
        id === selectId ? "border-2 border-[#F9E06C]" : "opacity-50"
      )}
      src={href}
      width={200}
      height={200}
      alt="image"
      onClick={() => setSelectId(id)}
    />
  );
};

export default ImageCard;
