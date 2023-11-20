import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PromptStoreItem } from '@/types';

interface PromptStore {
  promptData: PromptStoreItem;
  addPrompt: (data: Partial<PromptStoreItem>) => void;
}

const usePrompt = create(
  persist<PromptStore>((set) => ({
    promptData: {
      style: '',
      subject: '',
      mood: '',
      composition: '',
      tone: '',
      artistic: '',
    },
    addPrompt: (data) => {
      set((state) => ({
        promptData: {
          ...state.promptData,
          ...data,
        },
      }));
    },
  }), {
    name: 'promptData',
    storage: createJSONStorage(() => localStorage),
  })
);

export default usePrompt;
