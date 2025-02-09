import React, { useState } from "react";

function Invoices() {
    const [num, setNum] = useState(7);
    return (
        <div>
            <div className="sm:max-w-[327px] w-[100%] mx-auto">
                <div className="sm:mt-[32px]">
                    <div className="">
                        <h1>Invoices</h1>
                        <h1>{num} invoices</h1>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Invoices;
