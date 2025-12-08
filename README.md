# CineSanchika

CineSanchika is a movie discovery web application built with React. It
allows users to browse movies, view detailed information, explore cast
and crew, and share their own ratings and reviews. The project focuses
on clean UI, responsive design, simple navigation, and smooth API
integration. Authentication is included so users can securely interact
with the platform.

## Features

### Movie Exploration

-   Browse popular and trending movies\
-   Search for movies by title\
-   View complete movie details\
-   Access cast and crew information

### Ratings and Reviews

-   Users can rate movies from 1 to 5 stars\
-   Write, edit, and delete personal reviews\
-   View the overall rating and review count for each movie\
-   Clear and easy-to-read review layout

### Authentication

-   User registration and login\
-   JWT-based secure authentication\
-   Protected routes for posting ratings and reviews\
-   User profile management

### Interface and Experience

-   Clean and responsive UI\
-   Reusable and modular React components\
-   Smooth loading of content through API calls

## Tech Stack

**Frontend:**\
- React\
- React Router\
- Context API\
- Axios\
- Tailwind CSS or your preferred styling method

**Backend:**\
- Node.js\
- Express.js\
- MongoDB with Mongoose\
- JSON Web Tokens for authentication\
- Bcrypt for password hashing

## Folder Structure (Simplified)

    CineSanchika/
    │
    ├── client/              # React frontend
    │   ├── src/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── context/
    │   │   ├── hooks/
    │   │   └── App.jsx
    │   └── package.json
    │
    └── server/              # Backend API
        ├── models/
        ├── routes/
        ├── controllers/
        ├── middleware/
        └── server.js

## API Endpoints (Sample)

### Authentication

-   POST /auth/register\
-   POST /auth/login

### Movies

-   GET /movies\
-   GET /movies/:id\
-   GET /movies/:id/cast

### Reviews

-   GET /movies/:id/reviews\
-   POST /movies/:id/reviews\
-   PUT /reviews/:id\
-   DELETE /reviews/:id

## Installation and Setup

### Clone the repository

    git clone https://github.com/your-username/cinesanchika.git
    cd cinesanchika

### Install frontend dependencies

    cd client
    npm install
    npm run dev

### Install backend dependencies

    cd ../server
    npm install
    npm start

## Future Improvements

-   Watchlist or favorites functionality\
-   User dashboard for activity\
-   Movie trailer integration\
-   Social sharing options\
-   Admin moderation for reviews

## Contributing

Contributions are welcome. Feel free to open an issue or submit a pull
request.

## License

This project is licensed under the MIT License.
