import { Subject } from "@/app/(routes)/(subject)/page";
import { cn } from "@/lib/utils";

interface SubjectProps {
  subjects: string[];
  select: {
    subject: string;
    id: number;
  };
  setSelect: (subject: Subject) => void;
  loading: boolean;
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
            select.id === index ? "text-white bg-activate" : "",
            loading && "opacity-50"
          )}
          onClick={() => {
            if (!loading) {
              setSelect({
                subject: item,
                id: index,
              });
            }
          }}
        >
          <div>{index + 1}</div>
          <div>{item}</div>
        </div>
      ))}
    </div>
  );
};

export default SubjectRadio;
