import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Invoices from "./pages/Invoices";
import MainLayout from "./layouts/MainLayout";
import InvoiceDetails from "./pages/InvoiceDetails";
import AddInvoice from "./pages/AddInvoice";
export const ThemeContext = createContext(null);

function App() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const body = document.body;
        if (theme === "light") {
            body.classList.remove("dark");
            body.classList.add("light");
        } else if (theme === "dark") {
            body.classList.remove("light");
            body.classList.add("dark");
        }
    }, [theme]);
    return (
        <div className="dark:bg-[#141625] min-h-svh">
            <ThemeContext.Provider value={{ theme, setTheme }}>
                <Routes>
                    <Route
                        index
                        element={
                            <MainLayout>
                                <Invoices></Invoices>
                            </MainLayout>
                        }
                    ></Route>
                    <Route
                        path="/details/:id"
                        element={
                            <MainLayout>
                                <InvoiceDetails></InvoiceDetails>
                            </MainLayout>
                        }
                    ></Route>
                    <Route
                        path="/add"
                        element={
                            <MainLayout>
                                <AddInvoice></AddInvoice>
                            </MainLayout>
                        }
                    ></Route>
                </Routes>
            </ThemeContext.Provider>
        </div>
    );
}

export default App;
