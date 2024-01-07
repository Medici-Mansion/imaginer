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
        <FormItem className="space-y-12">
          <FormLabel className="text-bold flex justify-center text-[#FFF] text-title">
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
                "absolute right-[31.5%] top-1/2 hover:cursor-pointer -translate-y-1/2  duration-150 rounded-full w-10 h-10 flex justify-center items-center",
                field.value && !isLoading && "bg-primary"
              )}
              type={"submit"}
              disabled={!field.value || isLoading}
            >
              {isLoading ? (
                <RotateCw className="animate-spin w-5 h-5" />
              ) : (
                <svg
                  width="26"
                  height="25"
                  viewBox="0 0 26 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="duration-150"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.15033 0.868367C1.33188 0.710664 1.55609 0.610317 1.79465 0.580011C2.03321 0.549704 2.27539 0.590797 2.4906 0.698097L24.3825 11.644C24.5849 11.7449 24.7551 11.9002 24.8741 12.0925C24.9932 12.2848 25.0562 12.5064 25.0562 12.7326C25.0562 12.9587 24.9932 13.1803 24.8741 13.3726C24.7551 13.5649 24.5849 13.7202 24.3825 13.8211L2.4906 24.767C2.27541 24.8747 2.03312 24.9161 1.79437 24.886C1.55563 24.856 1.33118 24.7557 1.14941 24.5981C0.967647 24.4404 0.836739 24.2323 0.773253 24.0002C0.709767 23.7681 0.716558 23.5224 0.792765 23.2942L3.90871 13.9488H10.4605C10.783 13.9488 11.0924 13.8206 11.3205 13.5926C11.5485 13.3645 11.6767 13.0551 11.6767 12.7326C11.6767 12.41 11.5485 12.1006 11.3205 11.8726C11.0924 11.6445 10.783 11.5163 10.4605 11.5163H3.90871L0.791549 2.17093C0.715734 1.94279 0.709237 1.69729 0.772879 1.46545C0.836521 1.23361 0.968663 1.02583 1.15033 0.868367Z"
                    fill={!field.value ? "white" : "#2E2E37"}
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
