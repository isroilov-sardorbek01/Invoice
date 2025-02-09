import React, { useEffect, useState } from "react";
import btnImg from "../images/btnImg.svg";
import data from "../assets/data.json";
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
                <div className="flex flex-col justify-center gap-5 dark:text-white">
                    {voices.length > 0 ? (
                        voices.map((value, index) => {
                            return (
                                <div
                                    className="max-w-[1000px] p-[24px] lg:flex justify-between shadow-md rounded-[8px] cursor-pointer hover:shadow-xl transition-all"
                                    key={value.id}
                                >
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-[12px] font-bold">
                                            <span className="text-[#7E88C3]">
                                                #
                                            </span>
                                            {value.id}
                                        </h1>
                                        <h1 className="text-[#858BB2] text-[12px]">
                                            {value.clientName}
                                        </h1>
                                    </div>
                                    <div className="sm:flex xl:flex  sm:items-center sm:justify-between mt-[24px]">
                                        <div className="">
                                            <h1 className="text-[12px] text-[#888EB0] dark:text-[#DFE3FA]">
                                                {value.paymentDue}
                                            </h1>
                                            <h1 className="text-[16px] text-[#0C0E16] font-bold dark:text-white">
                                                £{value.total.toFixed(2)}
                                            </h1>
                                        </div>
                                        <div
                                            className={`flex items-center gap-[8px] py-[13px] px-[18px] rounded-[8px] ${
                                                value.status === "paid"
                                                    ? "bg-[#F3FCF9] dark:bg-[#1F2B3F]"
                                                    : value.status === "draft"
                                                    ? "bg-[#F3F3F5] dark:bg-[#292C44]"
                                                    : "bg-[#FFF8F0] dark:bg-[#292C44]"
                                            }`}
                                        >
                                            <div
                                                className={`w-[8px] h-[8px] rounded-full ${
                                                    value.status === "paid"
                                                        ? "bg-[#33D69F]"
                                                        : value.status ===
                                                          "draft"
                                                        ? "bg-[#373B53]"
                                                        : "bg-[#FF8F00]"
                                                }`}
                                            ></div>
                                            <h1
                                                className={
                                                    value.status === "paid"
                                                        ? "text-[#33D69F]"
                                                        : value.status ===
                                                          "draft"
                                                        ? "text-[#373B53]"
                                                        : "text-[#FF8F00]"
                                                }
                                            >
                                                {value.status}
                                            </h1>
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
