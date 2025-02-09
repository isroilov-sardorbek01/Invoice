import React from "react";
import LayoutLeft from "../components/LayoutLeft";

function MainLayout({ children }) {
    return (
        <div className="lg:flex dark:text-white">
            <LayoutLeft></LayoutLeft>
            <div className="container">{children}</div>
        </div>
    );
}

export default MainLayout;
