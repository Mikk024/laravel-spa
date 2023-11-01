# Airbnb-like Rental Web Application
![home](https://imageupload.io/ib/k7qXo9gNlf67dM4_1698799792.png)
****
![rent](https://imageupload.io/ib/81pNx6894CR1iXV_1698799961.png)
****
![calendar](https://imageupload.io/ib/7w1fv7ohGytMk7s_1698800045.png)
****
![reservations](https://imageupload.io/ib/BZJqGcDGLajdFf4_1698800102.png)
****
![reservations](https://imageupload.io/ib/ijGcljy5KDAiZ40_1698800374.png)

## Demo App
https://unused-insect-production.up.railway.app/


## Description

This project is a full-stack web application inspired by Airbnb, featuring a REST API backend built with Laravel and a dynamic React frontend. Users can list their properties for rent, search for available rentals, and manage their listings. The application utilizes React Context for state management, Axios for API calls, and features like date-range picker for easy booking.

## Key Features

- Users can list properties for rent.
- Property search functionality with basic filtering.
- Seamless date selection for booking using react-date-range.
- User authentication and authorization using Laravel Breeze.
- File uploads and storage on Google Cloud Storage.
- Utilizes Laravel Enums for efficient data handling.
- Comprehensive validations for data integrity.

## Technologies Used

- **Backend (API):** Laravel, PHP
- **Frontend:** React, React Router
- **State Management:** React Context
- **Styling:** Tailwind CSS, Font Awesome
- **Authentication:** Laravel Breeze (Cookie-based)
- **Image Storage:** Google Cloud Storage

## Setup Instructions

1. **Backend (Laravel):**

   - Clone the Laravel repository.
   - Install dependencies: `composer install`
   - Set up the database and configure `.env` file.
   - Migrate and seed the database: `php artisan migrate --seed`
   - Start the Laravel development server: `php artisan serve`

2. **Frontend (React):**

   - Clone the React repository.
   - Install dependencies: `npm install`
   - Start the React development server: `npm start`

3. **Access the Application:**
   Open a web browser and go to `http://localhost:3000`

## Usage

1. Register or login to start using the application.
2. List your property for rent or search for available rentals.
3. Use the date-range picker to select booking dates.
4. Explore and manage your listings in the dashboard.