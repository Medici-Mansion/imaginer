import { HTMLAttributes, Dispatch, SetStateAction } from "react";

export interface FormData {
  subject: string
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
}

export interface ImageCardProps {
  href: string;
  id: number;
  selectId: number;
  setSelectId: Dispatch<SetStateAction<number>>;
}

export interface Images {
  id: number
  href: string
}

export interface PromptStoreItem {
  style: string
  subject: string
  mood: string
  composition: string
  tone: string
  artistic: string
}

export interface SubmitButtonProps extends HTMLAttributes<HTMLButtonElement> {
  onClick: () => void
  disabled: boolean
}