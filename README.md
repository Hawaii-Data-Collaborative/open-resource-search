# search.auw211.org main site frontend

A React-based web application for searching and discovering community resources. This project is cloned from https://github.com/211-Connect/open-resource-search.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Development](#development)
  - [Setup](#setup)
  - [Running the Application](#running-the-application)
  - [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Environment Configuration](#environment-configuration)
- [Build and Deploy](#build-and-deploy)
- [Troubleshooting](#troubleshooting)

## Tech Stack

This project uses the following technologies:

- **React** - JavaScript library for building user interfaces
- **TypeScript** - Typed superset of JavaScript for better developer experience
- **Vite** - Fast build tool and development server
- **Redux Toolkit** - State management library
- **Material-UI (MUI)** - React component library for UI design
- **Styled Components** - CSS-in-JS styling solution
- **Google Maps API** - For location-based search features
- **React Router** - Client-side routing

## Prerequisites

Before you begin, make sure you have the following installed on your computer:

- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager
- **Git** - [Download here](https://git-scm.com/)
- A **Google Maps API key** (for map functionality) - [Get one here](https://developers.google.com/maps/documentation/javascript/get-api-key)

To check if Node.js and npm are installed, run these commands in your terminal:

```bash
node --version
npm --version
```

## Development

### Setup

1. **Clone the repository** to your local machine:

   ```bash
   git clone <repository-url>
   cd search-client
   ```

2. **Install dependencies** - This downloads all the required packages listed in `package.json`:

   ```bash
   npm install
   ```

   This may take a few minutes depending on your internet connection.

3. **Set up environment variables** - These are configuration values that tell the app how to connect to services:

   ```bash
   cp .env.example .env
   ```

   Then open the `.env` file in your text editor and fill in the required values:

   - `VITE_API_URL` - The URL of the backend API server (e.g., `http://localhost:3004` for local development)
   - `VITE_GOOGLE_API_KEY` - Your Google Maps API key (required for map features)

   **Note:** Never commit the `.env` file to version control as it may contain sensitive information.

### Running the Application

Start the development server with hot-reloading (automatically updates when you save changes):

```bash
npm run dev
```

This will:

- Start the Vite development server on port 3005
- Open your browser to `http://localhost:3005`
- Watch for file changes and automatically reload the page

The terminal will show you the local URL where the app is running. Press `Ctrl+C` to stop the server.

### Available Scripts

Here are the main commands you can use during development:

- **`npm run dev`** - Starts the development server with hot-reloading
- **`npm run build`** - Creates an optimized production build in the `dist` folder
- **`npm run build:beta`** - Creates a beta deployment build

## Project Structure

Understanding the folder structure will help you navigate the codebase:

```
search-client/
├── src/                     # All source code lives here
│   ├── adapters/            # Functions to transform data between formats
│   ├── constants/           # Constant values used across the app
│   ├── hooks/               # Custom React hooks for reusable logic
│   ├── providers/           # React context providers
│   ├── redux/               # Redux state management (slices and store)
│   ├── services/            # External services (API calls, storage, etc.)
│   ├── styles/              # Global styles and theme configuration
│   ├── types/               # TypeScript type definitions
│   ├── ui/                  # All UI components
│   │   ├── elements/        # Reusable basic components (buttons, inputs, etc.)
│   │   ├── layouts/         # Page layout components
│   │   ├── modules/         # Feature-specific components
│   │   └── pages/           # Top-level page components
│   └── utils/               # Utility functions
├── public/                   # Static files (images, fonts, etc.)
├── .env.example             # Example environment variables
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite build tool configuration
```

## Environment Configuration

The application uses environment variables that start with `VITE_` to configure different aspects:

| Variable              | Description                               | Example                 |
| --------------------- | ----------------------------------------- | ----------------------- |
| `VITE_API_URL`        | Backend API endpoint                      | `http://localhost:3004` |
| `VITE_GOOGLE_API_KEY` | Google Maps API key for location features | `AIza...`               |

**Important:** Vite only exposes variables prefixed with `VITE_` to the client-side code for security reasons.

## Build and Deploy

### Building for Production

- **`./build.sh`** - Compiles the code and creates a ZIP file for deployment

### Deployment Scripts

- **`./deploy.sh`** - Copies the built files to the production server

**Prerequisites for deployment**:

- You must have an SSH config entry called `auw1` in your `~/.ssh/config` file
- The entry should point to your production server

Example SSH config entry:

```
Host auw1
    HostName your-server.com
    User your-username
    IdentityFile ~/.ssh/your-key
```

## License

Copyright (C) 2021 Connect 211

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>
