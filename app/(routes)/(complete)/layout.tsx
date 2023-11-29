import { PropsWithChildren } from "react";

import { NavList } from "@/types";
import { PromptProvider } from "@/components/provider/prompt-provider";

const NavigationList: NavList[] = [
  { title: "Subject", href: "/", active: true },
  { title: "Style", href: "/style", active: false },
  { title: `ArtisticReference`, href: "/artisticreference", active: false },
  { title: "Composition", href: "/composition", active: false },
  { title: "Tone", href: "/tone", active: false },
];

const RootLayout = ({ children, ...rest }: PropsWithChildren) => {
  return (
    <main className="h-[100dvh] w-[1440px] m-auto flex flex-col justify-center items-center">
      <PromptProvider>{children}</PromptProvider>
    </main>
  );
};

export default RootLayout;
