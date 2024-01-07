import { PropsWithChildren } from "react";
import Prompt from "@/components/prompt";
import AuthProvider from "@/components/provider/auth-provider";
import NextButtons from "@/components/next-buttons";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className="flex-[3] flex flex-col justify-center">
        {children}
        <Prompt className="mx-auto" />
        <NextButtons />
      </main>

      <AuthProvider />
    </>
  );
};

export default RootLayout;
