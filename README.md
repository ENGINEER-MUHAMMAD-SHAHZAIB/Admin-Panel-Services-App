# Adawat Services Admin Panel

A modern, high-performance admin dashboard for the **Adawat Services** marketplace, built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

![Dashboard Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop) *(Placeholder Image)*

## 🚀 Features

- **Premium UI/UX**: Glassmorphism design system with smooth framer-motion animations.
- **Dashboard**: Real-time analytics, charts (Recharts), and KPI monitoring.
- **Order Management**: Advanced filtering, status tracking, and details view.
- **Service Management**: CRUD operations for services and categories.
- **User Management**: Dedicated portals for detailed customer and technician profiles.
- **Zone Management**: Interactive zone definitions and assignments.
- **Dark Mode**: Native dark mode support with instant toggle.
- **Responsive**: Fully responsive layout for all device sizes.

## 🛠️ Technology Stack

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn UI (Radix Primitives), Lucide Icons
- **State/Routing**: React Router DOM, React Hooks
- **Charts**: Recharts
- **Utils**: clsx, tailwind-merge, date-fns

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/adawat-admin-panel.git
    cd adawat-admin-panel
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start Development Server**:
    ```bash
    npm run dev
    ```
    The app will run at `http://localhost:5173`.

4.  **Build for Production**:
    ```bash
    npm run build
    ```

## 📂 Project Structure

```
src/
├── components/
│   ├── layout/       # Sidebar, Header, Layout wrappers
│   ├── ui/           # Reusable UI primitives (Buttons, Cards, etc.)
│   └── ...
├── lib/              # Utilities and helpers
├── pages/            # Page components
│   ├── auth/         # Login/Signup
│   ├── dashboard/    # Main dashboard
│   ├── orders/       # Order management
│   ├── services/     # Service management
│   ├── settings/     # App configurations
│   ├── users/        # Customer & Technician management
│   └── zones/        # Zone management
├── App.tsx           # Main application entry & Routing
└── main.tsx          # React DOM rendering
```

## 🎨 Customization

- **Theme**: Edit `src/index.css` to change CSS variables for colors and radius.
- **Tailwind**: Modify `tailwind.config.js` to extend the theme or add custom animations.

---

Built for **Adawat Services**.
"# Admin-Panel-Services-App" 
