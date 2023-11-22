import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import { SubjectSkeleton } from "@/components/skeleton";

interface SubjectProps {
  subjects: string[];
  loading: boolean;
  select: {
    subject: string;
    id: number;
  };
  setSelect: Dispatch<SetStateAction<{ subject: string; id: number }>>;
}

const SubjectRadio = ({
  subjects,
  select,
  setSelect,
  loading,
}: SubjectProps) => {
  return (
    <div className="pt-5 w-full">
      {subjects.map((item: string, index: number) => (
        <div
          key={index}
          className={cn(
            "flex gap-2 mt-5 bg-[#232323] px-4 py-3 rounded-sm cursor-pointer",
            select.id === index ? "text-white bg-[#5854FF]" : ""
          )}
          onClick={() =>
            setSelect({
              subject: item,
              id: index,
            })
          }
        >
          <div>{index + 1}</div>
          <div>{item}</div>
        </div>
      ))}
    </div>
  );
};

export default SubjectRadio;