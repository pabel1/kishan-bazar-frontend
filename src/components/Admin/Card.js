import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AnimateSharedLayout, motion } from "framer-motion";
import Chart from "react-apexcharts";
import { IoMdClose } from "react-icons/io";
const Card = (props) => {
  const [expand, setExpand] = useState(false);
  return (
    <>
      <AnimateSharedLayout>
        {expand ? (
          <ExpandedCard params={props} setExpand={() => setExpand(false)} />
        ) : (
          <CompactCard params={props} setExpand={() => setExpand(true)} />
        )}
      </AnimateSharedLayout>
    </>
  );
};
export default Card;

const ExpandedCard = ({ params, setExpand }) => {
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },
      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },

      fill: {
        colors: ["#00A34D"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#00A34D"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
    },
  };

  return (
    <>
      <motion.div
        className="absolute w-full h-[60vh] sm:h-[60vh] md:h-[70vh] lg:h-[90vh] z-[10] top-0 left-0 right-0 rounded-lg flex flex-col items-center justify-between p-[1rem]"
        style={{
          border: params.color.backGround,
          background : "#ffffff",
          boxShadow: params.color.boxShadow,
        }}
        layoutId="expandableCard"
      >
        <div className="text-secondary text-[2rem] self-end" onClick={setExpand}>
          <IoMdClose />
        </div>
        <span>{params.title}</span>
        <div className="chartContainer">
          <Chart series={params.series} type="area" options={data.options} />
        </div>
        <span>Last Month</span>
      </motion.div>
    </>
  );
};

const CompactCard = ({ params, setExpand }) => {
  const Icon = params.icon;
  return (
    <>
      <motion.div
        className="w-full sm:w-[90%] md:w-full lg:w-[14rem] xl:w-[18rem] h-[8rem] flex justify-between items-center p-6 rounded-lg cursor-pointer transition-all duration-[0.3s] hover:shadow-none"
        style={{
          boxShadow: params.color.boxShadow,
        }}
        onClick={setExpand}
        layoutId="expandableCard"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <CircularProgressbar
            value={params.barValue}
            text={`${params.barValue}%`}
          />
          <span className="text-[1rem] font-semibold">{params.title}</span>
        </div>
        <div className="flex flex-col justify-between gap-1">
          <Icon className="text-[2.5rem] text-secondary" />
          <span className="text-[1.4rem] font-semibold text-secondary">
            {params.value} &#2547;
          </span>
          <span className="text-[0.9rem] font-medium">Last Month</span>
        </div>
      </motion.div>
    </>
  );
};
