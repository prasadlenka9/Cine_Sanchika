// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import path from "path";
// import { fileURLToPath } from "url";
// import axios from "axios";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.join(__dirname, ".env") });

// const app = express();
// app.use(cors());
// app.use(express.json());


// app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// if (!process.env.MONGO_URI) {
//   console.error("MONGO_URI missing in .env");
//   process.exit(1);
// }
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));


// const userSchema = new mongoose.Schema(
//   {
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     topFavorites: { type: [{ id: String, title: String, poster: String }], default: [] },
//     followers: { type: [String], default: [] },
//     following: { type: [String], default: [] },
//   },
//   { timestamps: true }
// );
// const User = mongoose.models.User || mongoose.model("User", userSchema);

// // ----------------- Reviews schema & routes -----------------
// const reviewSchema = new mongoose.Schema(
//   {
//     movieId: { type: String, required: true }, // TMDb movie id (string)
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     rating: { type: Number, required: true },
//     reviewText: { type: String, required: true }, // normalized field name
//   },
//   { timestamps: true }
// );
// const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);


// const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });


// const authMiddleware = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Not logged in" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(401).json({ message: "User not found" });
//     req.user = user;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };


// app.post("/api/auth/signup", async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     if (await User.findOne({ $or: [{ email }, { username }] })) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = new User({ username, email, password: hashedPassword });
//     await user.save();

//     const token = generateToken(user._id);
//     res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.post("/api/auth/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = generateToken(user._id);
//     res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });



// app.get("/api/users/me", authMiddleware, async (req, res) => {
//   const { _id, username, email, topFavorites, followers, following } = req.user;
//   res.json({ id: _id, username, email, topFavorites, followers, following });
// });


// app.get("/api/users/username/:username", async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.params.username }).select("-password").lean();
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const recentReviews = await Review.find({ user: user._id }).sort({ createdAt: -1 }).limit(5).lean();
//     const reviewCount = await Review.countDocuments({ user: user._id });
//     res.json({ user, recentReviews, reviewCount });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// app.post("/api/users/topFavorites/add", authMiddleware, async (req, res) => {
//   try {
//     const { movie } = req.body;
//     if (!movie || !movie.id) return res.status(400).json({ message: "Invalid movie" });

//     if (req.user.topFavorites.find((m) => m.id === movie.id))
//       return res.status(400).json({ message: "Already in favorites" });

//     if (req.user.topFavorites.length >= 3)
//       return res.status(400).json({ message: "Max 3 favorites allowed" });

//     req.user.topFavorites.push(movie);
//     await req.user.save();
//     res.json(req.user.topFavorites);
//   } catch (err) {
//     console.error("Add fav error:", err);
//     res.status(500).json({ message: "Failed to add favorite" });
//   }
// });

// app.post("/api/users/topFavorites/remove", authMiddleware, async (req, res) => {
//   try {
//     const { movieId } = req.body;
//     req.user.topFavorites = req.user.topFavorites.filter((m) => m.id !== movieId);
//     await req.user.save();
//     res.json(req.user.topFavorites);
//   } catch (err) {
//     console.error("Remove fav error:", err);
//     res.status(500).json({ message: "Failed to remove favorite" });
//   }
// });


// app.post("/api/users/follow/:username", authMiddleware, async (req, res) => {
//   try {
//     const target = await User.findOne({ username: req.params.username });
//     if (!target) return res.status(404).json({ message: "User to follow not found" });
//     if (req.user.username === target.username)
//       return res.status(400).json({ message: "Cannot follow yourself" });

//     if (!req.user.following.includes(target.username)) req.user.following.push(target.username);
//     if (!target.followers.includes(req.user.username)) target.followers.push(req.user.username);

//     await req.user.save();
//     await target.save();

//     res.json({ following: req.user.following, followers: target.followers });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to follow user" });
//   }
// });

// app.post("/api/users/unfollow/:username", authMiddleware, async (req, res) => {
//   try {
//     const target = await User.findOne({ username: req.params.username });
//     if (!target) return res.status(404).json({ message: "User to unfollow not found" });

//     req.user.following = req.user.following.filter((u) => u !== target.username);
//     target.followers = target.followers.filter((u) => u !== req.user.username);

//     await req.user.save();
//     await target.save();

//     res.json({ following: req.user.following, followers: target.followers });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to unfollow user" });
//   }
// });


// // app.post("/api/reviews", authMiddleware, async (req, res) => {
// //   try {
// //     const { movieId, rating, review } = req.body;
// //     if (!rating || !review) return res.status(400).json({ message: "Rating and review required" });

// //     if (await Review.findOne({ user: req.user._id, movieId }))
// //       return res.status(400).json({ message: "Already reviewed this movie" });

// //     const newReview = new Review({ user: req.user._id, movieId, rating, review });
// //     await newReview.save();
// //     await newReview.populate("user", "username");
// //     res.status(201).json(newReview);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Failed to submit review" });
// //   }
// // });

// // POST /api/reviews  - add a review
// app.post("/api/reviews", authMiddleware, async (req, res) => {
//   try {
//     const { movieId, rating } = req.body;
//     // accept either reviewText or review (backwards compatibility)
//     const reviewText = req.body.reviewText ?? req.body.review;

//     if (!movieId || rating == null || !reviewText) {
//       return res.status(400).json({ message: "movieId, rating and reviewText are required" });
//     }

//     // Prevent duplicate review by same user for same movie
//     if (await Review.findOne({ user: req.user._id, movieId })) {
//       return res.status(400).json({ message: "Already reviewed this movie" });
//     }

//     const newReview = new Review({ user: req.user._id, movieId, rating, reviewText });
//     await newReview.save();
//     await newReview.populate("user", "username"); // attach username
//     res.status(201).json(newReview);
//   } catch (err) {
//     console.error("Failed to submit review:", err);
//     res.status(500).json({ message: "Failed to submit review" });
//   }
// });

// // app.get("/api/reviews/:movieId", async (req, res) => {
// //   try {
// //     const reviews = await Review.find({ movieId: req.params.movieId }).populate("user", "username").sort({ createdAt: -1 });
// //     res.json(reviews);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Failed to fetch reviews" });
// //   }
// // });

// // GET /api/reviews/:movieId  - get reviews for a movie
// app.get("/api/reviews/:movieId", async (req, res) => {
//   try {
//     const reviews = await Review.find({ movieId: req.params.movieId })
//       .populate("user", "username")
//       .sort({ createdAt: -1 });
//     res.json(reviews);
//   } catch (err) {
//     console.error("Failed to fetch reviews:", err);
//     res.status(500).json({ message: "Failed to fetch reviews" });
//   }
// });

// // 🔍 Search users by username (case-insensitive)
// app.get("/api/users/search", async (req, res) => {
//   try {
//     const query = req.query.query;
//     if (!query) return res.json([]);

//     const users = await User.find({
//       username: { $regex: query, $options: "i" },
//     })
//       .select("username email") // don’t expose password
//       .limit(10)
//       .lean();

//     res.json(users);
//   } catch (err) {
//     console.error("User search error:", err);
//     res.status(500).json({ message: "Server error while searching users" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));















// server/server.js

// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
// import axios from "axios";
// import reviewsRoutes from "./routes/reviews.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // load environment specifically from server/.env
// dotenv.config({ path: path.join(__dirname, ".env") });

// const app = express();
// app.use(cors({
//   origin: process.env.CLIENT_URL || "http://localhost:5173",
// }));
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded files

// // ------------ DB connect ------------
// if (!process.env.MONGO_URI) {
//   console.error("MONGO_URI missing in server/.env");
//   process.exit(1);
// }
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch(err => {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
//   });

// // ------------ Schemas ------------
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email:    { type: String, required: true, unique: true },
//   // support either password (current) or legacy passwordHash
//   password: { type: String },        // hashed bcrypt password for new users
//   passwordHash: { type: String },   // legacy field (if present)
//   profilePhoto: { type: String, default: "" },
//   topFavorites: { type: [Object], default: [] }, // each: { id, title, poster }
//   followers: { type: [String], default: [] },
//   following: { type: [String], default: [] },
// }, { timestamps: true });

// const User = mongoose.models.User || mongoose.model("User", userSchema);

// // Multer for profile photo uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, path.join(__dirname, "uploads")),
//   filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`),
// });
// const upload = multer({ storage });

// // JWT helper
// const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || "devsecret", { expiresIn: "7d" });

// // Auth middleware
// const authMiddleware = async (req, res, next) => {
//   const header = req.headers.authorization;
//   const token = header && header.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Not logged in" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "devsecret");
//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(401).json({ message: "User not found" });
//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// // ------------ Routes ------------

// // Signup
// app.post("/api/auth/signup", async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     if (!username || !email || !password) return res.status(400).json({ message: "Missing fields" });
//     if (await User.findOne({ $or: [{ email }, { username }] })) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashed = await bcrypt.hash(password, salt);

//     const user = new User({ username, email, password: hashed });
//     await user.save();

//     const token = generateToken(user._id);
//     res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Login
// app.post("/api/auth/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     if (!email || !password) return res.status(400).json({ message: "Missing fields" });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     // support both fields if DB has legacy passwordHash
//     const hashedPassword = user.password || user.passwordHash;
//     if (!hashedPassword) return res.status(400).json({ message: "No password set for this user" });

//     const isMatch = await bcrypt.compare(password, hashedPassword);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = generateToken(user._id);
//     res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Get current logged-in profile
// app.get("/api/users/me", authMiddleware, (req, res) => {
//   const { _id, username, email, profilePhoto, topFavorites, followers, following } = req.user;
//   res.json({ id: _id, username, email, profilePhoto, topFavorites, followers, following });
// });

// // Public user profile by username
// app.get("/api/users/:username", async (req, res) => {
//   try {
//     const u = await User.findOne({ username: req.params.username }).select("-password -passwordHash");
//     if (!u) return res.status(404).json({ message: "User not found" });
//     res.json(u);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Upload profile photo
// app.post("/api/users/profilePhoto", authMiddleware, upload.single("profilePhoto"), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });
//     req.user.profilePhoto = req.file.filename;
//     await req.user.save();
//     res.json({ profilePhoto: req.file.filename });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Upload failed" });
//   }
// });

// // Add top favorite (max 3)
// app.post("/api/users/topFavorites/add", authMiddleware, async (req, res) => {
//   try {
//     const { movie } = req.body; // movie should be { id, title, poster }
//     if (!movie || !movie.id) return res.status(400).json({ message: "Invalid movie" });

//     if (req.user.topFavorites.find(m => m.id === movie.id)) {
//       return res.status(400).json({ message: "Already added" });
//     }
//     if (req.user.topFavorites.length >= 3) {
//       return res.status(400).json({ message: "Max 3 favorites allowed" });
//     }

//     req.user.topFavorites.push(movie);
//     await req.user.save();
//     res.json(req.user.topFavorites);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to add favorite" });
//   }
// });

// // Remove top favorite
// app.post("/api/users/topFavorites/remove", authMiddleware, async (req, res) => {
//   try {
//     const { movieId } = req.body;
//     req.user.topFavorites = req.user.topFavorites.filter(m => m.id !== movieId);
//     await req.user.save();
//     res.json(req.user.topFavorites);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to remove favorite" });
//   }
// });

// // Follow / unfollow
// app.post("/api/users/follow/:username", authMiddleware, async (req, res) => {
//   try {
//     const target = await User.findOne({ username: req.params.username });
//     if (!target) return res.status(404).json({ message: "Target not found" });
//     if (req.user.username === target.username) return res.status(400).json({ message: "Cannot follow yourself" });

//     if (!req.user.following.includes(target.username)) req.user.following.push(target.username);
//     if (!target.followers.includes(req.user.username)) target.followers.push(req.user.username);

//     await req.user.save();
//     await target.save();
//     res.json({ following: req.user.following, followers: target.followers });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Follow failed" });
//   }
// });

// // Fetch movie details
// app.get("/api/movies/:id", async (req, res) => {
//   try {
//     const response = await axios.get(
//       `${process.env.VITE_TMDB_BASE_URL}/movie/${req.params.id}`,
//       {
//         params: { api_key: process.env.TMDB_API_KEY, language: "en-US" },
//       }
//     );
//     res.json(response.data);
//   } catch (err) {
//     console.error("TMDb Error:", err.message);
//     res.status(500).json({ message: "Failed to fetch movie details" });
//   }
// });

// // Fetch trending movies
// app.get("/api/movies/trending", async (req, res) => {
//   try {
//     const response = await axios.get(
//       `${process.env.VITE_TMDB_BASE_URL}/trending/movie/week`,
//       {
//         params: { api_key: process.env.TMDB_API_KEY, language: "en-US" },
//       }
//     );
//     res.json(response.data.results);
//   } catch (err) {
//     console.error("TMDb Error:", err.message);
//     res.status(500).json({ message: "Failed to fetch trending movies" });
//   }
// });

// app.post("/api/users/unfollow/:username", authMiddleware, async (req, res) => {
//   try {
//     const target = await User.findOne({ username: req.params.username });
//     if (!target) return res.status(404).json({ message: "Target not found" });

//     req.user.following = req.user.following.filter(u => u !== target.username);
//     target.followers = target.followers.filter(u => u !== req.user.username);

//     await req.user.save();
//     await target.save();
//     res.json({ following: req.user.following, followers: target.followers });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Unfollow failed" });
//   }
// });

// app.use("/api/reviews", reviewsRoutes);

// // start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));







// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import path from "path";
// import { fileURLToPath } from "url";
// import { OAuth2Client } from "google-auth-library";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// dotenv.config({ path: path.join(__dirname, ".env") });

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ Serve uploaded files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ✅ MongoDB connection
// if (!process.env.MONGO_URI) {
//   console.error("MONGO_URI missing in .env");
//   process.exit(1);
// }
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // ----------------- Schemas -----------------
// const userSchema = new mongoose.Schema(
//   {
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     topFavorites: { type: [{ id: String, title: String, poster: String }], default: [] },
//     followers: { type: [String], default: [] },
//     following: { type: [String], default: [] },
//   },
//   { timestamps: true }
// );
// const User = mongoose.models.User || mongoose.model("User", userSchema);

// const reviewSchema = new mongoose.Schema(
//   {
//     movieId: { type: String, required: true },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     rating: { type: Number, required: true },
//     reviewText: { type: String, required: true },
//   },
//   { timestamps: true }
// );
// const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

// // ----------------- Helpers -----------------
// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// // ✅ Central auth middleware
// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(401).json({ message: "Invalid token user" });
//     }

//     req.user = user; // attach the user object
//     next();
//   } catch (err) {
//     console.error("Auth error:", err);
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };

// // ----------------- Auth Routes -----------------
// app.post("/api/auth/signup", async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     if (await User.findOne({ $or: [{ email }, { username }] })) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({ username, email, password: hashedPassword });
//     await user.save();

//     const token = generateToken(user._id);
//     res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.post("/api/auth/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = generateToken(user._id);
//     res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.post("/api/auth/google", async (req, res) => {
//   const { token } = req.body; // <- match frontend
//   if (!token) return res.status(400).json({ message: "No token provided" });

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,  // this must be the credential from frontend
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     const { email, name, sub: googleId } = payload;

//     let user = await User.findOne({ email });

//     if (!user) {
//       user = new User({
//         username: name,
//         email,
//         password: googleId,
//       });
//       await user.save();
//     }

//     const tokenJwt = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//     res.json({ token: tokenJwt, user: { id: user._id, username: user.username, email: user.email } });
//   } catch (err) {
//     console.error("Google login error:", err);
//     res.status(500).json({ message: "Google login failed" });
//   }
// });


// // ----------------- User Routes -----------------
// app.get("/api/users/me", authMiddleware, async (req, res) => {
//   const { _id, username, email, topFavorites, followers, following } = req.user;
//   res.json({ id: _id, username, email, topFavorites, followers, following });
// });

// app.get("/api/users/username/:username", async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.params.username }).select("-password").lean();
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const recentReviews = await Review.find({ user: user._id })
//       .populate("user", "username")
//       .sort({ createdAt: -1 })
//       .limit(5)
//       .populate("user", "username")
//       .lean();

//     const reviewCount = await Review.countDocuments({ user: user._id });
//     res.json({ user, recentReviews, reviewCount });
//   } catch (err) {
//     console.error("Get user profile error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Favorites
// app.post("/api/users/topFavorites/add", authMiddleware, async (req, res) => {
//   try {
//     const { movie } = req.body;
//     if (!movie || !movie.id) return res.status(400).json({ message: "Invalid movie" });

//     if (req.user.topFavorites.find((m) => m.id === movie.id))
//       return res.status(400).json({ message: "Already in favorites" });

//     if (req.user.topFavorites.length >= 3)
//       return res.status(400).json({ message: "Max 3 favorites allowed" });

//     req.user.topFavorites.push(movie);
//     await req.user.save();
//     res.json(req.user.topFavorites);
//   } catch (err) {
//     console.error("Add fav error:", err);
//     res.status(500).json({ message: "Failed to add favorite" });
//   }
// });

// app.post("/api/users/topFavorites/remove", authMiddleware, async (req, res) => {
//   try {
//     const { movieId } = req.body;
//     req.user.topFavorites = req.user.topFavorites.filter((m) => m.id !== movieId);
//     await req.user.save();
//     res.json(req.user.topFavorites);
//   } catch (err) {
//     console.error("Remove fav error:", err);
//     res.status(500).json({ message: "Failed to remove favorite" });
//   }
// });

// // Follow/unfollow
// app.post("/api/users/follow/:username", authMiddleware, async (req, res) => {
//   try {
//     const target = await User.findOne({ username: req.params.username });
//     if (!target) return res.status(404).json({ message: "User to follow not found" });
//     if (req.user.username === target.username)
//       return res.status(400).json({ message: "Cannot follow yourself" });

//     if (!req.user.following.includes(target.username)) req.user.following.push(target.username);
//     if (!target.followers.includes(req.user.username)) target.followers.push(req.user.username);

//     await req.user.save();
//     await target.save();

//     res.json({ following: req.user.following, followers: target.followers });
//   } catch (err) {
//     console.error("Follow error:", err);
//     res.status(500).json({ message: "Failed to follow user" });
//   }
// });

// app.post("/api/users/unfollow/:username", authMiddleware, async (req, res) => {
//   try {
//     const target = await User.findOne({ username: req.params.username });
//     if (!target) return res.status(404).json({ message: "User to unfollow not found" });

//     req.user.following = req.user.following.filter((u) => u !== target.username);
//     target.followers = target.followers.filter((u) => u !== req.user.username);

//     await req.user.save();
//     await target.save();

//     res.json({ following: req.user.following, followers: target.followers });
//   } catch (err) {
//     console.error("Unfollow error:", err);
//     res.status(500).json({ message: "Failed to unfollow user" });
//   }
// });

// // 🔍 Search users
// app.get("/api/users/search", async (req, res) => {
//   try {
//     const query = req.query.query;
//     if (!query) return res.json([]);

//     const users = await User.find({
//       username: { $regex: query, $options: "i" },
//     })
//       .select("username email")
//       .limit(10)
//       .lean();

//     res.json(users);
//   } catch (err) {
//     console.error("User search error:", err);
//     res.status(500).json({ message: "Server error while searching users" });
//   }
// });

// // ----------------- Review Routes -----------------
// app.post("/api/reviews", authMiddleware, async (req, res) => {
//   try {
//     const { movieId, rating } = req.body;
//     const reviewText = req.body.reviewText ?? req.body.review;

//     if (!movieId || rating == null || !reviewText) {
//       return res.status(400).json({ message: "movieId, rating and reviewText are required" });
//     }

//     if (await Review.findOne({ user: req.user._id, movieId })) {
//       return res.status(400).json({ message: "Already reviewed this movie" });
//     }

//     const newReview = new Review({ user: req.user._id, movieId, rating, reviewText });
//     await newReview.save();
//     await newReview.populate("user", "username");
//     res.status(201).json(newReview);
//   } catch (err) {
//     console.error("Failed to submit review:", err);
//     res.status(500).json({ message: "Failed to submit review" });
//   }
// });

// app.get("/api/reviews/:movieId", async (req, res) => {
//   try {
//     const reviews = await Review.find({ movieId: req.params.movieId })
//       .populate("user", "username")
//       .sort({ createdAt: -1 });
//     res.json(reviews);
//   } catch (err) {
//     console.error("Failed to fetch reviews:", err);
//     res.status(500).json({ message: "Failed to fetch reviews" });
//   }
// });

// // ----------------- Start Server -----------------
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { ThemeContext } from "../App";

// export default function Signup() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState("");
//   const navigate = useNavigate();
//   const { setIsLoggedIn } = useContext(ThemeContext);

//   // Password validation function
//   const validatePassword = (pwd) => {
//     const minLength = /.{8,}/; // at least 8 chars
//     const upperCase = /[A-Z]/; // at least one uppercase
//     return minLength.test(pwd) && upperCase.test(pwd);
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setErr("");

//     // Check password strength
//     if (!validatePassword(password)) {
//       setErr("Password must be at least 8 characters and include one uppercase letter.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, email, password }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         localStorage.setItem("token", data.token);
//         setIsLoggedIn(true);
//         navigate("/");
//       } else {
//         setErr(data.message || "Signup failed");
//       }
//     } catch (err) {
//       console.error(err);
//       setErr("Server error. Make sure backend is running.");
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gold-600 via-gray-100 to-burgundy-600 overflow-hidden p-0">
//       {/* Signup Box */}
//       <div className="w-full max-w-sm bg-white/90 p-8 rounded-2xl shadow-2xl 
//                       transform transition duration-500 hover:scale-105 hover:shadow-3xl">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-burgundy-600 tracking-wide">
//           Create Account
//         </h2>

//         {err && (
//           <div className="text-red-600 mb-4 text-center animate-pulse">
//             {err}
//           </div>
//         )}

//         <form onSubmit={handleSignup} className="flex flex-col gap-5">
//           <input
//             className="border border-gray-300 p-3 rounded-lg 
//                        focus:outline-none focus:ring-2 focus:ring-gold-600 
//                        transition duration-300"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <input
//             className="border border-gray-300 p-3 rounded-lg 
//                        focus:outline-none focus:ring-2 focus:ring-gold-600 
//                        transition duration-300"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             className="border border-gray-300 p-3 rounded-lg 
//                        focus:outline-none focus:ring-2 focus:ring-gold-600 
//                        transition duration-300"
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button
//             className="bg-burgundy-600 hover:bg-gold-600 text-white py-3 rounded-lg 
//                        font-semibold transition-all duration-500 ease-in-out 
//                        transform hover:scale-105 hover:shadow-xl"
//           >
//             Sign Up
//           </button>
//         </form>

//         {/* Link to Login */}
//         <p className="mt-6 text-center text-gray-700">
//           Already have an account?{" "}
//           <span
//             onClick={() => navigate("/login")}
//             className="text-burgundy-600 font-semibold cursor-pointer hover:underline"
//           >
//             Log in
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }



// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import path from "path";
// import { fileURLToPath } from "url";
// import { OAuth2Client } from "google-auth-library";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config({ path: path.join(__dirname, ".env") });

// const app = express();
// app.use(cors({ origin: process.env.CLIENT_URL }));
// app.use(express.json());

// if (!process.env.MONGO_URI || !process.env.JWT_SECRET || !process.env.GOOGLE_CLIENT_ID) {
//   console.error("Missing required .env variables");
//   process.exit(1);
// }

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// const userSchema = new mongoose.Schema(
//   {
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     topFavorites: { type: [{ id: String, title: String, poster: String }], default: [] },
//     followers: { type: [String], default: [] },
//     following: { type: [String], default: [] },
//   },
//   { timestamps: true }
// );
// const User = mongoose.models.User || mongoose.model("User", userSchema);

// const reviewSchema = new mongoose.Schema(
//   {
//     movieId: { type: String, required: true },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     rating: { type: Number, required: true },
//     reviewText: { type: String, required: true },
//   },
//   { timestamps: true }
// );
// const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) return res.status(401).json({ message: "No token provided" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(401).json({ message: "Invalid token user" });

//     req.user = user;
//     next();
//   } catch (err) {
//     console.error("Auth error:", err);
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // ---------------- Auth Routes ----------------
// app.post("/api/auth/signup", async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     if (await User.findOne({ $or: [{ email }, { username }] })) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ username, email, password: hashedPassword });
//     await user.save();
//     const token = generateToken(user._id);
//     res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.post("/api/auth/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
//     const token = generateToken(user._id);
//     res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.post("/api/auth/google", async (req, res) => {
//   const { token } = req.body;
//   if (!token) return res.status(400).json({ message: "No token provided" });
//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     const payload = ticket.getPayload();
//     const { email, name, sub: googleId } = payload;

//     let user = await User.findOne({ email });
//     if (!user) {
//       user = new User({ username: name, email, password: googleId });
//       await user.save();
//     }

//     const tokenJwt = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//     res.json({ token: tokenJwt, user: { id: user._id, username: user.username, email: user.email } });
//   } catch (err) {
//     console.error("Google login error:", err);
//     res.status(500).json({ message: "Google login failed" });
//   }
// });

// // ---------------- User Routes ----------------
// app.get("/api/users/me", authMiddleware, async (req, res) => {
//   const { _id, username, email, topFavorites, followers, following } = req.user;
//   res.json({ id: _id, username, email, topFavorites, followers, following });
// });

// // ---------------- Friends Activity ----------------
// app.get("/api/reviews/friends", authMiddleware, async (req, res) => {
//   try {
//     const followingUsers = await User.find({ username: { $in: req.user.following } });
//     const followingIds = followingUsers.map((u) => u._id);

//     const recentReviews = await Review.find({ user: { $in: followingIds } })
//       .sort({ createdAt: -1 })
//       .limit(10)
//       .populate("user", "username");

//     res.json(recentReviews);
//   } catch (err) {
//     console.error("Fetch friends activity error:", err);
//     res.status(500).json({ message: "Failed to fetch friends activity" });
//   }
// });

// // ---------------- Reviews ----------------
// app.post("/api/reviews", authMiddleware, async (req, res) => {
//   try {
//     const { movieId, rating, reviewText } = req.body;
//     if (!movieId || rating == null || !reviewText)
//       return res.status(400).json({ message: "movieId, rating and reviewText required" });

//     if (await Review.findOne({ user: req.user._id, movieId }))
//       return res.status(400).json({ message: "Already reviewed this movie" });

//     const newReview = new Review({ user: req.user._id, movieId, rating, reviewText });
//     await newReview.save();
//     await newReview.populate("user", "username");
//     res.status(201).json(newReview);
//   } catch (err) {
//     console.error("Failed to submit review:", err);
//     res.status(500).json({ message: "Failed to submit review" });
//   }
// });

// // ---------------- Start Server ----------------
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));











import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import { OAuth2Client } from "google-auth-library";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// CORS (Render-safe)
app.use(cors());
app.use(express.json());

// Serve React build
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

if (!process.env.MONGO_URI || !process.env.JWT_SECRET || !process.env.GOOGLE_CLIENT_ID) {
  console.error("Missing required .env variables");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ---------------- MODELS ----------------
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    topFavorites: { type: [{ id: String, title: String, poster: String }], default: [] },
    followers: { type: [String], default: [] },
    following: { type: [String], default: [] },
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);

const reviewSchema = new mongoose.Schema(
  {
    movieId: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true },
    reviewText: { type: String, required: true },
  },
  { timestamps: true }
);
const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

// JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Invalid token user" });

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ---------------- AUTH ROUTES ----------------
app.post("/api/auth/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (await User.findOne({ $or: [{ email }, { username }] })) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/auth/google", async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: "No token provided" });
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ username: name, email, password: googleId });
      await user.save();
    }

    const tokenJwt = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token: tokenJwt, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ message: "Google login failed" });
  }
});

// ---- ALL YOUR OTHER ROUTES (favorites, follow, reviews) remain SAME ----

// ---------------- FRONTEND CATCH-ALL ROUTE ----------------
app.get("/*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
