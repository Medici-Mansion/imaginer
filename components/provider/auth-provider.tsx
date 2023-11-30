"use client";
import usePrompt from "@/store";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const AuthProvider = () => {
  const {
    promptData: { subject },
  } = usePrompt();

  useEffect(() => {
    window.requestIdleCallback = function (cb: (props: unknown) => void) {
      var start = Date.now();
      return setTimeout(function () {
        cb({
          didTimeout: false,
          timeRemaining: function () {
            return Math.max(0, 50 - (Date.now() - start));
          },
        });
      }, 1);
    } as any;
  }, []);

  useEffect(() => {
    if (!subject) redirect("/");
  }, [subject]);
  return <></>;
};

export default AuthProvider;
