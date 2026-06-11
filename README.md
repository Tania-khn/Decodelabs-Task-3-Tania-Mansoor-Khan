
# Tania's Cybersecurity Services - Phishing Awareness Platform

A modern, interactive phishing awareness and cybersecurity training platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Landing Page** – Bold, professional landing with "Build Your Future with Cybersecurity" tagline
- **Phishing Awareness Dashboard** – Interactive analysis and learning modules
- **Dark/Light Mode** – Full theme support with next-themes
- **Responsive Design** – Works on all screen sizes
- **Shadcn/UI Components** – Clean, accessible UI components

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Library:** shadcn/ui
- **Icons:** Lucide React
- **Charts:** Recharts
- **Theme:** next-themes

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm, yarn, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/tanias-cybersecurity-services.git
   cd tanias-cybersecurity-services
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── public/                  # Static assets (logo, images)
├── src/
│   ├── app/
│   │   ├── page.tsx         # Main app (Landing + Dashboard)
│   │   ├── layout.tsx       # Root layout with theme provider
│   │   ├── globals.css      # Global styles
│   │   └── api/             # API routes
│   ├── components/
│   │   ├── phishing/        # Phishing awareness components & data
│   │   └── ui/              # shadcn/ui components
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utility functions
├── prisma/                  # Database schema
├── tailwind.config.ts       # Tailwind configuration
├── next.config.ts           # Next.js configuration
└── package.json             # Dependencies & scripts
```

## License

This project is licensed under the MIT License.

# Decodelabs-Task-3-Tania-Mansoor-Khan
Phishing Awareness Analysis is a cybersecurity project that identifies and analyzes phishing attempts to help users recognize and avoid malicious emails and fake websites.
