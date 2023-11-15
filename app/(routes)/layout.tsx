import Navigation from "@/components/navigation";
import { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full text-white">
      <Navigation />
      {children}
    </div>
  );
};

export default RootLayout;
