import { PropsWithChildren } from "react";
import Prompt from "@/components/prompt";
import AuthProvider from "@/components/provider/auth-provider";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className="flex-[3] flex flex-col justify-center">{children}</main>
      <Prompt className="mx-auto flex-1" />
      <AuthProvider />
    </>
  );
};

export default RootLayout;
