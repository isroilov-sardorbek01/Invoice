import React, { useEffect, useState } from "react";
import data from "../assets/data.json";
import btnImg from "../images/btnImg.svg";
import novicesImg from "../images/novicesImg.svg";

function Invoices() {
    const [num, setNum] = useState(data.length);
    const [sel, setSel] = useState("All");
    const [voices, setVoices] = useState(data);

    useEffect(() => {
        if (sel === "All") {
            setVoices(data);
        } else {
            setVoices(data.filter((prev) => prev.status === sel));
        }
    }, [sel]);
    return (
        <div>
            <div className="xl:mt-[32px] xl:max-w-[1000px] xl:w-[100%] mx-auto p-[24px] dark:bg-[#141625]">
                <div className="flex items-center mt-[32px] mb-[32px] justify-between w-[100%]">
                    <div className="">
                        <h1 className="sm:text-[20xp] md:text-[32px] dark:text-white font-bold text-[#0C0E16]">
                            Invoices
                        </h1>
                        <h1 className="sm:text-[12px] md:text dark:text-[#DFE3FA] text-[#888EB0]">
                            {num} invoices
                        </h1>
                    </div>
                    <div className="flex gap-[18px]">
                        <select
                            value={sel}
                            onChange={(e) => {
                                setSel(e.target.value);
                            }}
                            className="sm:text-[12px] text-[#0C0E16] cursor-pointer dark:bg-[#141625] dark:text-white"
                        >
                            <option value="All">All</option>
                            <option value="draft">Draft</option>
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="">s</option>
                        </select>
                        <div className="sm:max-w-[120px] w-[100%] rounded-[24px] bg-[#7C5DFA] p-[6px] flex items-center gap-3 text-white active:scale-90 transition-all cursor-pointer">
                            <img src={btnImg} alt="img" />
                            <h1 className="text-[12px] font-bold pr-[14px]">
                                New
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center gap-2 dark:text-white">
                    {voices.length > 0 ? (
                        voices.map((value, index) => {
                            return (
                                <div
                                    className="px-4 sm:px-6 mt-4 flex flex-col gap-[16px]"
                                    key={value.id}
                                >
                                    <div
                                        className="daerk:text-white shadow-md hover:shadow-xl dark:bg-[#1E2139] text-black drop-shadow-md bg-whitea
                                         sm:w-full rounded-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer hover:drop-shadow-lg transition-all"
                                    >
                                        <div className="flex items-center justify-between w-full sm:justify-start sm:gap-8 sm:w-auto">
                                            <h2 className="text-sm font-extrabold dark:text-white">
                                                <span className="text-[#7E88C3]">
                                                    #
                                                </span>
                                                {value.id}
                                            </h2>
                                            <h2 className="sm:block dark:text-white">
                                                {value.clientName}
                                            </h2>
                                        </div>
                                        <div className="flex justify-between w-full sm:w-auto sm:justify-start sm:gap-8">
                                            <div className="md:flex md:items-center md:gap-[73px]">
                                                <p className=" text-[#888EB0] dark:text-[#DFE3FA] text-xs  xl:flex">
                                                    {value.paymentDue}
                                                </p>
                                                <h2 className="text-lg font-bold text-[#0C0E16] dark:text-white">
                                                    £{value.total.toFixed(2)}
                                                </h2>
                                            </div>
                                            <div
                                                className={`
                                                    ${
                                                        value.status == "paid"
                                                            ? "bg-[#F3FCF9] dark:bg-[#1F2B3F]"
                                                            : value.status ==
                                                              "draft"
                                                            ? "bg-[#F3F3F5] dark:bg-[#292C44]"
                                                            : "bg-[#FFF8F0] dark:bg-[#2B2736]"
                                                    } flex items-center justify-center rounded-md gap-2 w-[104px] h-10`}
                                            >
                                                <div
                                                    className={`w-2 h-2 rounded-full ${
                                                        value.status == "paid"
                                                            ? "bg-[#33D69F]"
                                                            : value.status ==
                                                              "draft"
                                                            ? "bg-[#FFF8F0]"
                                                            : " bg-[#FF8F00] "
                                                    }`}
                                                ></div>
                                                <h2
                                                    className={`${
                                                        value.status == "paid"
                                                            ? "text-[#33D69F]"
                                                            : value.status ==
                                                              "draft"
                                                            ? "text-[#fff]"
                                                            : "text-[#FF8F00]"
                                                    } text-sm`}
                                                >
                                                    {value.status}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="">
                            <img
                                src={novicesImg}
                                className="max-w-[241px] w-[100%] max-h-[200px] h-[100%] flex justify-center"
                                alt=""
                            />
                            <h1>There is nothing here</h1>
                            <p>
                                Create an invoice by clicking the
                                <span>New</span> button and get started
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Invoices;
