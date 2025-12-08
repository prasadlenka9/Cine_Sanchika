// // server/routes/reviews.js
// import express from "express";
// import axios from "axios";
// import Review from "../models/Review.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Add a review
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const { movieId, rating, reviewText } = req.body;
//     const review = new Review({
//       movieId,
//       user: req.user.id,
//       rating,
//       reviewText,
//     });

//     await review.save();
//     res.status(201).json(review);
//   } catch (error) {
//     console.error("Error adding review:", error);
//     res.status(500).json({ message: "Error submitting review" });
//   }
// });

// // Get all reviews for a movie
// router.get("/:movieId", async (req, res) => {
//   try {
//     const reviews = await Review.find({ movieId: req.params.movieId }).populate(
//       "user",
//       "username"
//     );
//     res.json(reviews);
//   } catch (error) {
//     console.error("Error fetching reviews:", error);
//     res.status(500).json({ message: "Error fetching reviews" });
//   }
// });

// // Delete a review (only by owner)
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     const review = await Review.findById(req.params.id);
//     if (!review) return res.status(404).json({ message: "Review not found" });

//     if (review.user.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Not authorized" });
//     }

//     await review.deleteOne();
//     res.json({ message: "Review deleted" });
//   } catch (error) {
//     console.error("Error deleting review:", error);
//     res.status(500).json({ message: "Error deleting review" });
//   }
// });


// app.get("/api/reviews/user/:userId", async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit, 10) || 5;
//     const reviews = await Review.find({ user: req.params.userId })
//       .sort({ createdAt: -1 })
//       .limit(limit)
//       .lean();

//     // attach TMDb title + poster for each review
//     const enhanced = await Promise.all(
//       reviews.map(async (r) => {
//         try {
//           const tmdbRes = await axios.get(
//             `https://api.themoviedb.org/3/movie/${r.movieId}`,
//             { params: { api_key: process.env.TMDB_API_KEY, language: "en-US" } }
//           );
//           const m = tmdbRes.data;
//           return {
//             ...r,
//             movie: {
//               id: m.id,
//               title: m.title,
//               poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : null,
//             },
//           };
//         } catch (tmdbErr) {
//           console.error(`TMDB fetch failed for movieId=${r.movieId}:`, tmdbErr.message);
//           return { ...r, movie: { id: r.movieId, title: "Unknown", poster: null } };
//         }
//       })
//     );

//     res.json(enhanced);
//   } catch (err) {
//     console.error("Error fetching user reviews:", err);
//     res.status(500).json({ message: "Error fetching user reviews" });
//   }
// });

// export default router;










// server/routes/reviews.js
import express from "express";
import axios from "axios";
import Review from "../models/Review.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add a review
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { movieId, rating, reviewText } = req.body;
    const review = new Review({
      movieId,
      user: req.user.id,
      rating,
      reviewText,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Error submitting review" });
  }
});

// Get all reviews for a movie
router.get("/:movieId", async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId }).populate(
      "user",
      "username"
    );
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

// Delete a review (only by owner)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await review.deleteOne();
    res.json({ message: "Review deleted" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Error deleting review" });
  }
});

// Get last N reviews by a user (default 5)
router.get("/user/:userId", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 5;
    const reviews = await Review.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    // Attach TMDb movie data
    const enhanced = await Promise.all(
      reviews.map(async (r) => {
        try {
          const tmdbRes = await axios.get(
            `https://api.themoviedb.org/3/movie/${r.movieId}`,
            {
              params: {
                api_key: process.env.TMDB_API_KEY,
                language: "en-US",
              },
            }
          );
          const m = tmdbRes.data;
          return {
            ...r,
            movie: {
              id: m.id,
              title: m.title,
              poster: m.poster_path
                ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                : null,
            },
          };
        } catch (tmdbErr) {
          console.error(
            `TMDB fetch failed for movieId=${r.movieId}:`,
            tmdbErr.message
          );
          return {
            ...r,
            movie: { id: r.movieId, title: "Unknown", poster: null },
          };
        }
      })
    );

    res.json(enhanced);
  } catch (err) {
    console.error("Error fetching user reviews:", err);
    res.status(500).json({ message: "Error fetching user reviews" });
  }
});

export default router;
