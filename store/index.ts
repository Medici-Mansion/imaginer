import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PromptStoreItem } from "@/types";

interface PromptStore {
  promptData: PromptStoreItem;
  addPrompt: (data: Partial<PromptStoreItem>) => void;
  clear: () => void;
  subjects: string[];
  setSubjects: (subjects: string[]) => void;
  input: string;
  setInput: (input: string) => void;
}

const usePrompt = create(
  persist<PromptStore>(
    (set) => ({
      promptData: {
        composition: "",
        style: "",
        subject: "",
        tone: "",
        artisticreference: "",
      },
      addPrompt: (data) => {
        set((state) => ({
          promptData: {
            ...state.promptData,
            ...data,
          },
        }));
      },
      clear: () =>
        set((store) => ({
          ...store,
          promptData: {
            composition: "",
            style: "",
            subject: "",
            tone: "",
            artisticreference: "",
          },
          input: "",
          subjects: [],
        })),
      input: "",
      setInput: (input: string) =>
        set((storeData) => ({ ...storeData, input })),
      subjects: [],
      setSubjects: (subjects) => set({ subjects }),
    }),
    {
      name: "promptData",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePrompt;
