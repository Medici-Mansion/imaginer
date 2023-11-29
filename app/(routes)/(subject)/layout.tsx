import { PropsWithChildren } from "react";

import { NavList } from "@/types";

import Navigation from "@/components/navigation";
const NavigationList: NavList[] = [
  { title: "Subject", href: "/", active: true },
  { title: "Style", href: "/style", active: false },
  { title: `Artistic Reference`, href: "/artisticreference", active: false },
  { title: "Composition", href: "/composition", active: false },
  { title: "Tone", href: "/tone", active: false },
];

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="m-auto flex flex-col justify-center">
      <Navigation navList={NavigationList} />
      <main className="flex-[3] flex flex-col justify-center">{children}</main>
    </div>
  );
};

export default RootLayout;
