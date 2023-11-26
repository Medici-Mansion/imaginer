"use client";

import { useState } from "react";

import { Images } from "@/types";
import ImageCard from "@/components/image-card";

const images: Images[] = [
  { id: 1, href: "/images/artistic1.png", value: "Pixar" },
  { id: 2, href: "/images/artistic2.png", value: "Disney" },
  { id: 3, href: "/images/artistic3.png", value: "Shinkai Makoto" },
  { id: 4, href: "/images/artistic4.png", value: "Rambrant" },
  { id: 5, href: "/images/artistic5.png", value: "Rambrant" },
];

const ArtisticPage = () => {
  const [selectId, setSelectId] = useState(0);
  return (
    <div className="pt-28">
      <div className="text-center text-[40px]">
        What artistic reference would you like?{" "}
      </div>
      <div className="flex justify-evenly pt-16">
        {images.map((img) => (
          <ImageCard
            key={img.id}
            href={img.href}
            id={img.id}
            selectId={selectId}
            setSelectId={setSelectId}
            value={img.value}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtisticPage;
