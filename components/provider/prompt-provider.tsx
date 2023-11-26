"use client";
import usePrompt from "@/store";
import { PropsWithChildren, createContext } from "react";

export const promptContext = createContext<{
  subjects: string[];
  input: string;
  changeInput: (text: string) => void;
  setSubjects: (subjects: string[]) => void;
}>({
  subjects: [],
  input: "",
  changeInput: () => {},
  setSubjects: () => {},
});

export const PromptProvider = ({ children }: PropsWithChildren) => {
  const { setSubjects, subjects, input, setInput } = usePrompt();

  const changeInput = (text: string) => {
    setInput(text);
  };
  return (
    <promptContext.Provider
      value={{ input, subjects, setSubjects, changeInput }}
    >
      {children}
    </promptContext.Provider>
  );
};
