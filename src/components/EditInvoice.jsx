import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import imgArr from "../images/arowImg.svg";
import delIcon from "../images/delIcon.svg";
import { Key } from "lucide-react";

function EditInvoice({ id, onClose }) {
    const [defInvoice, setDefInvoice] = useState({});
    const { api, setApi } = useContext(DataContext);
    const [isClosing, setIsClosing] = useState(false);
    console.log(id);

    useEffect(() => {
        const prevInvo = api.find((prev) => prev.id == id);
        setDefInvoice(prevInvo);
    }, []);
    console.log(defInvoice);

    function handleClose() {
        setIsClosing(true);
        setTimeout(onClose, 100);
    }
    function handleChange() {}
    return (
        <div
            className={`fixed top-0  left-0 z-30 bg-black bg-opacity-50 w-[100%] ${
                !isClosing ? "animate-slideInLeft" : "animate-slideInRight"
            }`}
        >
            <div className="dark:text-black scrollbar-hide flex flex-col  opacity-1 dark:bg-[#141625] bg-white md:pl-[150px] py-16 px-6 h-screen md:w-[768px] md:rounded-r-3xl">
                <div
                    onClick={handleClose}
                    className="flex items-center justify-start pb-[24px] cursor-pointer gap-[23px] mt-[32px] hover:text-[#7E88C3] dark:hover:text-[#888EB0]"
                >
                    <img src={imgArr} width={9} height={5} alt="" />
                    <h1 className="text-[12px] font-bold  text-[#0C0E16] dark:text-white dark:hover:text-[#888EB0] transition-colors">
                        Go back
                    </h1>
                </div>
                <h1 className="text-[#0C0E16] text-[24px] font-bold dark:text-white">
                    New Invoice
                </h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                    className="overflow-y-scroll scrollbar-hide my-14"
                >
                    <h1 className="text-[#7c5dfa] mb-[24px] font-bold text-[12px]">
                        Bill From
                    </h1>
                    <div className="grid grid-cols-3 gap-4">
                        <h1 className="text-[12px] font-medium text-[#7E88C3] mb-[10px]">
                            Street Adress
                        </h1>
                        {defInvoice.senderAddress &&
                            defInvoice?.senderAddress?.map((value, index) => {
                                console.log(value.status);
                                
                                return (
                                    <React.Fragment key={index}>
                                        <input
                                            name={`senderStreet-${index}`}
                                            value={value.street}
                                            onChange={(e) =>
                                                handleChange(e, index, "street")
                                            }
                                            placeholder="Street Address"
                                            className="col-span-3 py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                                        />
                                        <input
                                            name={`senderCity-${index}`}
                                            value={value.city}
                                            onChange={(e) =>
                                                handleChange(e, index, "city")
                                            }
                                            placeholder="City"
                                            className="py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                                        />
                                        <input
                                            name={`senderPostCode-${index}`}
                                            value={value.postCode}
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    index,
                                                    "postCode"
                                                )
                                            }
                                            placeholder="Post Code"
                                            className="py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                                        />
                                        <input
                                            name={`senderCountry-${index}`}
                                            value={value.country} // Xato tuzatildi
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    index,
                                                    "country"
                                                )
                                            }
                                            placeholder="Country"
                                            className="py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                                        />
                                    </React.Fragment>
                                );
                            })}
                    </div>
                    <h1 className="text-[#7c5dfa] text-[12px] font-bold my-4 mt-10">
                        Bill To
                    </h1>
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            name="clientName"
                            value={defInvoice?.clientName}
                            onChange={handleChange}
                            placeholder="Client Name"
                            className="col-span-3 py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                        />
                        <input
                            name="clientEmail"
                            value={defInvoice?.clientEmail}
                            onChange={handleChange}
                            placeholder="Client Email"
                            className="col-span-3 py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                        />
                        <input
                            name="clientStreet"
                            value={defInvoice?.clientStreet}
                            onChange={handleChange}
                            placeholder="Street Address"
                            className="col-span-3 py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                        />
                        <input
                            name="clientCity"
                            value={defInvoice?.clientCity}
                            onChange={handleChange}
                            placeholder="City"
                            className="py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                        />
                        <input
                            name="clientPostCode"
                            value={defInvoice?.clientPostCode}
                            onChange={handleChange}
                            placeholder="Post Code"
                            className="py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                        />
                        <input
                            name="clientCountry"
                            value={defInvoice?.clientCountry}
                            onChange={handleChange}
                            placeholder="Country"
                            className="py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <input
                            type="date"
                            name="invoiceDate"
                            value={defInvoice?.invoiceDate}
                            onChange={handleChange}
                            className="py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                        />
                        <select
                            name="paymentTerms"
                            value={defInvoice?.paymentTerms}
                            onChange={handleChange}
                            className="py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                        >
                            <option value="1">Next 1 day</option>
                            <option value="7">Next 7 days</option>
                            <option value="14">Next 14 days</option>
                            <option value="30">Next 30 days</option>
                        </select>
                    </div>
                    <input
                        name="description"
                        value={defInvoice?.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="mt-4 py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white w-full"
                    />
                    <h2 className="mt-10 text-2xl text-gray-500">Item List</h2>
                    {defInvoice?.items &&
                        defInvoice.items.map((value, index) => {
                            console.log(value);

                            return (
                                <div
                                    className="flex flex-col w-full gap-2"
                                    key={index}
                                >
                                    <div className="flex flex-col w-full">
                                        <label
                                            className="text-[12px] text-[#777F98] mt-[24px] mb-[8px]"
                                            htmlFor="item"
                                        >
                                            Item Name
                                        </label>
                                        <input
                                            type="text"
                                            value={value.name}
                                            // onChange={(e) =>
                                            //     handleItemChange(
                                            //         value.id,
                                            //         "name",
                                            //         e.target.value
                                            //     )
                                            // }
                                            className="border-[2px] border-[#DFE3FA] rounded-[4px] px-[12px] py-[8px] text-[12px] font-bold text-[#0C0E16] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] dark:text-white dark:border-[#252945] w-full number"
                                            placeholder="Item Name"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between w-full gap-4 dark:text-white">
                                        <div className="flex flex-col w-[80px]">
                                            <label
                                                className="text-[12px] mb-[8px]"
                                                htmlFor="qty"
                                            >
                                                Qty.
                                            </label>
                                            <input
                                                type="number"
                                                value={value.quantity}
                                                // onChange={(e) =>
                                                //     handleItemChange(
                                                //         value.id,
                                                //         "qty",
                                                //         Number(e.target.value)
                                                //     )
                                                // }
                                                className="border-[2px] border-[#DFE3FA] rounded-[4px] px-[12px] py-[8px] text-[12px] font-bold text-[#0C0E16] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] dark:text-white dark:border-[#252945] w-full number"
                                            />
                                        </div>
                                        <div className="flex flex-col w-[100px]">
                                            <label
                                                className="text-[12px] mb-[8px]"
                                                htmlFor="price"
                                            >
                                                Price
                                            </label>
                                            <input
                                                type="number"
                                                value={value.price}
                                                // onChange={(e) =>
                                                //     handleItemChange(
                                                //         value.id,
                                                //         "price",
                                                //         Number(e.target.value)
                                                //     )
                                                // }
                                                className="border-[2px] border-[#DFE3FA] rounded-[4px] px-[12px] py-[8px] text-[12px] font-bold text-[#0C0E16] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] dark:text-white dark:border-[#252945] w-full number"
                                            />
                                        </div>
                                        <div className="w-[80px] text-center">
                                            <label className="text-[12px] mb-[8px]">
                                                Total
                                            </label>
                                            <p className="font-bold">
                                                {value.total}
                                            </p>
                                        </div>
                                        <div>
                                            <img
                                                onClick={() =>
                                                    handleDeleteItem(value.id)
                                                }
                                                className="cursor-pointer hover:grayscale-0 grayscale-[100%] transition-all"
                                                src={delIcon}
                                                alt="Delete"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    ;
                    <button
                        // onClick={addItem}
                        className="w-full py-[17px] px-[30px] mt-6 bg-[#F9FAFE] dark:bg-[#252945] dark:text-[#888EB0] hover:opacity-80 rounded-[24px] text-[12px] text-[#7E88C3]"
                    >
                        + Add New Item
                    </button>
                </form>
                <div className="flex justify-between">
                    <button
                        onClick={handleClose}
                        className="px-[17px] py-[17px] text-[#7E88C3] text-[12px] font-bold"
                    >
                        Discard
                    </button>
                    <div className="flex gap-[7px]">
                        <button className="text-[#888EB0] font-bold text-[12px] px-[15px] py-[17px] bg-[#373B53] rounded-[24px]">
                            Save as Draft
                        </button>
                        <button
                            // onClick={handleSend}
                            className="text-white font-bold truncate hover:opacity-80 p-[16px] text-[12px] bg-[#7c5dfa] rounded-full"
                        >
                            Save & Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditInvoice;
