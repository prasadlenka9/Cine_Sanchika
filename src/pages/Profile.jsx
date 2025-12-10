import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Minus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchMovie, setSearchMovie] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeSlot, setActiveSlot] = useState(null);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});


  const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchProfile();
    }
  }, []);

  async function fetchProfile() {
    try {
      const res = await api.get("/api/users/me");
      setUser(res.data);
      setLoading(false);
    } catch (err) {
      console.error("fetch profile error", err);
      setLoading(false);
    }
  }

  async function handleMovieSearch(query) {
    setSearchMovie(query);
    if (!query) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(
          query
        )}`
      );
      setSearchResults(res.data.results || []);
    } catch (err) {
      console.error("TMDB search error", err);
      setSearchResults([]);
    }
  }

  async function addFavorite(movie, slotIndex) {
    try {
      const res = await api.post("/api/users/topFavorites/add", {
        movie: {
          id: String(movie.id),
          title: movie.title,
          poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "",
        },
      });
      setUser((p) => ({ ...p, topFavorites: res.data }));
      setActiveSlot(null);
      setSearchMovie("");
      setSearchResults([]);
    } catch (err) {
      console.error("add fav error", err);
      alert(err.response?.data?.message || "Failed to add favorite");
    }
  }

  async function removeFavorite(slotIndex) {
    try {
      const movie = user.topFavorites[slotIndex];
      if (!movie) return;
      const res = await api.post("/api/users/topFavorites/remove", {
        movieId: movie.id,
      });
      setUser((p) => ({ ...p, topFavorites: res.data }));
    } catch (err) {
      console.error("remove fav error", err);
    }
  }

  function openFollowers() {
    setFollowersList(user.followers || []);
    setShowFollowersModal(true);
  }

  function openFollowing() {
    setFollowingList(user.following || []);
    setShowFollowingModal(true);
  }

  if (loading) return <div className="p-6">Loading profile...</div>;
  if (!user) return <div className="p-6">Please log in.</div>;

  const favoriteSlots = Array.from(
    { length: 3 },
    (_, i) => user.topFavorites?.[i] || null
  );

  return (
    <div
      className="min-h-screen p-6 text-gray-800"
      style={{ background: "linear-gradient(to bottom right, #f0f9ff, #e6f7ff)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-6 rounded-xl shadow-md">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-blue-800">{user.username}</h2>
            <p className="text-gray-500 mt-1">{user.email}</p>
          </div>
        </div>

        {/* Top Favorites */}
        <div className="mt-6 text-center font-semibold text-lg text-blue-700">
          Top Favorites
        </div>

        {/* Favorites Grid */}
        <div className="flex justify-center gap-4 mt-4">
          {favoriteSlots.map((m, idx) => (
            <div
              key={idx}
              className="w-36 h-52 rounded overflow-hidden bg-white shadow cursor-pointer hover:shadow-lg transition relative"
            >
              {m ? (
                <>
                  <img
                    src={m.poster || "/default-poster.png"}
                    alt={m.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                    onClick={() => removeFavorite(idx)}
                  >
                    <Minus size={14} />
                  </button>
                </>
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-gray-400 text-sm border border-dashed rounded hover:bg-gray-100 transition"
                  onClick={() => setActiveSlot(idx)}
                >
                  <Plus size={22} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Followers & Following */}
        <div className="flex justify-center gap-10 mt-6">
          <div className="text-center cursor-pointer" onClick={openFollowers}>
            <div className="text-xl font-bold text-blue-800">
            <div className="text-xs text-gray-600">Followers</div>
              {user.followers?.length || 0}
            </div>
          </div>
          <div className="text-center cursor-pointer" onClick={openFollowing}>
            <div className="text-xl font-bold text-blue-800">
            <div className="text-xs text-gray-600">Following</div>
              {user.following?.length || 0}
            </div>
          </div>
        </div>

        {/* Movie Search */}
        {activeSlot !== null && (
          <div className="mt-6 bg-white p-3 rounded shadow-md w-64 mx-auto">
            <input
              type="text"
              value={searchMovie}
              onChange={(e) => handleMovieSearch(e.target.value)}
              placeholder="Search movie..."
              className="w-60 border p-2 text-sm rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            <div className="mt-2 max-h-48 overflow-y-auto">
              {searchResults.map((movie) => (
                <div
                  key={movie.id}
                  className="flex items-center gap-2 p-2 hover:bg-blue-50 cursor-pointer rounded"
                  onClick={() => addFavorite(movie, activeSlot)}
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                        : "/default-poster.png"
                    }
                    alt={movie.title}
                    className="w-10 h-14 object-cover rounded"
                  />
                  <span className="text-sm">{movie.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Followers Modal */}
{showFollowersModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl max-w-sm w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-blue-800">Followers</h3>
        <button onClick={() => setShowFollowersModal(false)}>
          <X size={20} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
        {followersList.length === 0 && (
          <div className="text-gray-500 col-span-2">No followers</div>
        )}
        {followersList.map((username, idx) => (
          <div
            key={idx}
            className="p-3 border rounded-lg text-center cursor-pointer hover:bg-blue-50"
            onClick={() => navigate(`/user/${username}`)}
          >
            {username}
          </div>
        ))}
      </div>
    </div>
  </div>
)}

{/* Following Modal */}
{showFollowingModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl max-w-sm w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-blue-800">Following</h3>
        <button onClick={() => setShowFollowingModal(false)}>
          <X size={20} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
        {followingList.length === 0 && (
          <div className="text-gray-500 col-span-2">Not following anyone</div>
        )}
        {followingList.map((username, idx) => (
          <div
            key={idx}
            className="p-3 border rounded-lg text-center cursor-pointer hover:bg-blue-50"
            onClick={() => navigate(`/user/${username}`)}
          >
            {username}
          </div>
        ))}
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Plus, Minus, X } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import jwt_decode from "jwt-decode"; // Correct import

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchMovie, setSearchMovie] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [activeSlot, setActiveSlot] = useState(null);
//   const [showFollowersModal, setShowFollowersModal] = useState(false);
//   const [showFollowingModal, setShowFollowingModal] = useState(false);
//   const [followersList, setFollowersList] = useState([]);
//   const [followingList, setFollowingList] = useState([]);

//   const navigate = useNavigate();
//   const { username } = useParams();
//   const token = localStorage.getItem("token");

//   let loggedInUsername = null;
//   if (token) {
//     try {
//       const decoded = jwt_decode(token);
//       loggedInUsername = decoded.username; // adjust if JWT uses different field
//     } catch (err) {
//       console.warn("Invalid or expired token", err);
//       localStorage.removeItem("token");
//       navigate("/login");
//     }
//   }

//   const isCurrentUser = !username || username === loggedInUsername;

//   const api = axios.create({
//     baseURL: "http://localhost:5000",
//     headers: token ? { Authorization: `Bearer ${token}` } : {},
//   });

//   const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//     } else {
//       fetchProfile();
//     }
//   }, []);

//   async function fetchProfile() {
//     try {
//       const url = isCurrentUser ? "/api/users/me" : `/api/users/${username}`;
//       const res = await api.get(url);

//       setUser(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("fetch profile error", err);
//       setLoading(false);
//     }
//   }

//   async function handleMovieSearch(query) {
//     setSearchMovie(query);
//     if (!query) {
//       setSearchResults([]);
//       return;
//     }
//     try {
//       const res = await axios.get(
//         `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}`
//       );
//       setSearchResults(res.data.results || []);
//     } catch (err) {
//       console.error("TMDB search error", err);
//       setSearchResults([]);
//     }
//   }

//   async function addFavorite(movie, slotIndex) {
//     try {
//       const res = await api.post("/api/users/topFavorites/add", {
//         movie: {
//           id: String(movie.id),
//           title: movie.title,
//           poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "",
//         },
//       });
//       setUser((p) => ({ ...p, topFavorites: res.data }));
//       setActiveSlot(null);
//       setSearchMovie("");
//       setSearchResults([]);
//     } catch (err) {
//       console.error("add fav error", err);
//       alert(err.response?.data?.message || "Failed to add favorite");
//     }
//   }

//   async function removeFavorite(slotIndex) {
//     try {
//       const movie = user.topFavorites[slotIndex];
//       if (!movie) return;
//       const res = await api.post("/api/users/topFavorites/remove", {
//         movieId: movie.id,
//       });
//       setUser((p) => ({ ...p, topFavorites: res.data }));
//     } catch (err) {
//       console.error("remove fav error", err);
//     }
//   }

//   function openFollowers() {
//     setFollowersList(user.followers || []);
//     setShowFollowersModal(true);
//   }

//   function openFollowing() {
//     setFollowingList(user.following || []);
//     setShowFollowingModal(true);
//   }

//   if (loading) return <div className="p-6">Loading profile...</div>;
//   if (!user) return <div className="p-6">Please log in.</div>;

//   const favoriteSlots = Array.from({ length: 3 }, (_, i) => user.topFavorites?.[i] || null);

//   return (
//     <div
//       className="min-h-screen p-6 text-gray-800"
//       style={{ background: "linear-gradient(to bottom right, #f0f9ff, #e6f7ff)" }}
//     >
//       <div className="max-w-4xl mx-auto">
//         {/* Profile Header */}
//         <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-6 rounded-xl shadow-md">
//           <div className="flex-1 text-center md:text-left">
//             <h2 className="text-2xl font-bold text-blue-800">{user.username}</h2>
//             <p className="text-gray-500 mt-1">{user.email}</p>
//           </div>
//         </div>

//         {/* Top Favorites */}
//         <div className="mt-6 text-center font-semibold text-lg text-blue-700">
//           Top Favorites
//         </div>

//         {/* Favorites Grid */}
//         <div className="flex justify-center gap-4 mt-4">
//           {favoriteSlots.map((m, idx) => (
//             <div
//               key={idx}
//               className="w-36 h-52 rounded overflow-hidden bg-white shadow cursor-pointer hover:shadow-lg transition relative"
//             >
//               {m ? (
//                 <>
//                   <img src={m.poster || "/default-poster.png"} alt={m.title} className="w-full h-full object-cover" />
//                   {isCurrentUser && (
//                     <button
//                       className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
//                       onClick={() => removeFavorite(idx)}
//                     >
//                       <Minus size={14} />
//                     </button>
//                   )}
//                 </>
//               ) : (
//                 <div
//                   className="w-full h-full flex items-center justify-center text-gray-400 text-sm border border-dashed rounded hover:bg-gray-100 transition"
//                   onClick={isCurrentUser ? () => setActiveSlot(idx) : undefined}
//                 >
//                   {isCurrentUser && <Plus size={22} />}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Followers & Following */}
//         <div className="flex justify-center gap-10 mt-6">
//           <div className="text-center cursor-pointer" onClick={openFollowers}>
//             <div className="text-xl font-bold text-blue-800">
//               <div className="text-xs text-gray-600">Followers</div>
//               {user.followers?.length || 0}
//             </div>
//           </div>
//           <div className="text-center cursor-pointer" onClick={openFollowing}>
//             <div className="text-xl font-bold text-blue-800">
//               <div className="text-xs text-gray-600">Following</div>
//               {user.following?.length || 0}
//             </div>
//           </div>
//         </div>

//         {/* Movie Search */}
//         {activeSlot !== null && (
//           <div className="mt-6 bg-white p-3 rounded shadow-md w-64 mx-auto">
//             <input
//               type="text"
//               value={searchMovie}
//               onChange={(e) => handleMovieSearch(e.target.value)}
//               placeholder="Search movie..."
//               className="w-60 border p-2 text-sm rounded focus:outline-none focus:ring focus:border-blue-300"
//             />
//             <div className="mt-2 max-h-48 overflow-y-auto">
//               {searchResults.map((movie) => (
//                 <div
//                   key={movie.id}
//                   className="flex items-center gap-2 p-2 hover:bg-blue-50 cursor-pointer rounded"
//                   onClick={() => addFavorite(movie, activeSlot)}
//                 >
//                   <img
//                     src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : "/default-poster.png"}
//                     alt={movie.title}
//                     className="w-10 h-14 object-cover rounded"
//                   />
//                   <span className="text-sm">{movie.title}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Followers Modal */}
//         {showFollowersModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-xl max-w-sm w-full">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-bold text-blue-800">Followers</h3>
//                 <button onClick={() => setShowFollowersModal(false)}>
//                   <X size={20} />
//                 </button>
//               </div>
//               <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
//                 {followersList.length === 0 && <div className="text-gray-500 col-span-2">No followers</div>}
//                 {followersList.map((username, idx) => (
//                   <div
//                     key={idx}
//                     className="p-3 border rounded-lg text-center cursor-pointer hover:bg-blue-50"
//                     onClick={() => navigate(`/user/${username}`)}
//                   >
//                     {username}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Following Modal */}
//         {showFollowingModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-xl max-w-sm w-full">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-bold text-blue-800">Following</h3>
//                 <button onClick={() => setShowFollowingModal(false)}>
//                   <X size={20} />
//                 </button>
//               </div>
//               <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
//                 {followingList.length === 0 && <div className="text-gray-500 col-span-2">Not following anyone</div>}
//                 {followingList.map((username, idx) => (
//                   <div
//                     key={idx}
//                     className="p-3 border rounded-lg text-center cursor-pointer hover:bg-blue-50"
//                     onClick={() => navigate(`/user/${username}`)}
//                   >
//                     {username}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
