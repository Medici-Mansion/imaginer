import { PropsWithChildren } from "react";
import AuthProvider from "@/components/provider/auth-provider";
import Prompt from "@/components/prompt";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grow flex flex-col">
      <Prompt cache className="py-5 mx-auto flex-[0.5] flex items-center" />
      <main className="flex-[3] flex flex-col justify-center">{children}</main>
      <AuthProvider />
    </div>
  );
};

export default RootLayout;
