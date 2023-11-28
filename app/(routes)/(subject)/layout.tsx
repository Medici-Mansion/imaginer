import { PropsWithChildren } from "react";

import { NavList } from "@/types";

import Navigation from "@/components/navigation";
const NavigationList: NavList[] = [
  { title: "Subject", href: "/", active: true },
  { title: "Style", href: "/style", active: false },
  { title: `ArtisticReference`, href: "/artisticreference", active: false },
  { title: "Composition", href: "/composition", active: false },
  { title: "Tone", href: "/tone", active: false },
];

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full w-[1440px] m-auto">
      <Navigation navList={NavigationList} />
      {children}
    </div>
  );
};

export default RootLayout;
