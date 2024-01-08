"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import SubmitButton from "./submit-button";
import Link from "next/link";

const NextButtons = () => {
  const pathMap = {
    "/style": "artisticreference",
    "/artisticreference": "composition",
    "/composition": "mood",
    "/mood": "tone",
    "/tone": "/generate",
  };
  const router = useRouter();
  const pathname = usePathname() as keyof typeof pathMap;

  return (
    <div className="justify-end flex pb-8 flex-1 items-center">
      <Link href="/generate">
        <SubmitButton
          onClick={() => {
            router.push(pathMap[pathname]);
          }}
          disabled={false}
          className="bg-primary px-16 h-12 ml-auto block font-semibold"
        >
          Create
        </SubmitButton>
      </Link>
    </div>
  );
};

export default NextButtons;
