/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                slideDown: {
                    "0%": { transform: "translateY(-100%)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                slideInLeft: {
                    "0%": { transform: "translateX(-100%)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                slideInRight: {
                    "0%": { transform: "translteX(0)", opacity: "1" },
                    "100%": { transform: "translateX(-100%)", opacity: "0" },
                },
            },
            animation: {
                "slide-down": "slideDown 0.5s ease-out",
                "slideInLeft": "slideInLeft 0.5s ease-out",
                "slideInRight": "slideInRight 0.5s ease-out",
            },
        },
    },
    darkMode: "class",
    plugins: [],
};
