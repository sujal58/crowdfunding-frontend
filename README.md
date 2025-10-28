# AI Powered Crowdfunding-FundSaathi Frontend

A modern frontend application for crowdfunding platforms, built with React, TypeScript, and Vite.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project delivers a fast, responsive, and secure user interface for crowdfunding platforms. It enables project creators to launch campaigns and backers to support ideas, all with seamless payments and efficient dashboards.

## Features

- **Campaign Management:** Create, edit, and manage crowdfunding campaigns.
- **Project Browsing:** Discover and support projects.
- **User Authentication:** Secure login, registration, and profile management.
- **Stripe Integration:** Seamless payments for backing campaigns, powered by Stripe frontend integration.
- **User Dashboard:** Personalized dashboard for users to track their contributions and campaigns.
- **Admin Dashboard:** Comprehensive admin dashboard for managing campaigns, users, and platform analytics.
- **Responsive Design:** Optimized for desktop and mobile devices.
- **Fast Development Environment:** Powered by Vite for lightning-fast builds and HMR.

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Stripe](https://stripe.com/docs/payments/accept-a-payment?platform=web)
- [ESLint](https://eslint.org/) (with recommended configs)
- [CSS Modules](https://github.com/css-modules/css-modules) or [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- Node.js (version 18+ recommended)
- npm or yarn
- Stripe account (for payment integration)

### Installation

```bash
git clone https://github.com/sujal58/crowdfunding-frontend.git
cd crowdfunding-frontend
npm install
```

### Running the App

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Environment Variables

Before running the project, you need to set up your environment variables:

1. Copy the `.env.example` file to create a new `.env` file:
    ```bash
    cp .env.example .env
    ```
2. Open the new `.env` file and fill in the required values (e.g., your Stripe publishable key and other configuration variables).
3. Save the file. The project will now use these variables for local development.


## Available Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint


## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).