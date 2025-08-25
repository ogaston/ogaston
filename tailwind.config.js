module.exports = {
    content: ["./src/**/*.{njk,md,html}"],
    theme: {
        extend: {
            colors: { brand: { light: "#4299e1", dark: "#2b6cb0" } },
            boxShadow: { soft: "0 10px 25px rgb(0 0 0 / 0.08)" }
        }
    },
    plugins: [require("@tailwindcss/typography")]
};