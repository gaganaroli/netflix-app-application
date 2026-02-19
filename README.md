# MyFlix - Netflix-style Movie Application

A production-ready Netflix clone built with React, TypeScript, and Tailwind CSS.

## Features
- **User Authentication**: Login and Signup system (Mocked with localStorage).
- **Protected Routes**: Dashboard is only accessible to logged-in users.
- **Form Validation**: Powered by React Hook Form and Zod.
- **Movie Dashboard**: Fetches real-time movie data from OMDB API.
- **Responsive Design**: Optimized for mobile and desktop screens.
- **Netflix UI**: Dark-themed, premium interface with smooth transitions.

## Tech Stack
- **Frontend**: React (Vite), TypeScript
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **State Management**: Context API
- **Routing**: React Router DOM
- **API Client**: Axios
- **Form Handling**: React Hook Form
- **Validation**: Zod

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your OMDB API key:
   ```env
   VITE_OMDB_API_KEY=c5ce15d
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Folder Structure
```text
src/
 ├── components/      # Reusable UI components
 ├── pages/           # Page components (Login, Signup, Dashboard)
 ├── services/        # API services (Axios)
 ├── context/         # AuthContext
 ├── types/           # TypeScript interfaces
 ├── utils/           # Helper functions
 ├── App.tsx          # Main routing & provider setup
 └── index.css        # Global styles & Tailwind directives
```

## License
MIT
