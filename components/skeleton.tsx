import { Skeleton } from "@/components/ui/skeleton";

export function SubjectSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <div className="space-y-5">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  );
}
