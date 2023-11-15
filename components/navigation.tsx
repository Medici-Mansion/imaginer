"use client";

import { cn } from "@/lib/utils";

interface Navigation {
  title: string;
  href: string;
  active: boolean;
}

const NavigationList: Navigation[] = [
  { title: "Subject", href: "/subject", active: true },
  { title: "Style", href: "/style", active: false },
  { title: `ArtistcReference`, href: "/artistiReference", active: false },
  { title: "Composition", href: "/composition", active: false },
  { title: "Mood", href: "/mood", active: false },
  { title: "Tone", href: "/tone", active: false },
];

const Navigation = () => {
  return (
    <div className="flex items-center justify-center gap-x-20 pt-10">
      {NavigationList.map((item) => (
        <div
          key={item.title}
          className={cn(
            "bg-[#110F19] w-[180px] border-2 border-[#292730] rounded-md py-3 text-center cursor-pointer",
            item.active ? "border-[#5854FF]" : ""
          )}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default Navigation;
