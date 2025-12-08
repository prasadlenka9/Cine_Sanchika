import React from "react";

export default function About() {
  return (
    // <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white font-letterboxd flex flex-col items-center justify-center px-6">
        <div className="min-h-screen p-6 text-gray-800 font-letterboxd flex flex-col items-center justify-center" style={{ background: "linear-gradient(to bottom right, #f0f9ff, #e6f7ff)" }}>
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-extrabold tracking-wide">About CineSanchika</h1>
        <p className="text-lg leading-relaxed text-gray-800">
          CineSanchika is a community-driven platform where movie lovers come together 
          to explore, share, and celebrate the world of cinema. From blockbusters to 
          hidden gems, we bring fans, critics, and creators onto a single stage.
        </p>
        <p className="text-lg leading-relaxed text-gray-800">
          Whether you want to track your favorite films, discover actors, write reviews, 
          or connect with fellow cinephiles, CineSanchika is your go-to destination.
        </p>
        <p className="text-lg leading-relaxed text-gray-800">
          Our mission is simple: to build a digital diary of movies, where every story 
          told on-screen finds a home in the hearts of our users.
        </p>
        <div className="mt-6">
          <p className="text-sm text-gray-800">Made with ❤️ by CineSanchika Team</p>
        </div>
      </div>
    </div>
  );
}
