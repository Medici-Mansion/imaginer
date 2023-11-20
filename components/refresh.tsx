import { LucideRotateCw } from "lucide-react";

interface RefreshProps {
  onClick: () => void;
}

const Refresh = ({ onClick }: RefreshProps) => {
  return (
    <div className="flex justify-end pt-7">
      <LucideRotateCw
        className="w-8 h-8 ring-1 p-1 rounded-full ring-white cursor-pointer"
        onClick={onClick}
      />
    </div>
  );
};

export default Refresh;
