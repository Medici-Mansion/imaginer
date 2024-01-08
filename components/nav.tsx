import Link from "next/link";

import { cn } from "@/lib/utils";
import { NavProps } from "@/types";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import fonts from "@/fonts";

const Nav = ({
  href,
  title,
  pathname,
  isLoading,
  active,
  ...rest
}: NavProps) => {
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
            "bg-[#373743] w-[180px] border-2 border-[#3C3A41] rounded-md py-2.5 text-center cursor-pointer duration-300 relative flex items-center justify-center h-12",
            pathname === href ? "border-primary" : "",
            rest.className
          )}
          {...rest}
        >
          <div className="flex items-center justify-center relative flex-1">
            <pre className={cn("text-sm", fonts.roboto.className)}>
              {title.split(" ").join("\n")}
            </pre>
            {active && (
              <Check
                className={cn(
                  "absolute right-4 w-5 h-5 border rounded-full bg-primary text-black",
                  title === "Artistic Reference" ? "right-3" : ""
                )}
              />
            )}
          </div>
        </Link>
      )}
    </>
  );
};

export default Nav;
