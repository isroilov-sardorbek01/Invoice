import React, { useState } from "react";
import btnImg from "../images/btnImg.svg";

function Invoices() {
    const [num, setNum] = useState(7);
    return (
        <div>
            <div className="sm:max-w-[600px] sm:w-[100%] sm:mx-auto p-[24px]">
                <div className="sm:mt-[32px] flex items-center justify-between">
                    <div className="">
                        <h1 className="sm:text-[20xp]  font-bold text-[#0C0E16]">Invoices</h1>
                        <h1 className="sm:text-[12px] text-[#888EB0]">{num} invoices</h1>
                    </div>
                    <div className="flex gap-[18px]">
                        <select className="sm:text-[12px] text-[#0C0E16] cursor-pointer">
                            <option value="All">All</option>
                            <option value="Draft">Draft</option>
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                        </select>
                        <div className="sm:max-w-[120px] w-[100%] rounded-[24px] bg-[#7C5DFA] p-[6px] flex items-center gap-3 text-white active:scale-90 transition-all cursor-pointer">
                            <img src={btnImg} alt="img" />
                            <h1 className="text-[12px] font-bold pr-[14px]">New</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Invoices;
