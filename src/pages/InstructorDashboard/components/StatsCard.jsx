import React from "react";

const StatsCard = ({ title, value, icon }) => {
  return (

    <div className="bg-white shadow rounded-xl p-4 flex items-center justify-between">
      <div>
        <h2 className="text-sm text-gray-500">{title}</h2>
        <p className="text-xl font-semibold">{value}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
    
  );
};

export default StatsCard;
