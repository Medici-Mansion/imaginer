"use client";

import { UseFormReturn } from "react-hook-form";
import Image from "next/image";

import { FormData } from "@/types";

import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconInputProps {
  form: UseFormReturn<FormData>;
  label?: string;
  isLoading?: boolean;
}

const IconInput = ({ form, label, isLoading }: IconInputProps) => {
  return (
    <FormField
      control={form.control}
      name="sentence"
      render={({ field }) => (
        <FormItem className="space-y-5">
          <FormLabel className="text-bold flex justify-center text-[#FFF] text-[40px]">
            {label}
          </FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                placeholder="Type your subject"
                {...field}
                value={field.value || ""}
                disabled={isLoading}
                className="m-auto w-[40%] input-box pr-[64px]"
              />
            </FormControl>
            <button
              className={cn(
                "absolute right-[31.5%] top-1/2 hover:cursor-pointer -translate-y-1/2  duration-300 rounded-full",
                field.value && !isLoading && "bg-c2"
              )}
              type={"submit"}
              disabled={!field.value || isLoading}
            >
              {isLoading ? (
                <RotateCw className="animate-spin w-5 h-5" />
              ) : !field.value ? (
                <Image
                  src="/images/send.png"
                  width={20}
                  height={20}
                  alt="send"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </FormItem>
      )}
    />
  );
};

export default IconInput;
