"use client";

import { usePathname } from "next/navigation";

import { NavList } from "@/types";
import Nav from "@/components/nav";
import { useLoadingStore } from "@/store/loading";

const Navigation = ({ navList }: { navList: NavList[] }) => {
  const { isLoading } = useLoadingStore();
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center gap-x-10 py-10">
      {navList.map((item) => (
        <Nav
          key={item.title}
          href={item.href}
          pathname={pathname}
          title={item.title}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default Navigation;
