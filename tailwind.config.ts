import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      zIndex: {
        "51": "51",
        "55": "55",
        "60": "60",
        "70": "70",
      },
      gridTemplateColumns: {
        "3": "repeat(3, minmax(0, 1fr))",
        "5": "repeat(5, minmax(0, 1fr))",
        "7": "repeat(7, minmax(0, 1fr))",
      },
      spacing: {
        "17": "4.25rem", // 68px if 1rem is 16px
        "17.5": "4.375rem", // 70px
        "18": "4.5rem", // 72px
        "18.5": "4.625rem", // 74px
        "19": "4.75rem", // 76px
        "19.5": "4.875rem", // 78px
        "45": "11.25rem", // 180px
        "46": "11.5rem", // 184px
        "47": "11.75rem", // 188px
      },
      screens: {
        ipad: "768px", // for iPad portrait
        "ipad-landscape": {
          raw: "(min-width: 1024px) and (orientation: landscape)",
        },
      },
      fontSize: {
        xxs: ["10px", "14px"],
        "scale-xs": "0.5rem",
        "scale-sm": "0.75rem",
        "scale-base": "1rem", // Default font size
        "scale-md": "1.25rem",
        "scale-lg": "1.5rem", // Largest font size
      },
      backgroundImage: {
        "gray-red-stripes":
          "repeating-linear-gradient(45deg, rgba(128, 128, 128, 1), rgba(128, 128, 128, 1) 10px, rgba(255, 0, 0, 1) 10px, rgba(255, 0, 0, 1) 20px)",
        "gray-lightgray-opacity-stripes":
          "repeating-linear-gradient(45deg, rgba(128, 128, 128, 0.1), rgba(128, 128, 128, 0.1) 10px, rgba(163, 163, 163, 0.1) 10px, rgba(163, 163, 163, 0.1) 20px)",
        "gray-lightred-opacity-stripes":
          "repeating-linear-gradient(45deg, rgba(128, 128, 128, 0.1), rgba(128, 128, 128, 0.1) 10px, rgba(255, 184, 184, 0.1) 10px, rgba(255, 184, 184, 0.1) 20px)",
      },
      blur: {
        xs: "2px",
      },
      width: {
        "100": "25rem", // 400px
        "102": "25.5rem", // 408px
        "104": "26rem", // 416px
        "108": "27rem", // 432px
        "110": "27.5rem", // 440px
        "112": "28rem", // 448px
        "114": "28.5rem", // 456px
        "116": "29rem", // 464px
        "118": "29.5rem", // 472px
        "120": "30rem", // 480px
      },
      maxWidth: {
        "960": "960px",
        "min-6": "6rem", // 96px
        "max-8.5": "12rem", // 192px
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
