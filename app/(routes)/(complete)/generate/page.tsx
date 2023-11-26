"use client";
import MjImages from "@/components/mj-images";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useMj from "@/lib/hooks/useMj";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
const schema = z.object({
  prompt: z.string().min(1),
});

const GeneragePage = () => {
  const { uri, isGenerating, progress, generateImage } = useMj();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      prompt: "",
    },
  });
  const onValid = (values: z.infer<typeof schema>) => {
    generateImage(values.prompt);
  };
  const isIdle = !isGenerating && !uri;
  return (
    <div>
      <div className="flex justify-center w-2/3 mx-auto py-4">
        <MjImages
          isIdle={isIdle}
          uri={uri}
          isDone={progress === 100}
          onImageSelected={(imgaeUrl) => {
            console.log(imgaeUrl);
          }}
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValid)} className="flex space-x-3">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="grow">
                <Input
                  disabled={!isIdle}
                  {...field}
                  placeholder="What is your imagination?"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Generate</Button>
        </form>
      </Form>
    </div>
  );
};

export default GeneragePage;
