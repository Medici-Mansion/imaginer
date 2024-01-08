import type { Metadata } from "next";
import "./globals.css";
import { PropsWithChildren } from "react";
import { PromptProvider } from "@/components/provider/prompt-provider";
import Navigation from "@/components/navigation";
import { cn } from "@/lib/utils";
import fonts from "@/fonts";

export const metadata: Metadata = {
  title: "Imaginer",
  description: "Imagine what you wanna make something.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="ko"
      placeholder="imaginer"
      className={cn("dark w-[1340px] mx-auto", fonts.roboto.className)}
    >
      <body
        suppressHydrationWarning
        className="m-auto flex flex-col justify-center"
      >
        <PromptProvider>
          <Navigation />
          {children}
        </PromptProvider>
      </body>
    </html>
  );
}
