import { PromptStoreItem } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const replacePathname = (pathname: string) => {
  const path = pathname.replace('/', "")
  return path as keyof PromptStoreItem

}

export const getStartIndex = (index: number) => index < 5 ? 0 : index < 10 ? 1 : 2;
