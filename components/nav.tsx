import Link from "next/link";

import { cn } from "@/lib/utils";
import { NavProps } from "@/types";

const Nav = ({ href, title, pathname, ...rest }: NavProps) => {
  return (
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
  );
};

export default Nav;
