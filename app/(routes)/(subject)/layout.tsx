import { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex-[3] flex flex-col justify-center">{children}</main>
  );
};

export default RootLayout;
