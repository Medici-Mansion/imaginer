import { HTMLAttributes, Dispatch, SetStateAction } from "react";

export interface FormData {
  sentence: string;
}

export interface NavList {
  title: string;
  href: string;
  active: boolean;
}

export interface NavProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  title: string;
  pathname: string;
  isLoading: boolean;
}

export interface ImageCardProps {
  href: string;
  id: number;
  selectId: number[];
  setSelectId?: (id: number) => void;
  value: string;
}

export interface Images {
  id: number;
  href: string;
  value: string;
}

export interface PromptStoreItem {
  style: Omit<Images, 'href'>[]
  composition: Omit<Images, 'href'>[]
  tone: Omit<Images, 'href'>[]
  mood: Omit<Images, 'href'>[]
  artisticreference: Omit<Images, 'href'>[]
}

export interface SubmitButtonProps extends HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  disabled: boolean;
}