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
  subject: string;
  setSubject: (subject: string) => void;
}

const usePrompt = create(
  persist<PromptStore>(
    (set) => ({
      promptData: {
        composition: [],
        style: [],
        tone: [],
        mood: [],
        artisticreference: [],
      },

      addPrompt: (data) => {
        set((state) => {
          return {
            promptData: {
              ...state.promptData,
              ...data,
            },
          };
        });
      },
      clear: () =>
        set((store) => ({
          ...store,
          promptData: {
            composition: [],
            style: [],
            subject: [],
            artisticreference: [],
            tone: [],
            mood: [],
          },
          input: "",
          subject: "",
          subjects: [],
        })),
      input: "",
      subject: "",
      setSubject: (subject) => set({ subject }),
      setInput: (input: string) =>
        set((storeData) => ({ ...storeData, input })),
      subjects: [],
      setSubjects: (subjects) => set({ subjects }),
    }),
    {
      name: "promptData",
      storage: createJSONStorage(() => localStorage),
      version: 2,
    }
  )
);

export default usePrompt;
