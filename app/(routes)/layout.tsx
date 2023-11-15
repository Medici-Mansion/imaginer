import Navigation from "@/components/navigation";
import { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-slate-900 h-full text-white">
      <Navigation />
      {children}
    </div>
  );
};

export default RootLayout;
