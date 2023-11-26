"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";

import usePrompt from "@/store";
import { useLoadingStore } from "@/store/loading";
import APIs from "@/apis";

import { Form } from "@/components/ui/form";
import Refresh from "@/components/refresh";
import SubmitButton from "@/components/submit-button";
import SubjectRadio from "@/components/subject-radio";
import IconInput from "@/components/icon-input";
import { promptContext } from "@/components/provider/prompt-provider";

const formSchema = z.object({
  sentence: z.string().min(1),
});

export interface Subject {
  subject: string;
  id: number;
}

const SubjectPage = () => {
  const router = useRouter();
  const { addPrompt, promptData } = usePrompt();
  const { isLoading, setLoading } = useLoadingStore();
  const { subjects, setSubjects, input, changeInput } =
    useContext(promptContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sentence: input || "",
    },
  });

  const select = useMemo(() => {
    const selectedSubject = promptData.subject;
    let result: Subject = { id: 0, subject: "" };
    if (selectedSubject) {
      subjects.some((item, index) => {
        if (item === selectedSubject) {
          result = {
            id: index,
            subject: item,
          };
        }
      });
    }
    return result;
  }, [promptData.subject, subjects]);

  const getSubjects = useCallback(
    async (sentence: string) => {
      setLoading(true);
      const response = await APIs.getSubjectList({ sentence });
      if (response.ok) {
        setSubjects(response.data);
        setLoading(false);
      }
    },
    [setLoading, setSubjects]
  );

  const thinkSubmit = async (values: z.infer<typeof formSchema>) => {
    changeInput(values.sentence);
    await getSubjects(values.sentence);
  };

  const setSelect = (args: Subject) => {
    addPrompt({ subject: args.subject });
  };

  const visible = subjects.length > 0;
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(thinkSubmit)} className="space-y-8">
          <IconInput
            form={form}
            label={"What are you thinking of?"}
            isLoading={isLoading}
          />
        </form>
      </Form>
      <div className="w-[70%] m-auto">
        {visible ? (
          <>
            <SubjectRadio
              subjects={subjects}
              select={select}
              setSelect={setSelect}
              loading={isLoading}
            />
            <Refresh onClick={() => console.log("123")} />
          </>
        ) : null}
      </div>
      {visible ? (
        <div className="flex justify-end pt-12 pr-32">
          <SubmitButton
            className="bg-[#5854FF] px-16"
            onClick={() => router.push("/style")}
            disabled={!promptData.subject || isLoading}
          >
            {"Create"}
          </SubmitButton>
        </div>
      ) : null}
    </div>
  );
};

export default SubjectPage;
