import { PropsWithChildren } from "react";

import { NavList } from "@/types";

import Navigation from "@/components/navigation";
import Prompt from "@/components/prompt";
import { PromptProvider } from "@/components/provider/prompt-provider";

const NavigationList: NavList[] = [
  { title: "Subject", href: "/", active: true },
  { title: "Style", href: "/style", active: false },
  { title: `ArtisticReference`, href: "/artisticreference", active: false },
  { title: "Composition", href: "/composition", active: false },
  { title: "Tone", href: "/tone", active: false },
];

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <PromptProvider>
      <div className="h-full w-[80%] m-auto">
        <Navigation navList={NavigationList} />
        {children}
        <Prompt />
      </div>
    </PromptProvider>
  );
};

export default RootLayout;
