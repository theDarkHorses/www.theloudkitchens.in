"use client"

import { sliceString } from "@/app/utils/restaurant";
import { useState } from "react";

const ToggleString = ({ string }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div className="relative space-x-1">
      <span
        className={`overflow-hidden transition-all text-[#666] text-sm duration-500 ease-in-out font-lato`}
      >
        {sliceString(string, showMore)}
      </span>
      {string.length > 50 && (
        <span
          className="text-[#666] cursor-pointer font-lato text-sm font-bold"
          onClick={toggleShowMore}
        >
          {showMore ? "less" : "more"}
        </span>
      )}
    </div>
  );
};

export default ToggleString;
