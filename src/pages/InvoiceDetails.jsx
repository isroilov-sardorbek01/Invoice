import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DataContext } from "../App";
import arrowImg from "../images/arowImg.svg";
import EditInvoice from "../components/EditInvoice";

function InvoiceDetails() {
    const { id } = useParams();
    const [voice, setVoice] = useState({});
    const [dis, setDis] = useState(false);
    const { api, setApi } = useContext(DataContext);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const value = api.find((prev) => prev.id === id);
        setVoice(value);
    }, []);

    console.log(voice);

    function handleOpenModal() {
        setDis(true);
    }
    function handleDel(id) {
        toast.info("Invoice deleted succesfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        const locData = JSON.parse(localStorage.getItem("data"));
        const filtered = locData.filter((prev) => prev.id !== id);
        setApi(filtered);
        localStorage.setItem("data", JSON.stringify(filtered));
        navigate("/");
    }
    function handleMarkUp(id) {
        const loc = JSON.parse(localStorage.getItem("data")) || [];
        const updatedData = loc.map((item) =>
            item.id === id ? { ...item, status: "paid" } : item
        );
        localStorage.setItem("data", JSON.stringify(updatedData));
        toast.info("Invoice marked for Paid!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setApi(updatedData);
        navigate("/");
    }

    return (
        <div className="relative">
            <div className="mx-auto max-w-[730px] w-[100%] pb-[56px]">
                <div className="px-[24px]">
                    <NavLink
                        to="/"
                        className="flex items-center justify-start gap-[23px] mt-[32px] hover:text-[#7E88C3] dark:hover:text-[#888EB0]"
                    >
                        <img src={arrowImg} width={9} height={5} alt="" />
                        <h1 className="text-[12px] font-bold  text-[#0C0E16] dark:text-white dark:hover:text-[#888EB0] transition-colors">
                            Go back
                        </h1>
                    </NavLink>
                    <div className="flex animate-slide-down items-center justify-between p-[24px] w-[100%] rounded-[8px] shadow-md mt-[32px] mb-[16px] dark:bg-[#1E2139]">
                        <div className="flex items-center justify-between md:gap-4 w-[100%] md:w-[30%]">
                            <h1>Status</h1>
                            <div
                                className={`
                                                    ${
                                                        voice.status == "paid"
                                                            ? "bg-[#F3FCF9] dark:bg-[#1F2B3F]"
                                                            : voice.status ==
                                                              "draft"
                                                            ? "bg-[#F3F3F5] dark:bg-[#292C44]"
                                                            : "bg-[#FFF8F0] dark:bg-[#2B2736]"
                                                    } flex items-center justify-center rounded-md gap-2 w-[104px] h-10`}
                            >
                                <div
                                    className={`w-2 h-2 rounded-full ${
                                        voice.status == "paid"
                                            ? "bg-[#33D69F]"
                                            : voice.status == "draft"
                                            ? "bg-[#FFF8F0]"
                                            : " bg-[#FF8F00] "
                                    }`}
                                ></div>
                                <h1
                                    className={`${
                                        voice.status == "paid"
                                            ? "text-[#33D69F]"
                                            : voice.status == "draft"
                                            ? "text-[#fff]"
                                            : "text-[#FF8F00]"
                                    } text-sm`}
                                >
                                    {voice.status}
                                </h1>
                            </div>
                        </div>
                        <div className="items-center hidden md:flex gap-[10px]">
                            <button
                                onClick={() => {
                                    setOpen(true);
                                }}
                                className="px-[23px] py-[17px] text-[12px] font-bold text-[#7E88C3] bg-[#F9FAFE] rounded-[26px] active:scale-90 transition-all dark:bg-[#252945] dark:text-[#DFE3FA] hover:bg-[#DFE3FA] dark:hover:bg-white dark:hover:text-[#7E88C3]"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleOpenModal}
                                className="px-[23px] py-[17px] text-[12px] font-bold text-white bg-[#EC5757] rounded-[26px] active:scale-90 transition-all hover:bg-[#FF9797]"
                            >
                                Delete
                            </button>
                            {voice.status === "pending" && (
                                <button
                                    onClick={() => {
                                        handleMarkUp(voice.id);
                                    }}
                                    className="hover:bg-[#9277FF] dark:hover:bg-[#9277FF] px-[27px] py-[17px] text-[12px] font-bold text-white bg-[#7C5DFA] rounded-[26px] active:scale-90 transition-all "
                                >
                                    Mark as Paid
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="p-[24px] animate-slide-down dark:bg-[#1E2139] shadow-md rounded-[8px] mt-[16px] mb-[56px]">
                        <div className="md:flex md:justify-between">
                            <div className="mb-[30px]">
                                <h1 className="font-bold sm:text-[14px] md:text-[16px] mb-[8px] text-black dark:text-white">
                                    <span className="text-[#7E88C3] dark:text-[#7E88C3] font-bold">
                                        #
                                    </span>
                                    {voice.id}
                                </h1>
                                <h1 className="text-[14px] text-[#7E88C3] dark:text-[#DFE3FA]">
                                    {voice.description}
                                </h1>
                            </div>
                            {voice.senderAddress && (
                                <div className="text-[11px] text-[#7E88C3] dark:text-[#DFE3FA] mb-[31px]">
                                    <h1>{voice.senderAddress.street}</h1>
                                    <h1>{voice.senderAddress.city}</h1>
                                    <h1>{voice.senderAddress.postCode}</h1>
                                    <h1>{voice.senderAddress.country}</h1>
                                </div>
                            )}
                        </div>
                        <div className="md:flex md:items-center md:justify-between">
                            <div className="flex justify-between gap-[120px]">
                                <div className="">
                                    <div className="">
                                        <h1 className="text-[12px] text-[#7E88C3] dark:text-[#DFE3FA] mb-[12px]">
                                            Invoice Date
                                        </h1>
                                        <h1 className="text-[#0C0E16] text-[15px] font-bold mb-[32px] dark:text-white">
                                            {voice.createdAt}
                                        </h1>
                                    </div>
                                    <div className="">
                                        <h1 className="text-[12px] text-[#7E88C3] mb-[12px] dark:text-[#DFE3FA]">
                                            Payment Due
                                        </h1>
                                        <h1 className="text-[#0C0E16] text-[15px] font-bold mb-[36px] dark:text-white">
                                            {voice.paymentDue}
                                        </h1>
                                    </div>
                                </div>
                                <div className="">
                                    <h1 className="text-[12px] text-[#7E88C3] dark:text-[#DFE3FA] mb-[12px]">
                                        Bill to
                                    </h1>
                                    <h1 className="text-[15px] font-bold mb-[8px] dark:text-white">
                                        {voice.clientName}
                                    </h1>
                                    {voice.clientAddress && (
                                        <div className="text-[11px] text-[#7E88C3] dark:text-[#DFE3FA] mb-[31px]">
                                            <h1>
                                                {voice.clientAddress.street}
                                            </h1>
                                            <h1>{voice.clientAddress.city}</h1>
                                            <h1>
                                                {voice.clientAddress.postCode}
                                            </h1>
                                            <h1>
                                                {voice.clientAddress.country}
                                            </h1>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="">
                                <h1 className="text-[11px] text-[#7E88C3] dark:text-[#DFE3FA] mb-[12px">
                                    Sent to
                                </h1>
                                <h1 className="text-[#0C0E16] text-[15px] font-bold mb-[40px] dark:text-white">
                                    {voice.clientEmail
                                        ? voice.clientEmail
                                        : "No email !"}
                                </h1>
                            </div>
                        </div>
                        <div className="p-[24px] bg-[#F9FAFE] rounded-tl-[8px] rounded-tr-[8px] dark:bg-[#252945]">
                            {voice.items &&
                                voice.items.map((value, index) => {
                                    return (
                                        <div
                                            className="flex flex-col gap-[24px]"
                                            key={index}
                                        >
                                            <div className="flex items-center justify-between pb-[12px]">
                                                <div className="">
                                                    <h1 className="text-[12px] font-bold dark:text-white text-[#0C0E16]">
                                                        {value.name}
                                                    </h1>
                                                    <h1 className="text-[12px] text-[#7E88C3] font-bold dark:text-[#888EB0]">
                                                        {value.quantity}x
                                                        {value.price.toFixed(2)}
                                                    </h1>
                                                </div>
                                                <h1 className="text-[12px] font-bold dark:text-white text-[#0C0E16]">
                                                    £{value.total.toFixed(2)}
                                                </h1>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="p-[24px] dark:bg-[#0C0E16] bg-[#373B53] rounded-br-[8px] rounded-bl-[8px] flex items-center justify-between">
                            <h1 className="text-[11px] text-white ">
                                Grand Total
                            </h1>
                            <h1 className="text-[20px] text-white font-bold">
                                £{voice.total?.toFixed(2)}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-[780px] fixed bottom-0 w-[100%] mx-auto py-[21px] px-[24px] h-[91px] md:mb-[40px] shadow-lg  dark:bg-[#1E2139] bg-white md:hidden ">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => {
                            setOpen(true);
                        }}
                        className="px-[23px] py-[17px] text-[12px] font-bold text-[#7E88C3] bg-[#F9FAFE] rounded-[26px] active:scale-90 transition-all dark:bg-[#252945] dark:text-[#DFE3FA] hover:bg-[#DFE3FA] dark:hover:bg-white dark:hover:text-[#7E88C3]"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleOpenModal}
                        className="px-[23px] py-[17px] text-[12px] font-bold text-white bg-[#EC5757] rounded-[26px] active:scale-90 transition-all hover:bg-[#FF9797]"
                    >
                        Delete
                    </button>
                    {voice.status === "pending" && (
                        <button
                            onClick={() => {
                                handleMarkUp(voice.id);
                            }}
                            className="hover:bg-[#9277FF] dark:hover:bg-[#9277FF] px-[27px] py-[17px] text-[12px] font-bold text-white bg-[#7C5DFA] rounded-[26px] active:scale-90 transition-all "
                        >
                            Mark as Paid
                        </button>
                    )}
                </div>
            </div>
            {dis === true && (
                <div className="fixed inset-0 flex items-center justify-center px-3 transition-opacity bg-black bg-opacity-50 ">
                    <div
                        className="max-w-[480px] w-full bg-white dark:bg-[#1E2139] p-6 rounded-lg shadow-lg animate-slide-down"
                        id="animatedModal"
                    >
                        <h1 className="mt-[48px] text-[#0C0E16] text-[24px] font-bold mb-[13px] dark:text-white">
                            Confirm Deletion
                        </h1>
                        <p className="text-[12px] text-[#888EB0] dark:text-[#888EB0]">
                            Are you sure you want to delete invoice #XM9141?
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-2 mt-[16px] mb:mb-[48px] mb-[32px] ">
                            <button
                                onClick={() => {
                                    setDis(false);
                                }}
                                className="px-[23px] py-[17px] text-[12px] font-bold text-[#7E88C3] bg-[#F9FAFE] rounded-[26px] active:scale-90 transition-all dark:bg-[#252945] dar:text-[#DFE3FA]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleDel(voice.id);
                                }}
                                className="px-[23px] py-[17px] text-[12px] font-bold text-white bg-[#EC5757] rounded-[26px] active:scale-90 transition-all "
                            >
                                Delete
                            </button>
                        </div>
                    </div>jjhhggyg
                </div>
            )}
            {open && (
                <EditInvoice
                    id={id}
                    open={open}
                    onClose={() => {
                        setOpen(false);
                    }}
                ></EditInvoice>
            )}
        </div>
    );
}

export default InvoiceDetails;
