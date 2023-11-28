"use client";
import usePrompt from "@/store";
import { redirect } from "next/navigation";

const AuthProvider = () => {
  const {
    promptData: { subject },
  } = usePrompt();

  if (!subject) return redirect("/");
  return <></>;
};

export default AuthProvider;
