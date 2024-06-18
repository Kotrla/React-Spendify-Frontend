# React-Spendify-Frontend

React-Spendify is a frontend application built with React and TypeScript, designed to manage personal
finances. The app uses Redux Toolkit for state management and Material-UI for the user interface. It interacts
with a backend service to provide functionalities such as spending tracking, investment monitoring, and user
authentication.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Features](#features)
- [APIs](#apis)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Kotrla/React-Spendify-Frontend.git
   cd React-Spendify-Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:

   ```plaintext
   VITE_SPENDIFY_API_URL=<your-api-url>
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Usage

After starting the development server, you can access the application at `http://localhost:3000`.

## Project Structure

```plaintext
src
├── assets                 # Static assets such as images, fonts, etc.
├── core                   # Core functionalities like components, hooks, and routes
│   ├── components         # Core components
│   ├── hooks              # Core hooks
│   └── routes             # Route definitions and configurations
├── features               # Application features split by domain
│   ├── auth               # Authentication feature
│   │   ├── components     # Auth-specific components
│   │   ├── hooks          # Auth-specific hooks
│   │   ├── enums.ts       # Auth-specific enums
│   │   └── models.ts      # Auth-specific models
│   ├── investments        # Investments feature
│   │   ├── components     # Investment-specific components
│   │   ├── hooks          # Investment-specific hooks
│   │   ├── enums.ts       # Investment-specific enums
│   │   └── models.ts      # Investment-specific models
│   ├── profile            # User profile feature
│   │   ├── components     # Profile-specific components
│   │   ├── hooks          # Profile-specific hooks
│   │   ├── enums.ts       # Profile-specific enums
│   │   └── models.ts      # Profile-specific models
│   └── spending           # Spending tracking feature
│       ├── components     # Spending-specific components
│       ├── context        # Spending-specific context
│       ├── hooks          # Spending-specific hooks
│       ├── enums.ts       # Spending-specific enums
│       └── models.ts      # Spending-specific models
├── pages                  # Application pages
│   ├── Home.tsx           # Home page
│   ├── Investments.tsx    # Investments page
│   ├── Landing.tsx        # Landing page
│   ├── Login.tsx          # Login page
│   ├── Profile.tsx        # Profile page
│   └── Spending.tsx       # Spending page
├── shared                 # Shared components and utilities
│   └── components
│       └── TabPanel       # Example of a shared component
│           ├── models.ts  # TabPanel-specific models
│           └── TabPanel.tsx # TabPanel component
├── store                  # Redux store setup and slices
│   ├── features
│   │   └── auth
│   │       ├── authSlice.ts       # Auth slice for Redux
│   │       └── customFetchBase.ts # Custom fetch base for RTK query
│   └── services                   # RTK query services
│       ├── authService.ts         # Auth service
│       ├── investmentsService.ts  # Investments service
│       ├── spendingService.ts     # Spending service
│       ├── usersService.ts        # Users service
│       ├── hooks.ts               # Service-specific hooks
│       ├── models.ts              # Service-specific models
│       └── store.ts               # Store configuration
├── App.scss               # Global styles
├── App.tsx                # Main App component
├── index.scss             # Index styles
├── main.tsx               # Application entry point
└── vite-env.d.ts          # TypeScript definitions for Vite
```

## Features

- **Authentication**: User login, registration, and authentication state management.
- **Spending Tracking**: Track expenses and incomes, categorize spending, and visualize spending patterns.
- **Investment Monitoring**: Real-time data on stocks and cryptocurrencies, including market position and
  price information.
- **User Profile**: Manage user profile information.

## APIs

- **Authentication**: Interacts with the backend for user authentication.
- **Spending**: Fetches spending data and creates new spending records and retrieves spending categories.
- **Investments**: Retrieves investments data and live data for stocks and cryptocurrencies.
- **Users**: Retrieves user information.

## License

This project is licensed under the MIT License.
