import { useEffect, useState } from "react";

function AddInvoice({ open, onClose }) {
    if (!open) {
        return null;
    }
    const [isClosing, setIsClosing] = useState(false);
    useEffect(() => {
        if (open) {
            setIsClosing(false);
        }
    }, [open]);
    function handleClose() {
        setIsClosing(true);
        setTimeout(onClose, 100);
    }
    const [formData, setFormData] = useState({
        id: Date.now(),
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

    return (
        <div
            className={`fixed top-0  left-0 z-30 flex items-center justify-center bg-black bg-opacity-50 backdrop-sepia ${
                !isClosing ? "animate-slideInLeft" : "animate-slideInRight"
            }`}
        >
            <div className="scrollbar-hide flex flex-col  opacity-1 dark:text-white dark:bg-[#141625] bg-white md:pl-[150px] py-16 px-6 h-screen md:w-[768px] md:rounded-r-3xl">
                <h1 className="text-[#0C0E16] text-[24px] font-bold">
                    Create Invoice
                </h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log(formData);
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
                        <input
                            name="senderStreet"
                            value={formData.senderStreet}
                            onChange={handleChange}
                            placeholder="Street Address"
                            className="col-span-3 input"
                        />
                        <input
                            name="senderCity"
                            value={formData.senderCity}
                            onChange={handleChange}
                            placeholder="City"
                            className="input"
                        />
                        <input
                            name="senderPostCode"
                            value={formData.senderPostCode}
                            onChange={handleChange}
                            placeholder="Post Code"
                            className="input"
                        />
                        <input
                            name="senderCountry"
                            value={formData.senderCountry}
                            onChange={handleChange}
                            placeholder="Country"
                            className="input"
                        />
                    </div>
                    <h1 className="text-[#7c5dfa] my-4 mt-10 font-medium">
                        Bill To
                    </h1>
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleChange}
                            placeholder="Client Name"
                            className="col-span-3 input"
                        />
                        <input
                            name="clientEmail"
                            value={formData.clientEmail}
                            onChange={handleChange}
                            placeholder="Client Email"
                            className="col-span-3 input"
                        />
                        <input
                            name="clientStreet"
                            value={formData.clientStreet}
                            onChange={handleChange}
                            placeholder="Street Address"
                            className="col-span-3 input"
                        />
                        <input
                            name="clientCity"
                            value={formData.clientCity}
                            onChange={handleChange}
                            placeholder="City"
                            className="input"
                        />
                        <input
                            name="clientPostCode"
                            value={formData.clientPostCode}
                            onChange={handleChange}
                            placeholder="Post Code"
                            className="input"
                        />
                        <input
                            name="clientCountry"
                            value={formData.clientCountry}
                            onChange={handleChange}
                            placeholder="Country"
                            className="input"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <input
                            type="date"
                            name="invoiceDate"
                            value={formData.invoiceDate}
                            onChange={handleChange}
                            className="input"
                        />
                        <select
                            name="paymentTerms"
                            value={formData.paymentTerms}
                            onChange={handleChange}
                            className="input"
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
                        className="mt-4 input"
                    />
                    <h2 className="mt-10 text-2xl text-gray-500">Item List</h2>
                    <button className="w-full py-2 mt-6 bg-gray-200 hover:opacity-80 rounded-xl">
                        + Add New Item
                    </button>
                </form>
                <div className="flex justify-between">
                    <button
                        onClick={handleClose}
                        className="px-8 py-4 bg-gray-200 rounded-full hover:opacity-80"
                    >
                        Discard
                    </button>
                    <button className="text-white hover:opacity-80 py-4 px-8 bg-[#7c5dfa] rounded-full">
                        Save & Send
                    </button>
                </div>
            </div>
        </div>
    );
}
export default AddInvoice;
