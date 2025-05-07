# Minesweeper

A simple Minesweeper game built with **React**, **Vite**, and **Tailwind CSS**.
Play the game directly in your browser!

## 🖥️ Demo

➡️ [Play on Vercel](https://react-minesweeper-ruddy.vercel.app/)

## ⚙️ Features

- Customizable board size and mine count
- Left-click to open cells
- Right-click to place flags
- Left double-click to reveal all adjacent non-flagged cells (flood fill)
- Victory and loss alerts with automatic game reset

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/fuyu28/minesweeper.git
cd minesweeper

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🗂️ Project Structure

```
src/
├── components/        # UI components (e.g., game board, settings)
├── hooks/             # Custom React hooks (e.g., game timer)
├── logic/             # Core game logic (e.g., board setup, actions)
├── types/             # TypeScript type definitions (e.g., board, game status)
├── App.tsx            # Main application logic
└── main.tsx           # Entry point of the application
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

Add more features like difficulty presets, a timer, or emojis for an enhanced user experience!

## 📦 Deployment

This app is easy to deploy to [Vercel](https://vercel.com/):

1. Push your project to GitHub.
2. Go to the [Vercel Dashboard](https://vercel.com/dashboard).
3. Click **"Add New Project"**.
4. Import your GitHub repository.
5. Select `npm run build` and `dist/` (auto-detected by Vercel).

Done! 🎉

---

## 📄 License

MIT License
