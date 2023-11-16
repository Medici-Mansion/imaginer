"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  think: z.string().min(1),
});

const SubjectPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      think: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="think"
            render={({ field }) => (
              <FormItem className="pt-7 space-y-5">
                <FormLabel className="text-bold flex justify-center text-[#FFF] text-[40px]">
                  What are you thinking of?
                </FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      className="m-auto w-[40%] bg-[#110F19] py-7 rounded-full border-none"
                    />
                  </FormControl>
                  <button
                    className="absolute right-[31%] top-1/2 pr-2 hover:cursor-pointer -translate-y-1/2"
                    type="submit"
                  >
                    <Image
                      src={"/images/send.png"}
                      width={20}
                      height={20}
                      alt="send"
                    />
                  </button>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default SubjectPage;
