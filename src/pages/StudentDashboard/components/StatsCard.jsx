import { BookOpen } from "lucide-react";

function StatsCard({ title, value, children }) {
  return (
    <div className="flex gap-44 items-center border-gray-100 rounded-lg p-5 border-2">
      <div className="w-36">
        <h6 className="text-gray-500">{title}</h6>
        <span className="font-bold text-2xl">{value}</span>
      </div>
      {children}
    </div>
  );
}

export default StatsCard;
