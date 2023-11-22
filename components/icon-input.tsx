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

interface IconInputProps {
  form: UseFormReturn<FormData>;
  label?: string;
  loading?: boolean;
}

const IconInput = ({ form, label, loading }: IconInputProps) => {
  return (
    <FormField
      control={form.control}
      name="sentence"
      render={({ field }) => (
        <FormItem className="pt-28 space-y-5">
          <FormLabel className="text-bold flex justify-center text-[#FFF] text-[40px]">
            {label}
          </FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                placeholder="Type your subject"
                {...field}
                value={field.value || ""}
                className="m-auto w-[40%] bg-[#110F19] py-7 rounded-full border-none"
              />
            </FormControl>
            <button
              className="absolute right-[31%] top-1/2 pr-2 hover:cursor-pointer -translate-y-1/2"
              type={"submit"}
              disabled={!form.getValues().sentence}
            >
              {loading ? (
                <RotateCw className="animate-spin w-5 h-5" />
              ) : (
                <Image
                  src={
                    !form.getValues().sentence
                      ? "/images/send.png"
                      : "/images/send_fill.png"
                  }
                  width={20}
                  height={20}
                  alt="send"
                />
              )}
            </button>
          </div>
        </FormItem>
      )}
    />
  );
};

export default IconInput;
