# Minesweeper

A simple Minesweeper game built with **React**, **Vite**, and **Tailwind CSS**.  
Play the game in your browser!

## 🖥️ Demo

➡️ [Play on Vercel](https://react-minesweeper-ruddy.vercel.app/)

## ⚙️ Features

- Customizable board size and mine count
- Left click to open cells
- Right click to place flags
- Auto reveal for empty cells (flood fill)
- Victory/loss alerts

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/minesweeper.git
cd minesweeper

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🗂️ Project Structure

```
src/
├── components/        # UI components (Cell, GameBoard, GameSettings)
├── logic/             # Game logic (initializeBoard, floodFill, etc.)
├── types/             # Shared TypeScript type definitions
├── App.tsx            # Main application logic
└── main.tsx           # Entry point
```

## 🧩 Customization

You can change the default board size and mine count by editing `defaultSettings` in `App.tsx`.

```ts
const defaultSettings = {
  rows: 9,
  cols: 9,
  mines: 10,
};
```

You can also add difficulty presets, a timer, or emojis for better UX!

## 📦 Deployment

This app is easily deployable to [Vercel](https://vercel.com/):

1. Push your project to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Select `npm run build` and `dist/` (auto-detected by Vercel)

Done! 🎉

---

## 📄 License

MIT
