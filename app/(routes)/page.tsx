"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import usePrompt from "@/store";
import APIs from "@/apis";

import { Form } from "@/components/ui/form";
import Refresh from "@/components/refresh";
import SubmitButton from "@/components/submit-button";
import SubjectRadio from "@/components/subject-radio";
import IconInput from "@/components/icon-input";

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
          <IconInput
            form={form}
            loading={loading}
            label={"What are you thinking of?"}
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
