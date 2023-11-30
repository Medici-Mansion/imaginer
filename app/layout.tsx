import type { Metadata } from "next";
import "./globals.css";
import { PropsWithChildren } from "react";
import { PromptProvider } from "@/components/provider/prompt-provider";
import Navigation from "@/components/navigation";
import { NavigationList } from "@/constants";

export const metadata: Metadata = {
  title: "Imaginer",
  description: "Imagine what you wanna make something.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="ko"
      placeholder="imaginer"
      className="dark w-[1340px] h-[100dvh] mx-auto"
    >
      <body
        suppressHydrationWarning
        className="m-auto flex flex-col justify-center"
      >
        <PromptProvider>
          <Navigation navList={NavigationList} />
          {children}
        </PromptProvider>
      </body>
    </html>
  );
}
