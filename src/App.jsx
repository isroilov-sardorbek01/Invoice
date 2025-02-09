import React, { createContext, useEffect, useState } from "react";
import LayoutLeft from "./components/LayoutLeft";
import { Route, Routes } from "react-router-dom";
import Invoices from "./pages/Invoices";
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
        <div>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                <LayoutLeft />
                <Routes>
                    <Route index element={<Invoices></Invoices>}></Route>
                </Routes>
            </ThemeContext.Provider>
        </div>
    );
}

export default App;
