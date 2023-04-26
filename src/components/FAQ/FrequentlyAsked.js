import React from "react";
import { BsQuestionLg } from "react-icons/bs";
import { faqData } from "../data/data";
import FrequentlyAskedTab from "./FrequentlyAskedTab";
const FrequentlyAsked = () => {
  return (
    <div className="w-[90%] mx-auto">
      <div className="p-8  border-b border-primaryColor">
        <h1 className="text-[1.2rem] font-semibold text-primaryColor ">
          Frequently Asked Questions
        </h1>
      </div>

      {/* faq banner */}
      <div className="flex gap-4 p-8 bg-lime-100 items-center rounded-b-xl">
        <BsQuestionLg className="text-[6rem] text-primaryColor animate-bounce" />
        <div className="flex flex-col gap-4">
          <h1 className="text-[1.6rem] text-textColor font-bold">
            Have questions?
          </h1>
          <h4 className="text-[1.2rem] font-medium">
            We are always here for you
          </h4>
          <p>
            You can find answers asked by other people. Or can contact us
            through phone!
          </p>
        </div>
      </div>

      {/* FAQ questions */}
      <div className="mt-8 flex flex-col gap-4">
        {faqData &&
          faqData.map((item, index) => (
            <FrequentlyAskedTab
              key={index}
              question={item?.question}
              answer={item?.answer}
            />
          ))}
      </div>
    </div>
  );
};

export default FrequentlyAsked;
