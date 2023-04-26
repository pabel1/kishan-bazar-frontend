import React, { useContext } from "react";
import { GiMoneyStack, GiPayMoney, GiTakeMyMoney } from "react-icons/gi";
import { OrderContext } from "../../context";
import Card from "./Card";

const Cards = () => {
  const { orderState } = useContext(OrderContext);
  const totalSale = orderState?.reduce((acc, item, index) => {
    return acc + item.paymentInfo.total;
  }, 0);
  const dashboardCardsData = [
    {
      title: "Sales",
      color: {
        backGround: "rgba(0, 163, 77, 1)",
        boxShadow: "0 1rem 2rem 0 rgba(0, 163, 77, 0.3)",
      },
      barValue: 80,
      value: totalSale,
      icon: GiMoneyStack,
      series: [{ name: "Sales", data: [31, 40, 50, 51, 42, 109, 100] }],
    },
    {
      title: "Revenue",
      color: {
        backGround: "rgba(0, 163, 77, 1)",
        boxShadow: "0 1rem 2rem 0 rgba(0, 163, 77,0.3)",
      },
      barValue: 70,
      value: "30,250",
      icon: GiTakeMyMoney,
      series: [{ name: "Sales", data: [31, 40, 50, 51, 42, 109, 100] }],
    },
    {
      title: "Expense",
      color: {
        backGround: "rgba(0, 163, 77, 1)",
        boxShadow: "0 1rem 2rem 0 rgba(0, 163, 77, 0.3)",
      },
      barValue: 60,
      value: "10,200",
      icon: GiPayMoney,
      series: [{ name: "Sales", data: [31, 40, 50, 51, 42, 109, 100] }],
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-4 ">
      {dashboardCardsData &&
        dashboardCardsData.map((card, index) => (
          <div className="flex justify-center md:justify-evenly" key={index}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              icon={card.icon}
              series={card.series}
            />
          </div>
        ))}
    </div>
  );
};

export default Cards;
