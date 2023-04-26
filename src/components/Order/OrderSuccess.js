import React, { useEffect, useState } from "react";
import CommonLayout from "../../Pages/CommonLayout";
import Footer from "../Footer/Footer";
import saveAs from "file-saver";
import axios from "axios";
import logo from "../../assets/images/KrishanLogo.png";
import { useLocation } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { getToken } from "../../localstorage";
import { toast } from "react-toastify";

const OrderSuccess = () => {
  const { state } = useLocation();
  const logintoken = getToken();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const createAndDownloadPdf = () => {
    if (logintoken) {
      axios
        .post(`${baseUrl}/api/v1/create/invoice`, state, {
          headers: {
            Authorization: `Bearer ${logintoken}`,
            "Content-type": "application/json;charset=UTF-8",
          },
        })
        .then(() =>
          axios.get(`${baseUrl}/api/v1/fetch/invoicepdf`, {
            headers: {
              Authorization: `Bearer ${logintoken}`,
              "Content-type": "application/json;charset=UTF-8",
            },
            responseType: "blob",
          })
        )
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: "application/pdf" });
          saveAs(pdfBlob, "invoice.pdf");
        })
        .catch((err) => {
          toast.error("Something Wrong");
        });
    }
  };

  return (
    <CommonLayout>
      <div className="md:ml-10 md:mt-5 border flex flex-col gap-y-6 items-center border-secondary rounded-lg p-4">
        <h1 className="text-center text-[1.4rem] font-bold text-secondary p-2 rounded-md mb-2">
          Order Success!!
        </h1>
        <FiCheckCircle className="text-[8rem] text-secondary" />
        <button
          className="text-[0.9rem] text-center px-[0.6rem] py-[0.4rem] bg-primaryColor text-bgColor rounded-lg transition-all duration-[0.3s]"
          onClick={createAndDownloadPdf}
        >
          Download Invoice
        </button>
      </div>
      <Footer />
    </CommonLayout>
  );
};

export default OrderSuccess;
