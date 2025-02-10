import React, { useContext, useEffect } from "react";
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
            localStorage.setItem("theme", "dark");
        } else {
            setTheme("light");
            localStorage.setItem("theme", "light");
        }
    }
    useEffect(() => {
        const prevTheme = localStorage.getItem('theme')
        setTheme(prevTheme)
    } , [])
    return (
        <div className="md:max-w-[1284px] md:h-[80px] flex items-center justify-between bg-[#373B53] dark:bg-[#1E2139] xl:flex-col xl:max-w-[103px] w-[100%] xl:h-dvh xl:rounded-tr-[29px] xl:rounded-br-[29px] xl:fixed xl:top-0 xl:left-0 xl:bottom-0">
            <img
                src={image}
                className="max-w-[103px] w-[100%] max-h-[103px] h-[100%]"
                alt=""
            />
            <div className="flex gap-[49px] md:justify-between sm:justify-between p-6 xl:flex-col xl:items-center">
                <img
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={handleChangeTheme}
                    src={theme === "light" ? dark : light}
                    alt=""
                />
                <div className="content-[''] border-[2px] border-[#494E6E] "></div>
                <img width={32} height={32} src={heroImg} className="" alt="" />
            </div>
        </div>
    );
}

export default LayoutLeft;
