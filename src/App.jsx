import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Invoices from "./pages/Invoices";
import MainLayout from "./layouts/MainLayout";
import InvoiceDetails from "./pages/InvoiceDetails";
export const ThemeContext = createContext(null);
import { ToastContainer } from "react-toastify";
export const DataContext = createContext(null);

function App() {
    const [theme, setTheme] = useState("light");
    const [api, setApi] = useState(
        JSON.parse(localStorage.getItem("data")) || []
    );

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
            <DataContext.Provider value={{ api, setApi }}>
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
                    </Routes>
                </ThemeContext.Provider>
            </DataContext.Provider>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default App;
