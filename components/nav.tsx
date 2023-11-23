import Link from "next/link";

import { cn } from "@/lib/utils";
import { NavProps } from "@/types";
import { Button } from "./ui/button";

const Nav = ({ href, title, pathname, isLoading, ...rest }: NavProps) => {
  return (
    <>
      {isLoading ? (
        <Button
          disabled={isLoading}
          className={cn(
            "bg-[#110F19] w-[180px] border-2 border-[#292730] rounded-md py-6 text-center text-[16px]"
          )}
        >
          {title}
        </Button>
      ) : (
        <Link
          href={href}
          key={title}
          className={cn(
            "bg-[#110F19] w-[180px] border-2 border-[#292730] rounded-md py-3 text-center cursor-pointer",
            pathname === href ? "border-[#5854FF]" : "",
            rest.className
          )}
          {...rest}
        >
          {title}
        </Link>
      )}
    </>
  );
};

export default Nav;
