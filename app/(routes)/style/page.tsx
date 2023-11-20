"use client";

import { useState } from "react";
import ImageCard from "@/components/image-card";
import { Images } from "@/types";

const images: Images[] = [
  { id: 1, href: "/images/style1.png" },
  { id: 2, href: "/images/style2.png" },
  { id: 3, href: "/images/style3.png" },
  { id: 4, href: "/images/style4.png" },
  { id: 5, href: "/images/style5.png" },
];

const StylePage = () => {
  const [selectId, setSelectId] = useState(0);
  return (
    <div className="pt-28">
      <div className="text-center text-[40px]">
        What style of image would you like?{" "}
      </div>
      <div className="flex justify-evenly pt-16">
        {images.map((img) => (
          <ImageCard
            key={img.id}
            href={img.href}
            id={img.id}
            selectId={selectId}
            setSelectId={setSelectId}
          />
        ))}
      </div>
    </div>
  );
};

export default StylePage;
