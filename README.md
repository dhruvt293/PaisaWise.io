PaisaWise - A Minimalist Expense Tracker 💸
A clean, modern, and mobile-first expense tracker built with React and Tailwind CSS. This application helps you quickly log your daily spending and instantly visualize your financial habits through an interactive dashboard.

## 🎯 Objective
The primary objective of this project was to build a Minimum Viable Product (MVP) for a personal expense tracker that is fast, intuitive, and privacy-focused. Instead of overwhelming users with complex features, PaisaWise masters the core loop: Log an expense ➔ See where it went. All data is stored locally in the browser's storage, meaning no sign-up is required and user data remains completely private.

## ✨ Key Features
⚡ Quick Add Interface: Log expenses in seconds using a simple form and a number pad.

📊 Visual Dashboard: Get an instant overview of your total monthly spending.

🥧 Interactive Pie Chart: Understand your spending habits with a clear, visual breakdown of expenses by category.

📋 Recent Transactions: A clean, chronological list of your most recent expenses.

🔐 Privacy First: All data is stored securely in your browser's local storage. No data ever leaves your device.

📱 Mobile-First Design: The interface is fully responsive and designed for a seamless experience on any device.

## 🛠️ Tech Stack & Architecture
This project was built with a modern frontend stack, focusing on performance and a great developer experience.

React: The core of the application is built with React. It's used for creating the component-based, interactive user interface.

Vite: Used as the frontend build tool. Vite provides a faster and leaner development experience with features like Hot Module Replacement (HMR).

Tailwind CSS: All styling is handled with Tailwind CSS. It's a utility-first CSS framework that allows for rapid and consistent styling directly within the HTML.

Recharts: A composable charting library built on React components. It was used to create the interactive and responsive pie chart for the dashboard.

Lucide React: Provides a beautiful and consistent set of open-source icons used throughout the application.

Local Storage: The browser's localStorage API is used as a simple, client-side database to persist user expense data across sessions without needing a backend.

## 🚀 Getting Started
To get a local copy up and running, follow these simple steps.

### Prerequisites
Make sure you have Node.js and npm installed on your machine.

npm

Bash

npm install npm@latest -g
### Installation
Clone the repository:

Bash

git clone https://github.com/your-username/paisawise.git
Navigate into the project directory:

Bash

cd paisawise
Install NPM packages:

Bash

npm install
Run the development server:

Bash

npm run dev
You can now view the application at http://localhost:5173/ in your browser.

## 🗺️ Future Roadmap
This MVP serves as a strong foundation. Future enhancements planned include:

[ ] User Accounts & Cloud Sync: To back up data and sync across devices.

[ ] Budgeting: Allow users to set monthly budgets for different categories and receive alerts.

[ ] Custom Categories: Ability to add, edit, or delete spending categories.

[ ] Data Export: Functionality to export expense data to formats like CSV or Excel.
