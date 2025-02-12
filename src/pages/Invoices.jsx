import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import data from "../assets/data.json";
import AddInvoice from "../components/AddInvoice";
import btnImg from "../images/btnImg.svg";
import novicesImg from "../images/novicesImg.svg";

export function Invoices() {
    const [sel, setSel] = useState("All");
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { api, setApi } = useContext(DataContext);
    useEffect(() => {
        if (!localStorage.getItem("theme")) {
            localStorage.setItem("theme", "light");
        }

        !JSON.parse(localStorage.getItem("data"))
            ? localStorage.setItem("data", JSON.stringify(data))
            : JSON.parse(localStorage.getItem("data"));
    }, []);
    useEffect(() => {
        const info = JSON.parse(localStorage.getItem("data"));
        if (sel === "All") {
            setApi(info);
        } else {
            setApi(info.filter((prev) => prev.status === sel));
        }
    }, [sel]);

    function handleNav(id) {
        navigate(`/details/${id}`);
    }

    return (
        <div className="relative">
            <div className="xl:mt-[32px] max-w-[800px] xl:w-[100%] mx-auto p-[24px] dark:bg-[#141625] z-1">
                <div className="flex items-center mt-[32px] mb-[32px] justify-between w-[100%]">
                    <div className="">
                        <h1 className="sm:text-[20xp] md:text-[32px] dark:text-white font-bold text-[#0C0E16]">
                            Invoices
                        </h1>
                        <h1 className="sm:text-[12px] md:text dark:text-[#DFE3FA] text-[#888EB0]">
                            {api?.length ? api.length : "0"} invoices
                        </h1>
                    </div>
                    <div className="flex gap-[18px]">
                        <select
                            value={sel}
                            onChange={(e) => {
                                setSel(e.target.value);
                            }}
                            className="text-[12px] font-bold text-[#0C0E16] cursor-pointer dark:bg-[#141625] dark:text-white outline-none"
                        >
                            <option value="All">All</option>
                            <option value="draft">Draft</option>
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="">Error</option>
                        </select>
                        <div
                            onClick={() => {
                                setOpen(true);
                            }}
                            className="sm:max-w-[120px] w-[100%] rounded-[24px] bg-[#7C5DFA] p-[6px] flex items-center gap-3 text-white active:scale-90 transition-all cursor-pointer"
                        >
                            <img src={btnImg} alt="img" />
                            <h1 className="text-[12px] font-bold pr-[14px]">
                                New
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="flex flex-col justify-center gap-2 dark:text-white mb-[40px]">
                        {api.length > 0 ? (
                            api.map((value, index) => {
                                return (
                                    <div
                                        onClick={() => {
                                            handleNav(value.id);
                                        }}
                                        className="animate-slide-down px-4 sm:px-6 mt-4 flex flex-col justify-center gap-[16px]"
                                        key={value.id}
                                    >
                                        <div
                                            className="dark:text-white shadow-md lg:hover:shadow-xl dark:bg-[#1E2139] text-black bg-white
                                         sm:w-full rounded-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer transition-all"
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
                                                        £{value.total}
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
                                                            value.status ==
                                                            "paid"
                                                                ? "bg-[#33D69F]"
                                                                : value.status ==
                                                                  "draft"
                                                                ? "bg-[#FFF8F0]"
                                                                : " bg-[#FF8F00] "
                                                        }`}
                                                    ></div>
                                                    <h2
                                                        className={`${
                                                            value.status ==
                                                            "paid"
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
                            <div className="flex flex-col items-center justify-center text-center mt-[102px]">
                                <img
                                    src={novicesImg}
                                    className="mb-[40px] md:mb-[64px] animate-slide-down max-w-[241px] w-[100%] max-h-[200px] h-[100%] "
                                    alt=""
                                />
                                <h1 className="text-[20px] text-[#0C0E16] mb-[24px] font-bold animate-slide-down dark:text-white">
                                    There is nothing here
                                </h1>
                                <p className="text-[#888EB0] text-[12px] animate-slide-down dark:text-[#DFE3FA]">
                                    Create an invoice by clicking the <br />
                                    <span className="font-bold"> New</span>{" "}
                                    button and get started
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {open && (
                <AddInvoice
                    open={open}
                    onClose={() => {
                        setOpen(false);
                    }}
                ></AddInvoice>
            )}
        </div>
    );
}

export default Invoices;
