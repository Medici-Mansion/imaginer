import { PropsWithChildren } from "react";

import { NavList } from "@/types";

import Navigation from "@/components/navigation";
import Prompt from "@/components/prompt";
import AuthProvider from "@/components/provider/auth-provider";
const NavigationList: NavList[] = [
  { title: "Subject", href: "/", active: true },
  { title: "Style", href: "/style", active: false },
  { title: `Artistic Reference`, href: "/artisticreference", active: false },
  { title: "Composition", href: "/composition", active: false },
  { title: "Tone", href: "/tone", active: false },
];

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="m-auto flex flex-col justify-center h-[100dvh]">
      <Navigation navList={NavigationList} />
      <main className="flex-[3] flex flex-col justify-center">{children}</main>
      <Prompt className="mx-auto flex-1" />
      <AuthProvider />
    </div>
  );
};

export default RootLayout;
