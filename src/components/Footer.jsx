import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 shadow-inner mt-auto">
      <div className="max-w-7xl mx-auto p-4 text-center text-white text-sm font-letterboxd">
        &copy; {new Date().getFullYear()} CineSanchika. All rights reserved.
      </div>
    </footer>
  );
}
