
import { PropsWithChildren } from "react";

import { NavList } from "@/types";

import Navigation from "@/components/navigation";
import Prompt from "@/components/prompt";

const NavigationList: NavList[] = [
  { title: "Subject", href: "/", active: true },
  { title: "Style", href: "/style", active: false },
  { title: `ArtisticReference`, href: "/artisticreference", active: false },
  { title: "Composition", href: "/composition", active: false },
  { title: "Tone", href: "/tone", active: false },
];

const RootLayout = ({ children, ...rest }: PropsWithChildren) => {
  return (
    <div className="h-[100dvh] w-[80%] m-auto">
      <Navigation navList={NavigationList} />
      <Prompt />
      {children}
    </div>
  );
};

export default RootLayout;
