module.exports = {
    content: ["./src/**/*.{njk,md,html}"],
    safelist: [
        'text-sky-600',
        'bg-sky-600',
        'hover:bg-sky-700',
        'text-primary-500',
        'text-secondary-500',
        'bg-secondary-500'
    ],
    theme: {
        extend: {
            colors: { 
                brand: { light: "#4299e1", dark: "#2b6cb0" },
                primary: "#00bcd4",
                secondary: {
                    500: "#17103c"
                },
                sky: {
                    600: "#00bcd4"
                }
            },
            boxShadow: { soft: "0 10px 25px rgb(0 0 0 / 0.08)" }
        }
    },
    plugins: [require("@tailwindcss/typography")]
};