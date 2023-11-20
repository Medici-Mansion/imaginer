"use client";

import * as z from "zod";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import usePrompt from "@/store";
import APIs from "@/apis";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Refresh from "@/components/refresh";
import SubmitButton from "@/components/submit-button";
import SubjectRadio from "@/components/subject-radio";

const formSchema = z.object({
  sentence: z.string().min(1),
});

const SubjectPage = () => {
  const router = useRouter();
  const { addPrompt, promptData } = usePrompt();
  const [visible, setVisible] = useState(false);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState({
    subject: "",
    id: 0,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sentence: "",
    },
  });

  const thinkSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const response = await APIs.getSubjectList(values);
    if (response.ok) {
      setSubjects(response.data);
      setVisible(true);
      setLoading(false);
    }
  };

  const subjectSubmit = () => {
    addPrompt({ subject: select.subject });
    router.push("/style");
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(thinkSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="sentence"
            render={({ field }) => (
              <FormItem className="pt-28 space-y-5">
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
                    type="submit"
                    disabled={!form.getValues().sentence}
                  >
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
                  </button>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="w-[70%] m-auto">
        {visible && (
          <>
            <SubjectRadio
              subjects={subjects}
              select={select}
              setSelect={setSelect}
              loading={loading}
            />
            <Refresh onClick={() => console.log("123")} />
          </>
        )}
      </div>
      {visible && (
        <div className="flex justify-end pt-12 pr-32">
          <SubmitButton
            className="bg-[#5854FF] px-16"
            onClick={subjectSubmit}
            disabled={!form.getValues().sentence}
          >
            Create
          </SubmitButton>
        </div>
      )}
    </div>
  );
};

export default SubjectPage;
