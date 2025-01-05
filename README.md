# FinanceDashboard

A simple web app to manage expenses. (and learning react)

## Table of Contents

-   [Introduction](#introduction)
-   [Project Structure](#project-structure)
-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Technologies](#technologies)
-   [Contributing](#contributing)

## Introduction

FinanceDashboard is a web application designed to help users manage their expenses efficiently. It provides a user-friendly interface for tracking and analyzing financial data.

## Project Structure

The project is organized into the following directories:

-   `frontend/`: Contains the frontend code of the application.
    -   `src/`: Source code for the React application.
    -   `public/`: Static files and assets.
    -   `README.md`: Documentation for the frontend setup.
-   `backend/`: Contains the backend code of the application.

    -   `app/`: Source code for the Python backend.
    -   `requirements.txt`: List of Python dependencies.

-   You can change the currency symbol in `frontend/src/config.tsx` (Default: `₹`)
-   Note: The code quality is not in any way optimal, it's just a learning project.

## Features

-   Cash tracking (for each denomination individually)
-   Balance visualization
-   Transaction history
-   Record expenses

## Installation

To install and run the FinanceDashboard locally, follow these steps:

### Frontend

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
    ```

### Backend

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2. Create a virtual environment:
    ```bash
    python -m venv venv
    ```
3. Activate the virtual environment:
    - On Windows:
        ```bash
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```bash
        source venv/bin/activate
        ```
4. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```
5. Start the backend server:
    ```bash
    python app/main.py
    ```

-   The app creates a SQLite database named `app.db` in the current directory.

## Usage

Once both the frontend and backend servers are running, open your browser and go to `http://localhost:5000` to access the FinanceDashboard app. Follow the on-screen instructions to start managing your expenses.

## Technologies

The FinanceDashboard app is built using the following technologies:

-   **TypeScript**: Main programming language for the frontend
-   **React**: Library for building user interfaces
-   **Flask**: Web framework for Python backend
-   **Bootstrap**: CSS framework for styling
-   **SQLite**: Database for storing data

## Contributing

Disclaimer: I made this project solely for the purpose of learning React, the code quality is not optimal.
To contribute to the FinanceDashboard project, follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/YourFeature`)
6. Open a Pull Request
