"use client";
import { PropsWithChildren, createContext, useState } from "react";

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
  const [subjects, setSubjects] = useState<string[]>([]);
  const [input, setInput] = useState("");
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
