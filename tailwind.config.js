const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-gold": "#F5B941",
        "brand-orange": "#ED8A33",
        "brand-deep-blue": "#081824",
        "brand-dark-blue": "#0F2F45",
        "brand-mid-blue": "#4B9CB9",
        "brand-light-blue": "#9AC9E3",
        "brand-white": "#FFFFFF",
        dark: "#050E15",
        light: "#97AAB5",
      },
      maxWidth: {
        content: 1264,
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".heading-massive": {
          fontSize: 60,
          lineHeight: 1.15,
          fontWeight: 800,
        },
        ".heading-lg": {
          fontSize: 40,
          lineHeight: 1.25,
          fontWeight: 700,
        },
        ".heading-md": {
          fontSize: 32,
          lineHeight: 1.25,
          fontWeight: 700,
        },
        ".heading-sm": {
          fontSize: 28,
          lineHeight: 1.3,
          fontWeight: 500,
        },
        ".heading-sm-mobile": {
          fontSize: 18,
          lineHeight: 1.25,
          fontWeight: 500,
        },
        ".body-lg": {
          fontSize: 24,
          lineHeight: 1.5,
        },
        ".body": {
          fontSize: 20,
          lineHeight: 1.5,
        },
        ".body-sm": {
          fontSize: 18,
          lineHeight: 1.5,
        },
        ".caption": {
          fontSize: 14,
          lineHeight: 1.25,
          fontWeight: 800,
          textTransform: "uppercase",
        },
        ".btn-lg": {
          padding: "16px 24px",
          borderRadius: "8px",
          fontSize: 16,
          lineHeight: 1,
          transition: "0.3s",
          fontWeight: 700,
          textTransform: "uppercase",
        },
        ".btn-sm": {
          padding: "7px 24px",
          borderRadius: "8px",
          fontSize: 14,
          lineHeight: 1.05,
          transition: "0.3s",
          fontWeight: 700,
          textTransform: "uppercase",
        },
        ".btn-icon": {
          padding: "9px 24px",
          borderRadius: "8px",
          fontSize: 16,
          lineHeight: 1,
          transition: "0.3s",
          fontWeight: 700,
          textTransform: "uppercase",
        },
        ".btn-icon-sm": {
          padding: "9px 24px",
          borderRadius: "8px",
          fontSize: 14,
          lineHeight: 1,
          transition: "0.3s",
          fontWeight: 700,
          textTransform: "uppercase",
        },
        ".btn-primary": {
          backgroundColor: theme("colors.brand-gold"),
          color: "#000",
          "&:hover": {
            backgroundColor: theme("colors.brand-orange"),
          },
        },
        ".btn-secondary": {
          color: theme("colors.brand-gold"),
          border: "1px solid currentColor",
          "&:hover": {
            color: theme("colors.brand-orange"),
          },
        },
        ".btn-white": {
          backgroundColor: theme("colors.brand-white"),
          color: "#000",
          "&:hover": {
            backgroundColor: "#ccc",
          },
        },
        ".btn-light-blue": {
          backgroundColor: theme("colors.brand-light-blue"),
          color: "#000",
          "&:hover": {
            backgroundColor: theme("colors.brand-mid-blue"),
          },
        },
        ".btn-dark-blue": {
          backgroundColor: theme("colors.brand-deep-blue"),
          color: "rgba(255, 255, 255, 0.5)",

          "&:hover, &.active": {
            backgroundColor: theme("colors.brand-dark-blue"),
            color: "#fff",
          },
        },
        ".link": {
          fontWeight: 500,
          fontSize: 16,
          lineHeight: 1,
          color: theme("colors.brand-gold"),
          textDecoration: "underline",
          "&:hover": {
            color: theme("colors.brand-orange"),
          },
        },
        ".input": {
          padding: "12px 16px",
          fontSize: 16,
          lineHeight: 1.5,
          color: theme("colors.light"),
          border: "1px solid currentColor",
          borderRadius: 8,
          outline: "none",
          background: "transparent",
          "&:focus": {
            color: "#fff",
            "&::placeholder": {
              color: "#fff",
            },
          },
        },
      });
    }),
  ],
};
