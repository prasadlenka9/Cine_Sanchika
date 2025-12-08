// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function UserProfile() {
//   const { username } = useParams();
//   const [data, setData] = useState(null);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const token = localStorage.getItem("token");
//   const api = axios.create({ baseURL: "http://localhost:5000", headers: token ? { Authorization: `Bearer ${token}` } : {} });

//   useEffect(() => {
//     fetchUser();
//   }, [username]);

//   async function fetchUser() {
//     try {
//       const res = await api.get(`/api/users/username/${username}`);
//       setData(res.data);
//       if (token) {
//         const me = await api.get("/api/users/me");
//         setIsFollowing(me.data.following.includes(username));
//       }
//     } catch (err) {
//       console.error("fetch user", err);
//     }
//   }

//   async function handleFollow() {
//     try {
//       await api.post(`/api/users/follow/${username}`);
//       setIsFollowing(true);
//       fetchUser();
//     } catch (err) {
//       console.error("follow err", err);
//       alert(err.response?.data?.message || "Failed to follow");
//     }
//   }

//   async function handleUnfollow() {
//     try {
//       await api.post(`/api/users/unfollow/${username}`);
//       setIsFollowing(false);
//       fetchUser();
//     } catch (err) {
//       console.error("unfollow err", err);
//       alert(err.response?.data?.message || "Failed to unfollow");
//     }
//   }

//   if (!data) return <div className="p-6">Loading...</div>;

//   const { user, recentReviews, reviewCount } = data;

//   return (
//     <div className="min-h-screen bg-slate-50 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
//         <div className="flex items-center gap-4">
//           <img src={user.profilePhoto ? `http://localhost:5000/uploads/${user.profilePhoto}` : '/default-profile.png'} className="w-24 h-24 rounded-full object-cover" />
//           <div>
//             <h2 className="text-2xl font-bold">{user.username}</h2>
//             <div className="text-sm text-gray-600">{user.email}</div>
//             <div className="mt-2 text-sm text-gray-700">Reviews: {reviewCount}</div>
//           </div>
//           <div className="ml-auto">
//             {token ? (
//               isFollowing ? (
//                 <button onClick={handleUnfollow} className="bg-red-500 text-white px-3 py-1 rounded">Unfollow</button>
//               ) : (
//                 <button onClick={handleFollow} className="bg-blue-600 text-white px-3 py-1 rounded">Follow</button>
//               )
//             ) : (
//               <div className="text-sm text-gray-500">Log in to follow</div>
//             )}
//           </div>
//         </div>

//         <div className="mt-6">
//           <h3 className="font-semibold mb-2">Top Favorites</h3>
//           <div className="grid grid-cols-3 gap-3">
//             {(user.topFavorites || []).slice(0,3).map((m) => (
//               <div key={m.id} className="rounded overflow-hidden">
//                 <img src={m.poster || '/default-poster.png'} className="w-full h-36 object-cover" />
//                 <div className="p-2 text-sm">{m.title}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="mt-6">
//           <h3 className="font-semibold mb-2">Recent Reviews</h3>
//           <div className="space-y-3">
//             {recentReviews.map(r => (
//               <div key={r._id} className="p-3 border rounded">
//                 <div className="flex items-center justify-between">
//                   <div className="text-sm font-medium">Movie: {r.movieId || r.movieId}</div>
//                   <div className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</div>
//                 </div>
//                 <div className="mt-2 text-sm">{r.review}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }













// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function UserProfile() {
//   const { username } = useParams();
//   const [data, setData] = useState(null);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const token = localStorage.getItem("token");

//   const api = axios.create({
//     baseURL: "http://localhost:5000",
//     headers: token ? { Authorization: `Bearer ${token}` } : {},
//   });

//   useEffect(() => {
//     fetchUser();
//   }, [username]);

//   async function fetchUser() {
//     try {
//       const res = await api.get(`/api/users/username/${username}`);
//       setData(res.data);

//       if (token) {
//         const me = await api.get("/api/users/me");
//         setIsFollowing(me.data.following.includes(username));
//       }
//     } catch (err) {
//       console.error("fetch user", err);
//     }
//   }

//   async function handleFollow() {
//     try {
//       await api.post(`/api/users/follow/${username}`);
//       setIsFollowing(true);
//       fetchUser();
//     } catch (err) {
//       console.error("follow err", err);
//       alert(err.response?.data?.message || "Failed to follow");
//     }
//   }

//   async function handleUnfollow() {
//     try {
//       await api.post(`/api/users/unfollow/${username}`);
//       setIsFollowing(false);
//       fetchUser();
//     } catch (err) {
//       console.error("unfollow err", err);
//       alert(err.response?.data?.message || "Failed to unfollow");
//     }
//   }

//   if (!data) return <div className="p-6">Loading...</div>;

//   const { user, recentReviews, reviewCount } = data;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//   <div className="max-w-4xl mx-auto">

//     {/* Profile Header */}
//     <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-6 rounded-xl shadow-md">
//       <div className="flex-1">
//         <h2 className="text-2xl font-bold text-gray-800">{user.username}</h2>
//         <p className="text-gray-500 mt-1">{user.email}</p>
//         <p className="mt-2 text-gray-700">Reviews: <span className="font-medium">{reviewCount}</span></p>
//       </div>

//       {/* Follow/Unfollow */}
//       <div>
//         {token ? (
//           isFollowing ? (
//             <button
//               onClick={handleUnfollow}
//               className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg shadow"
//             >
//               Unfollow
//             </button>
//           ) : (
//             <button
//               onClick={handleFollow}
//               className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg shadow"
//             >
//               Follow
//             </button>
//           )
//         ) : (
//           <div className="text-gray-500 text-sm">Log in to follow</div>
//         )}
//       </div>
//     </div>

//     {/* Top Favorites */}
//     <div className="mt-8">
//       <h3 className="text-lg font-semibold text-gray-700 mb-4">Top Favorites</h3>
//       <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//         {(user.topFavorites || []).slice(0,3).map((m) => (
//           <div
//             key={m.id}
//             className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-200"
//           >
//             <img
//               src={m.poster ? m.poster : "/default-poster.png"}
//               className="w-full h-48 object-contain"
//               alt={m.title}
//             />
//             <div className="p-2 text-center text-gray-800 font-medium text-sm">{m.title}</div>
//           </div>
//         ))}
//       </div>
//     </div>

//   </div>
// </div>

//   );
// }










// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { X } from "lucide-react";

// export default function UserProfile() {
//   const { username } = useParams();
//   const [data, setData] = useState(null);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [showFollowersModal, setShowFollowersModal] = useState(false);
//   const [showFollowingModal, setShowFollowingModal] = useState(false);
//   const [followersList, setFollowersList] = useState([]);
//   const [followingList, setFollowingList] = useState([]);

//   const token = localStorage.getItem("token");

//   const api = axios.create({
//     baseURL: "http://localhost:5000",
//     headers: token ? { Authorization: `Bearer ${token}` } : {},
//   });

//   useEffect(() => {
//     fetchUser();
//   }, [username]);

//   async function fetchUser() {
//     try {
//       const res = await api.get(`/api/users/username/${username}`);
//       setData(res.data);

//       if (token) {
//         const me = await api.get("/api/users/me");
//         setIsFollowing(me.data.following.includes(username));
//       }
//     } catch (err) {
//       console.error("fetch user", err);
//     }
//   }

//   async function handleFollow() {
//     try {
//       await api.post(`/api/users/follow/${username}`);
//       setIsFollowing(true);
//       fetchUser();
//     } catch (err) {
//       console.error("follow err", err);
//       alert(err.response?.data?.message || "Failed to follow");
//     }
//   }

//   async function handleUnfollow() {
//     try {
//       await api.post(`/api/users/unfollow/${username}`);
//       setIsFollowing(false);
//       fetchUser();
//     } catch (err) {
//       console.error("unfollow err", err);
//       alert(err.response?.data?.message || "Failed to unfollow");
//     }
//   }

//   function openFollowers() {
//     setFollowersList(data.user.followers || []);
//     setShowFollowersModal(true);
//   }

//   function openFollowing() {
//     setFollowingList(data.user.following || []);
//     setShowFollowingModal(true);
//   }

//   if (!data) return <div className="p-6">Loading...</div>;

//   const { user, reviewCount } = data;

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">

//         {/* Profile Header */}
//         <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-6 rounded-xl shadow-md">
//           <div className="flex-1">
//             <h2 className="text-2xl font-bold text-gray-800">{user.username}</h2>
//             <p className="text-gray-500 mt-1">{user.email}</p>
//             <p className="mt-2 text-gray-700">Reviews: <span className="font-medium">{reviewCount}</span></p>

//             {/* Followers & Following */}
//             <div className="flex justify-start gap-6 mt-4">
//               <div className="text-center cursor-pointer" onClick={openFollowers}>
//                 <div className="text-lg font-semibold text-gray-800">{user.followers?.length || 0}</div>
//                 <div className="text-xs text-gray-500">Followers</div>
//               </div>
//               <div className="text-center cursor-pointer" onClick={openFollowing}>
//                 <div className="text-lg font-semibold text-gray-800">{user.following?.length || 0}</div>
//                 <div className="text-xs text-gray-500">Following</div>
//               </div>
//             </div>
//           </div>

//           {/* Follow/Unfollow */}
//           <div>
//             {token ? (
//               isFollowing ? (
//                 <button
//                   onClick={handleUnfollow}
//                   className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg shadow"
//                 >
//                   Unfollow
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleFollow}
//                   className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg shadow"
//                 >
//                   Follow
//                 </button>
//               )
//             ) : (
//               <div className="text-gray-500 text-sm">Log in to follow</div>
//             )}
//           </div>
//         </div>

// {/* Top Favorites */}
// <div className="mt-8 text-center">
//   <h3 className="text-lg font-semibold text-gray-700 mb-4">Top Favorites</h3>
//   <div className="flex justify-center flex-wrap gap-6">
//     {(user.topFavorites || []).slice(0, 6).map((m) => (
//       <div
//         key={m.id}
//         className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-200 w-40"
//       >
//         <img
//           src={m.poster ? m.poster : "/default-poster.png"}
//           className="w-full h-56 object-contain"
//           alt={m.title}
//         />
//         <div className="p-2 text-center text-gray-800 font-medium text-sm">{m.title}</div>
//       </div>
//     ))}
//   </div>
// </div>

//       </div>

//       {/* Followers Modal */}
//       {showFollowersModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-lg w-80 max-h-[70vh] overflow-y-auto p-4 relative">
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
//               onClick={() => setShowFollowersModal(false)}
//             >
//               <X />
//             </button>
//             <h3 className="text-lg font-semibold mb-3">Followers</h3>
//             {followersList.length === 0 ? (
//               <div className="text-gray-500 text-sm">No followers</div>
//             ) : (
//               <ul className="space-y-2">
//                 {followersList.map((f, idx) => (
//                   <li key={idx} className="p-2 bg-gray-100 rounded">{f}</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Following Modal */}
//       {showFollowingModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-lg w-80 max-h-[70vh] overflow-y-auto p-4 relative">
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
//               onClick={() => setShowFollowingModal(false)}
//             >
//               <X />
//             </button>
//             <h3 className="text-lg font-semibold mb-3">Following</h3>
//             {followingList.length === 0 ? (
//               <div className="text-gray-500 text-sm">Not following anyone</div>
//             ) : (
//               <ul className="space-y-2">
//                 {followingList.map((f, idx) => (
//                   <li key={idx} className="p-2 bg-gray-100 rounded">{f}</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function UserProfile() {
//   const { username } = useParams();
//   const [data, setData] = useState(null);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const token = localStorage.getItem("token");

//   const api = axios.create({
//     baseURL: "http://localhost:5000",
//     headers: token ? { Authorization: `Bearer ${token}` } : {},
//   });

//   useEffect(() => {
//     fetchUser();
//   }, [username]);

//   async function fetchUser() {
//     try {
//       const res = await api.get(`/api/users/username/${username}`);
//       setData(res.data);

//       if (token) {
//         const me = await api.get("/api/users/me");
//         setIsFollowing(me.data.following.includes(username));
//       }
//     } catch (err) {
//       console.error("fetch user", err);
//     }
//   }

//   async function handleFollow() {
//     try {
//       await api.post(`/api/users/follow/${username}`);
//       setIsFollowing(true);
//       fetchUser();
//     } catch (err) {
//       console.error("follow err", err);
//       alert(err.response?.data?.message || "Failed to follow");
//     }
//   }

//   async function handleUnfollow() {
//     try {
//       await api.post(`/api/users/unfollow/${username}`);
//       setIsFollowing(false);
//       fetchUser();
//     } catch (err) {
//       console.error("unfollow err", err);
//       alert(err.response?.data?.message || "Failed to unfollow");
//     }
//   }

//   if (!data) return <div className="p-6">Loading...</div>;

//   const { user, reviewCount } = data;

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">

//         {/* Profile Header */}
//         <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-6 rounded-xl shadow-md">
//           <div className="flex-1">
//             <h2 className="text-2xl font-bold text-gray-800">{user.username}</h2>
//             <p className="text-gray-500 mt-1">{user.email}</p>
//             <p className="mt-2 text-gray-700">
//               Reviews: <span className="font-medium">{reviewCount}</span>
//             </p>
//           </div>

//           {/* Follow/Unfollow */}
//           <div>
//             {token ? (
//               isFollowing ? (
//                 <button
//                   onClick={handleUnfollow}
//                   className="bg-blue-700 transition text-white px-4 py-2 rounded-lg shadow"
//                 >
//                   Unfollow
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleFollow}
//                   className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg shadow"
//                 >
//                   Follow
//                 </button>
//               )
//             ) : (
//               <div className="text-gray-500 text-sm">Log in to follow</div>
//             )}
//           </div>
//         </div>

//         {/* Top Favorites */}
//         <div className="mt-8 text-center">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">Top Favorites</h3>
//           <div className="flex justify-center flex-wrap gap-6">
//             {(user.topFavorites || []).slice(0, 6).map((m) => (
//               <div
//                 key={m.id}
//                 className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-200 w-44"
//               >
//                 <img
//                   src={m.poster ? m.poster : "/default-poster.png"}
//                   className="w-full h-56 object-contain"
//                   alt={m.title}
//                 />
//                 <div className="p-2 text-center text-gray-800 font-medium text-sm">{m.title}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }









// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function UserProfile() {
//   const { username } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [recentReviews, setRecentReviews] = useState([]);
//   const [reviewCount, setReviewCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [isFollowing, setIsFollowing] = useState(false);

//   const token = localStorage.getItem("token");

//   const api = axios.create({
//     baseURL: "http://localhost:5000",
//     headers: token ? { Authorization: `Bearer ${token}` } : {},
//   });

//   useEffect(() => {
//     fetchUserProfile();
//   }, [username]);

//   async function fetchUserProfile() {
//     try {
//       const res = await api.get(`/api/users/username/${username}`);
//       setProfile(res.data.user);
//       setRecentReviews(res.data.recentReviews);
//       setReviewCount(res.data.reviewCount);

//       // get logged in user
//       const me = await api.get("/api/users/me");
//       setIsFollowing(me.data.following.includes(username));
//       setLoading(false);
//     } catch (err) {
//       console.error("fetch user profile error", err);
//       setLoading(false);
//     }
//   }

//   async function toggleFollow() {
//     try {
//       if (isFollowing) {
//         await api.post(`/api/users/unfollow/${username}`);
//         setIsFollowing(false);
//       } else {
//         await api.post(`/api/users/follow/${username}`);
//         setIsFollowing(true);
//       }
//       fetchUserProfile();
//     } catch (err) {
//       console.error("follow/unfollow error", err);
//     }
//   }

//   if (loading) return <div className="p-6">Loading profile...</div>;
//   if (!profile) return <div className="p-6">User not found</div>;

//   return (
//     <div
//       className="min-h-screen p-6 text-gray-800"
//       style={{ background: "linear-gradient(to bottom right, #f0f9ff, #e6f7ff)" }}
//     >
//       <div className="max-w-4xl mx-auto">
//         {/* Profile Header */}
//         <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-xl shadow-md">
//           <div className="flex-1 text-center md:text-left">
//             <h2 className="text-2xl font-bold text-blue-800">{profile.username}</h2>
//             <p className="text-gray-500 mt-1">{profile.email}</p>
//           </div>
//           {/* Follow / Unfollow */}
//           <div>
//             <button
//               onClick={toggleFollow}
//               className={`px-4 py-2 rounded-lg font-semibold ${
//                 isFollowing ? "bg-red-500 text-white" : "bg-blue-600 text-white"
//               }`}
//             >
//               {isFollowing ? "Unfollow" : "Follow"}
//             </button>
//           </div>
//         </div>

//         {/* Top Favorites */}
//         <div className="mt-6 text-center font-semibold text-lg text-blue-700">
//           {profile.username}'s Top Favorites
//         </div>
//         <div className="flex justify-center gap-4 mt-4">
//           {profile.topFavorites?.length > 0 ? (
//             profile.topFavorites.map((m, idx) => (
//               <div
//                 key={idx}
//                 className="w-36 h-52 rounded overflow-hidden bg-white shadow"
//               >
//                 <img
//                   src={m.poster || "/default-poster.png"}
//                   alt={m.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No favorites yet</p>
//           )}
//         </div>

//         {/* Followers & Following */}
//         <div className="flex justify-center gap-10 mt-6">
//           <div className="text-center">
//             <div className="text-xl font-bold text-blue-800">
//               {profile.followers?.length || 0}
//             </div>
//             <div className="text-xs text-gray-600">Followers</div>
//           </div>
//           <div className="text-center">
//             <div className="text-xl font-bold text-blue-800">
//               {profile.following?.length || 0}
//             </div>
//             <div className="text-xs text-gray-600">Following</div>
//           </div>
//         </div>

//         {/* Recent Reviews */}
//         <div className="mt-10">
//           <h3 className="text-lg font-bold text-blue-800 mb-4">
//             Recent Reviews ({reviewCount})
//           </h3>
//           <div className="space-y-3">
//             {recentReviews.length === 0 && (
//               <div className="text-gray-500">No reviews yet</div>
//             )}
//             {recentReviews.map((review) => (
//               <div
//                 key={review._id}
//                 className="p-4 bg-white rounded-lg shadow-md"
//               >
//                 <p className="text-sm text-gray-700">{review.reviewText}</p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   ⭐ {review.rating} / 10
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }












import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function UserProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [recentReviews, setRecentReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  useEffect(() => {
    fetchUserProfile();
  }, [username]);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get(`/api/users/username/${encodeURIComponent(username)}`);

      setProfile(res.data.user);
      setRecentReviews(res.data.recentReviews);
      setReviewCount(res.data.reviewCount);

      if (token) {
        const me = await api.get("/api/users/me");
        setIsFollowing(me.data.following.includes(username));
      }
      setLoading(false);
    } catch (err) {
      console.error("fetch user profile error", err);
      setLoading(false);
    }
  };

  const toggleFollow = async () => {
    try {
      if (isFollowing) {
        await api.post(`/api/users/unfollow/${username}`);
      } else {
        await api.post(`/api/users/follow/${username}`);
      }
      setIsFollowing(!isFollowing);
      fetchUserProfile();
    } catch (err) {
      console.error("follow/unfollow error", err);
    }
  };

  if (loading) return <div className="p-6">Loading profile...</div>;
  if (!profile) return <div className="p-6">User not found</div>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-xl shadow-md">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-blue-800">{profile.username}</h2>
            <p className="text-gray-500 mt-1">{profile.email}</p>
          </div>
          <div>
            <button
              onClick={toggleFollow}
              className={`px-4 py-2 rounded-lg font-semibold ${
                isFollowing ? "bg-red-500 text-white" : "bg-blue-600 text-white"
              }`}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>

        {/* Top Favorites */}
        <div className="mt-6 text-center font-semibold text-lg text-blue-700">{profile.username}'s Top Favorites</div>
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          {profile.topFavorites?.length > 0 ? (
            profile.topFavorites.map((m, idx) => (
              <div key={idx} className="w-36 h-52 rounded overflow-hidden bg-white shadow">
                <img src={m.poster || "/default-poster.png"} alt={m.title} className="w-full h-full object-cover" />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No favorites yet</p>
          )}
        </div>

        {/* Followers & Following */}
        <div className="flex justify-center gap-10 mt-6">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-800">{profile.followers?.length || 0}</div>
            <div className="text-xs text-gray-600">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-800">{profile.following?.length || 0}</div>
            <div className="text-xs text-gray-600">Following</div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-blue-800 mb-4">
            Recent Reviews ({reviewCount})
          </h3>
          <div className="space-y-3">
            {recentReviews.length === 0 && <div className="text-gray-500">No reviews yet</div>}
            {recentReviews.map((review) => (
              <div key={review._id} className="p-4 bg-white rounded-lg shadow-md">
                <p className="text-sm text-gray-700">{review.reviewText}</p>
                <p className="text-xs text-gray-500 mt-1">⭐ {review.rating} / 10</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
