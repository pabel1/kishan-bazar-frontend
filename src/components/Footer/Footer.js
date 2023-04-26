import React, { useState } from "react";
import { footerData } from "../data/footerData";
import BottomFooter from "./BottomFooter";
import UpperFooter from "./UpperFooter";

const Footer = () => {
  const [foter] = useState(footerData);
  return (
    <div className=" container my-8 mt-14 ">
      {/* <div className="flex items-center justify-around">
        {foter?.map((item, i) => (
          <UperFooterContent data={item} key={i} />
        ))}
      </div> */}
      <UpperFooter/>
      <BottomFooter />
    </div>
  );
};

export default Footer;
