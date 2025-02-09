import React, { useContext } from "react";
import image from "../images/layoutImg.svg";
import light from "../images/ligthImg.svg";
import dark from "../images/darkImg.svg";
import heroImg from "../images/heroImg.svg";
import { ThemeContext } from "../App";

function LayoutLeft() {
    const { theme, setTheme } = useContext(ThemeContext);

    function handleChangeTheme() {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }
    return (
        <div className="md:max-w-[768px] md:h-[80px] flex items-center justify-between bg-[#373B53] dark:bg-[#1E2139]">
            <img src={image} width={80} height={80} alt="" />
            <div className="flex gap-[49px] md:justify-between sm:justify-between p-6">
                <img
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={handleChangeTheme}
                    src={theme === "light" ? dark : light}
                    alt=""
                />
                <div
                    className="content-[''] border-[2px] border-[#494E6E] "
                ></div>
                <img width={32} height={32} src={heroImg} className="" alt="" />
            </div>
        </div>
    );
}

export default LayoutLeft;
