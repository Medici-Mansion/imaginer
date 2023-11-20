import { UseFormReturn } from "react-hook-form";
import Image from "next/image";

import { FormData } from "@/types";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

interface IconInputProps {
  form: UseFormReturn<FormData>;
}

const IconInput = ({ form }: IconInputProps) => {
  return (
    <FormField
      control={form.control}
      name="subject"
      render={({ field }) => (
        <FormItem className="pt-7 space-y-5">
          <FormLabel className="text-bold flex justify-center text-[#FFF] text-[40px]">
            What are you thinking of?
          </FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                placeholder="Type your subject"
                {...field}
                className="m-auto w-[40%] bg-[#110F19] py-7 rounded-full border-none"
              />
            </FormControl>
            <button
              className="absolute right-[31%] top-1/2 pr-2 hover:cursor-pointer -translate-y-1/2"
              type={"submit"}
              disabled={!form.getValues().subject}
            >
              <Image
                src={
                  !form.getValues().subject
                    ? "/images/send.png"
                    : "/images/send_fill.png"
                }
                width={20}
                height={20}
                alt="send"
              />
            </button>
          </div>
        </FormItem>
      )}
    />
  );
};

export default IconInput;
