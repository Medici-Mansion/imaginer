"use client";

import { LucideRotateCw } from "lucide-react";

interface RefreshProps {
  onClick: () => Promise<void>;
}

const Refresh = ({ onClick }: RefreshProps) => {
  return (
    <div className="flex justify-end pt-7">
      <LucideRotateCw
        className="w-8 h-8 ring-1 p-1 rounded-full ring-white cursor-pointer"
        onClick={onClick}
      />
      <div className="flex justify-between items-center shadow"></div>
    </div>
  );
};

export default Refresh;
