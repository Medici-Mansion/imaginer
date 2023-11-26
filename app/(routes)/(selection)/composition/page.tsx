"use client";

import { useState } from "react";

import { Images } from "@/types";
import ImageCard from "@/components/image-card";

const images: Images[] = [
  { id: 1, href: "/images/composition1.png" },
  { id: 2, href: "/images/composition2.png" },
  { id: 3, href: "/images/composition3.png" },
  { id: 4, href: "/images/composition4.png" },
  { id: 5, href: "/images/composition5.png" },
];

const CompositionPage = () => {
  const [selectId, setSelectId] = useState(0);
  return (
    <div className="pt-28">
      <div className="text-center text-[40px]">
        What composition of image would you like?{" "}
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

export default CompositionPage;
