"use client";

import { usePathname } from "next/navigation";

import { NavList } from "@/types";
import { useLoadingStore } from "@/store/loading";
import usePrompt from "@/store";

import Nav from "@/components/nav";

const Navigation = () => {
  const { subject, promptData } = usePrompt();
  const NavigationList: NavList[] = [
    { title: "Subject", href: "/", active: subject !== "" },
    {
      title: "Style",
      href: "/style",
      active: promptData["style"].length > 0,
    },
    {
      title: `Artistic Reference`,
      href: "/artisticreference",
      active: promptData["artisticreference"].length > 0,
    },
    {
      title: "Composition",
      href: "/composition",
      active: promptData["composition"].length > 0,
    },
    {
      title: "Mood",
      href: "/mood",
      active: promptData["mood"].length > 0,
    },
    {
      title: "Tone",
      href: "/tone",
      active: promptData["tone"].length > 0,
    },
  ];

  const { isLoading } = useLoadingStore();
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center gap-x-10 py-10">
      {NavigationList.map((item) => {
        return (
          <Nav
            key={item.title}
            href={item.href}
            pathname={pathname}
            title={item.title}
            isLoading={isLoading}
            active={item.active}
          />
        );
      })}
    </div>
  );
};

export default Navigation;
