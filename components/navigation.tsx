"use client";

import { usePathname } from "next/navigation";

import { NavList } from "@/types";
import Nav from "@/components/nav";

const Navigation = ({ navList }: { navList: NavList[] }) => {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center gap-x-20 pt-10">
      {navList.map((item) => (
        <Nav
          key={item.title}
          href={item.href}
          pathname={pathname}
          title={item.title}
        />
      ))}
    </div>
  );
};

export default Navigation;
