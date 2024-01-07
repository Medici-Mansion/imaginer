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
            "bg-[#373743] w-[180px] border-2 border-[#3C3A41] rounded-md py-5 text-center text-[16px]"
          )}
        >
          {title}
        </Button>
      ) : (
        <Link
          href={href}
          key={title}
          className={cn(
            "bg-[#373743] w-[180px] border-2 border-[#3C3A41] rounded-md py-2.5 text-center cursor-pointer duration-300",
            pathname === href ? "border-primary" : "",
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
