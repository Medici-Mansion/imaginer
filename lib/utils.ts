import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const replacePathname = (pathname: string) => {
  return pathname.replace('/', "")
}

export const getStartIndex = (index: number) => index <= 5 ? 0 : index <= 10 ? 1 : 2;
