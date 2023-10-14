"use client"

import { useState } from "react";

const ToggleString = ({ string }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div className="relative">
      <div
        className={`overflow-hidden transition-all text-[#666] text-sm duration-500 ease-in-out font-lato ${
          showMore ? "max-h-full" : "max-h-[38px]"
        } `}
      >
        {string}
      </div>
      {string.length > 50 && (
        <button
          className="text-[#666] font-lato text-sm font-bold"
          onClick={toggleShowMore}
        >
          {showMore ? "less" : "...more"}
        </button>
      )}
    </div>
  );
};

export default ToggleString;
