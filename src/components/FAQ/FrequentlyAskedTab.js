import React, { useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

const FrequentlyAskedTab = ({ question, answer }) => {
  const [showFAQ, setShowFAQ] = useState(false);
  return (
    <div className="border border-gray-300 rounded-xl p-4 bg-bgColor">
      <div className="flex gap-4 justify-between items-center">
        <div className="flex gap-4 items-center">
          <BsQuestionCircle className="text-[2rem] text-primaryColor" />
          <h3 className="text-base text-secondary font-semibold">{question}</h3>
        </div>
        <IoIosArrowDown
          onClick={() => setShowFAQ(!showFAQ)}
          className="inline-block text-primaryColor animate-pulse text-[1.8rem] cursor-pointer"
        />
      </div>
      {showFAQ && (
        <div className="flex p-4 justify-between mt-4 transition-all duration-[1s]">
          <p className="text-base text-textColor">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FrequentlyAskedTab;
