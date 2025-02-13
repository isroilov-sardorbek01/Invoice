import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import imgArr from "../images/arowImg.svg";
import delIcon from "../images/delIcon.svg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EditInvoice({ id, onClose }) {
    const [defInvoice, setDefInvoice] = useState({});
    const { api, setApi } = useContext(DataContext);
    const [isClosing, setIsClosing] = useState(false);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const prevInvo = api.find((prev) => prev.id === id);
        if (prevInvo) {
            setDefInvoice(prevInvo);
            setItems(prevInvo.items || []);
            setFormData({
                senderStreet: prevInvo.senderAddress?.street || "",
                senderCity: prevInvo.senderAddress?.city || "",
                senderPostCode: prevInvo.senderAddress?.postCode || "",
                senderCountry: prevInvo.senderAddress?.country || "",
                clientName: prevInvo.clientName || "",
                clientEmail: prevInvo.clientEmail || "",
                clientStreet: prevInvo.clientAddress?.street || "",
                clientCity: prevInvo.clientAddress?.city || "",
                clientPostCode: prevInvo.clientAddress?.postCode || "",
                clientCountry: prevInvo.clientAddress?.country || "",
                invoiceDate: prevInvo.createdAt || "",
                paymentTerms: prevInvo.paymentTerms?.toString() || "1",
                description: prevInvo.description || "",
            });
        }
    }, [api, id]);

    const [formData, setFormData] = useState({
        senderStreet: "",
        senderCity: "",
        senderPostCode: "",
        senderCountry: "",
        clientName: "",
        clientEmail: "",
        clientStreet: "",
        clientCity: "",
        clientPostCode: "",
        clientCountry: "",
        invoiceDate: "",
        paymentTerms: "1",
        description: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleItemChange = (itemId, field, value) => {
        setItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === itemId) {
                    const updatedItem = { ...item, [field]: value };
                    if (field === "quantity" || field === "price") {
                        updatedItem.total =
                            updatedItem.quantity * updatedItem.price;
                    }
                    return updatedItem;
                }
                return item;
            })
        );
    };
    function validate() {
        if (formData?.senderStreet.length <= 7) {
            toast.info("Street Address 10ta belgidan kam!");
            return false;
        }
        if (formData?.senderCity.length < 4) {
            toast.info("City Address 4ta belgidan kam!");
            return false;
        }
        if (formData?.senderPostCode.length < 6) {
            toast.info("Post Code 6ta belgidan kam!");
            return false;
        }
        if (formData?.senderCountry.length <= 2) {
            toast.info("Country 2ta belgidan kam!");
            return false;
        }
        if (formData?.clientName.length <= 2) {
            toast.info("Client Name 3ta belgidan kam!");
            return false;
        }
        if (formData?.clientEmail.length < 11) {
            toast.info("Client Email 11ta belgidan kam!");
            return false;
        }
        if (formData?.clientStreet.length <= 10) {
            toast.info("Street Address 10ta belgidan kam!");
            return false;
        }
        if (formData?.clientCity.length <= 3) {
            toast.info("City 3ta belgidan kam!");
            return false;
        }
        if (formData?.clientPostCode.length < 6) {
            toast.info("Post Code 6ta belgidan kam!");
            return false;
        }
        if (formData?.clientCountry.length < 2) {
            toast.info("Country 6ta belgidan kam!");
            return false;
        }
        if (formData?.clientPostCode.length < 6) {
            toast.info("Post Code 6ta belgidan kam!");
            return false;
        }
        if (formData?.description.length < 8) {
            toast.info("Description 15ta belgidan kam!");
            return false;
        }
        return true;
    }

    const handleDeleteItem = (itemId) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const addItem = () => {
        const newItem = {
            id: Date.now().toString(),
            name: "",
            quantity: 1,
            price: 0,
            total: 0,
        };
        setItems((prevItems) => [...prevItems, newItem]);
    };

    function handleClose() {
        setIsClosing(true);
        setTimeout(onClose, 100);
    }

    function handleEdit() {
        const updatedInvoice = {
            ...defInvoice,
            createdAt: formData.invoiceDate,
            paymentTerms: parseInt(formData.paymentTerms),
            description: formData.description,
            clientName: formData.clientName,
            clientEmail: formData.clientEmail,
            status: "pending",
            senderAddress: {
                street: formData.senderStreet,
                city: formData.senderCity,
                postCode: formData.senderPostCode,
                country: formData.senderCountry,
            },
            clientAddress: {
                street: formData.clientStreet,
                city: formData.clientCity,
                postCode: formData.clientPostCode,
                country: formData.clientCountry,
            },
            items: items,
            total: items.reduce((sum, item) => sum + (item.total || 0), 0),
        };

        const updatedApi = api.map((invoice) =>
            invoice.id === id ? updatedInvoice : invoice
        );

        setApi(updatedApi);
        localStorage.setItem("data", JSON.stringify(updatedApi));
        handleClose();
    }

    function handleSend() {
        const isValid = validate();
        if (!isValid) {
            return;
        }
        const updatedInvoice = {
            ...defInvoice,
            createdAt: formData.invoiceDate,
            paymentTerms: parseInt(formData.paymentTerms),
            description: formData.description,
            clientName: formData.clientName,
            clientEmail: formData.clientEmail,
            status: "pending",
            senderAddress: {
                street: formData.senderStreet,
                city: formData.senderCity,
                postCode: formData.senderPostCode,
                country: formData.senderCountry,
            },
            clientAddress: {
                street: formData.clientStreet,
                city: formData.clientCity,
                postCode: formData.clientPostCode,
                country: formData.clientCountry,
            },
            items: items,
            total: items.reduce((sum, item) => sum + (item.total || 0), 0),
        };

        const updatedApi = api.map((invoice) =>
            invoice.id === id
                ? { ...updatedInvoice, status: "pending" }
                : invoice
        );

        setApi(updatedApi);
        localStorage.setItem("data", JSON.stringify(updatedApi));
        navigate("/");
    }

    return (
        <div
            className={`fixed top-0 left-0 z-30 bg-black bg-opacity-50 w-[100%] ${
                !isClosing ? "animate-slideInLeft" : "animate-slideOutRight"
            }`}
        >
            <div className="dark:text-black scrollbar-hide flex flex-col opacity-1 dark:bg-[#141625] bg-white md:pl-[150px] py-16 px-6 h-screen md:w-[768px] md:rounded-r-3xl">
                <div
                    onClick={handleClose}
                    className="flex items-center justify-start pb-[24px] cursor-pointer gap-[23px] mt-[32px] hover:text-[#7E88C3] dark:hover:text-[#888EB0]"
                >
                    <img src={imgArr} width={9} height={5} alt="" />
                    <h1 className="text-[12px] font-bold text-[#0C0E16] dark:text-white dark:hover:text-[#888EB0] transition-colors">
                        Go back
                    </h1>
                </div>
                <h1 className="text-[#0C0E16] text-[24px] font-bold dark:text-white">
                    Edit #{defInvoice?.id}
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
                            Street Address
                        </h1>
                        <input
                            name="senderStreet"
                            value={formData.senderStreet}
                            onChange={handleChange}
                            placeholder="Street Address"
                            className="col-span-3 py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                        />
                        <input
                            name="senderCity"
                            value={formData.senderCity}
                            onChange={handleChange}
                            placeholder="City"
                            className="py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                        />
                        <input
                            name="senderPostCode"
                            value={formData.senderPostCode}
                            onChange={handleChange}
                            placeholder="Post Code"
                            className="py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                        />
                        <input
                            name="senderCountry"
                            value={formData.senderCountry}
                            onChange={handleChange}
                            placeholder="Country"
                            className="py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                        />
                    </div>

                    <h1 className="text-[#7c5dfa] text-[12px] font-bold my-4 mt-10">
                        Bill To
                    </h1>
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleChange}
                            placeholder="Client Name"
                            className="col-span-3 py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                        />
                        <input
                            name="clientEmail"
                            value={formData.clientEmail}
                            onChange={handleChange}
                            placeholder="Client Email"
                            className="col-span-3 py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                        />
                        <input
                            name="clientStreet"
                            value={formData.clientStreet}
                            onChange={handleChange}
                            placeholder="Street Address"
                            className="col-span-3 py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                        />
                        <input
                            name="clientCity"
                            value={formData.clientCity}
                            onChange={handleChange}
                            placeholder="City"
                            className="py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                        />
                        <input
                            name="clientPostCode"
                            value={formData.clientPostCode}
                            onChange={handleChange}
                            placeholder="Post Code"
                            className="py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                        />
                        <input
                            name="clientCountry"
                            value={formData.clientCountry}
                            onChange={handleChange}
                            placeholder="Country"
                            className="py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <input
                            type="date"
                            name="invoiceDate"
                            value={formData.invoiceDate}
                            onChange={handleChange}
                            className="py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white"
                        />
                        <select
                            name="paymentTerms"
                            value={formData.paymentTerms}
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
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="mt-4 py-[17px] px-[20px] border-[2px] border-[#DFE3FA] dark:border-[#252945] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] text-[12px] font-bold rounded-[4px] dark:text-white w-full"
                    />

                    <h2 className="mt-10 text-2xl text-gray-500">Item List</h2>
                    {items.map((item, index) => (
                        <div
                            className="flex flex-col w-full gap-2"
                            key={item.id || index}
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
                                    value={item.name}
                                    onChange={(e) =>
                                        handleItemChange(
                                            item.id,
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    className="border-[2px] border-[#DFE3FA] rounded-[4px] px-[12px] py-[8px] text-[12px] font-bold text-[#0C0E16] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] dark:text-white dark:border-[#252945] w-full"
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
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleItemChange(
                                                item.id,
                                                "quantity",
                                                Number(e.target.value)
                                            )
                                        }
                                        className="border-[2px] border-[#DFE3FA] rounded-[4px] px-[12px] py-[8px] text-[12px] font-bold text-[#0C0E16] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] dark:text-white dark:border-[#252945] w-full"
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
                                        value={item.price}
                                        onChange={(e) =>
                                            handleItemChange(
                                                item.id,
                                                "price",
                                                Number(e.target.value)
                                            )
                                        }
                                        className="border-[2px] border-[#DFE3FA] rounded-[4px] px-[12px] py-[8px] text-[12px] font-bold text-[#0C0E16] dark:focus:border-[#7C5DFA] focus:border-[#7C5DFA] outline-none dark:bg-[#1E2139] dark:text-white dark:border-[#252945] w-full"
                                    />
                                </div>
                                <div className="w-[80px] text-center">
                                    <label className="text-[12px] mb-[8px]">
                                        Total
                                    </label>
                                    <p className="font-bold">
                                        {item.quantity * item.price}
                                    </p>
                                </div>
                                <div>
                                    <img
                                        onClick={() =>
                                            handleDeleteItem(item.id)
                                        }
                                        className="cursor-pointer hover:grayscale-0 grayscale-[100%] transition-all"
                                        src={delIcon}
                                        alt="Delete"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addItem}
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
                        Cancel
                    </button>
                    <div className="flex gap-[7px]">
                        <button
                            onClick={handleSend}
                            className="text-white font-bold truncate hover:opacity-80 p-[16px] text-[12px] bg-[#7c5dfa] rounded-full"
                        >
                            Save & Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditInvoice;
