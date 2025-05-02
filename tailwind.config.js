/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mine: "#991b1b", // 地雷用の赤色
        safe: "#1e3a8a", // 安全マスの色
        flag: "#facc15", // フラグの黄色
        space: "#cccccc", // マスの色
      },
    },
  },
  plugins: [],
}