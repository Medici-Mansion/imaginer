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
    <div className="pt-5 w-full flex flex-col space-y-4">
      {subjects.map((item: string, index: number) => (
        <div
          key={index}
          className={cn(
            "flex gap-2 input-box cursor-pointer py-4 px-7 border-transparent rounded-md duration-300",
            select.id === index
              ? "text-white border-primary border-2"
              : "opacity-50",
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
          <div>{item}</div>
        </div>
      ))}
    </div>
  );
};

export default SubjectRadio;
