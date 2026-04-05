# Zorvyn Fintech Dashboard

Zorvyn is a premium, highly responsive frontend finance dashboard designed with a sophisticated glassmorphism aesthetic. It seamlessly integrates dark mode, smooth hover interactions, and micro-animations to deliver a next-generation user experience for financial tracking.

## Overview of Approach

The project prioritizes a polished, high-end "WOW" factor. The development approach combines modern web engineering with meticulous design aesthetics:

1. **State-of-the-Art Visuals**: Emphasizes a cohesive glassmorphic design and tailored color palettes for both light and dark modes. It avoids generic colors in favor of hand-picked gradients and dynamic backgrounds.
2. **Interactive Motion**: Extensively utilizes `framer-motion` for spring-physics-based hover effects, color-shifting animations, and pop-out interactive elements on cards and tables.
3. **Responsive Architecture**: Built to be fully responsive across mobile, tablet, and desktop viewports, ensuring clear font scaling, unclipped chart rendering, and optimal vertical stacking.
4. **Humanized Codebase & Modularity**: Components are neatly organized and cleanly isolated (e.g., separating UI primitives, layout fragments, and complex features like charts). 

## Features

- **Dynamic Overview & Insight Cards**: Premium cards with color-coded top-border gradients, bouncy interactive hover physics, and sophisticated interior-only color-shifting animations.
- **Interactive Financial Charts**: Employs `recharts` for rich data visualization, including a responsive Balance Chart and an intuitive Spending Chart.
- **Advanced Transaction Table**: A vibrant transaction list featuring color-coded trend indicators (up/down), category tagging, easy-to-read credit/debit labels, and inline search/filtering functionality.
- **Theming & Responsiveness**: Fully featured light/dark mode support wrapped in a flexible layout using Tailwind CSS. 
- **Modern Tech Stack**: Harnesses Vite for lightning-fast module replacement, React 19, Zustand for lightweight state management, and `framer-motion` for complex UI animation. 

## Setup Instructions

Ensure you have Node.js installed to run this project locally.

`1.` **Navigate to the Project Directory**
Ensure you are in the root directory of the project:
```bash
cd Zorvyn
```

`2.` **Install Dependencies**
Install all required packages:
```bash
npm install
```

`3.` **Run the Development Server**
Start the Vite development server:
```bash
npm run dev
```

`4.` **View the Application**
Once the server is running, you can view the application in your browser. The default Vite port is usually `http://localhost:5173`. 

## Built With

- [React](https://react.dev/) - UI Library
- [Vite](https://vitejs.dev/) - Frontend Tooling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [Recharts](https://recharts.org/) - Composable charting library
- [Zustand](https://zustand-demo.pmnd.rs/) - Small, fast, and scalable state management
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icons


