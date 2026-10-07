
import  { useState } from 'react';

const StatsCard = ({ title, value, colorClass }) => {
  // BILA SABABU: Unachukua prop na kukiweka tena kwenye state
  const [cardValue, ] = useState(value);

  return (
    <div className={`bg-white p-5 rounded-lg shadow border-l-4 ${colorClass}`}>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mt-1">{cardValue}</h3>
    </div>
  );
};

export default StatsCard;