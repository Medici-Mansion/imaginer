"use client";

import { useState } from "react";

import { Images } from "@/types";
import ImageCard from "@/components/image-card";
import Refresh from "@/components/refresh";

const StylePage = () => {
  const options = ["style", "artistic", "composition"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [selectId, setSelectId] = useState(0);

  const handleButtonClick = () => {
    const randomIndex = Math.floor(Math.random() * options.length);
    const newSelectedOption = options[randomIndex];
    setSelectedOption(newSelectedOption);
  };

  const images: Images[] = [
    { id: 1, href: `/images/${selectedOption}1.png` },
    { id: 2, href: `/images/${selectedOption}2.png` },
    { id: 3, href: `/images/${selectedOption}3.png` },
    { id: 4, href: `/images/${selectedOption}4.png` },
    { id: 5, href: `/images/${selectedOption}5.png` },
  ];

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
      <Refresh onClick={handleButtonClick} />
    </div>
  );
};

export default StylePage;
