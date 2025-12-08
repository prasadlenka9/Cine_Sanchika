// import React, { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { ThemeContext } from "../App.jsx";

// export default function SignUp() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { setIsLoggedIn } = useContext(ThemeContext);

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
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
//         setError(data.message || "Signup failed");
//       }
//     } catch (err) {
//       setError("Server error. Make sure the backend is running!");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-white p-4">
//       <form
//         onSubmit={handleSignup}
//         className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center text-pink-600">
//           Sign Up
//         </h2>

//         {error && (
//           <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
//         )}

//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
//           required
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
//         >
//           Sign Up
//         </button>

//         <p className="text-center mt-4 text-gray-600">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-pink-600 font-semibold hover:underline"
//           >
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }



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

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setErr("");
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
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
//       <h2 className="text-2xl mb-4">Sign Up</h2>
//       {err && <div className="text-red-600 mb-2">{err}</div>}
//       <form onSubmit={handleSignup} className="flex flex-col gap-3">
//         <input className="border p-2 rounded" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
//         <input className="border p-2 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
//         <input className="border p-2 rounded" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
//         <button className="bg-green-600 text-white py-2 rounded">Sign Up</button>
//       </form>
//     </div>
//   );
// }










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

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setErr("");
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
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
//         <h2 className="text-2xl font-bold mb-4 text-center text-burgundy-600">Sign Up</h2>

//         {err && <div className="text-red-600 mb-4 text-center">{err}</div>}

//         <form onSubmit={handleSignup} className="flex flex-col gap-4">
//           <input
//             className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <input
//             className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }







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

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setErr("");
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
//     <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gold-600 via-gray-100 to-burgundy-600 ovrerflow-hidden p-0">
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
//       </div>
//     </div>
//   );
// }








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

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setErr("");
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



// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { ThemeContext } from "../App";
// import { GoogleLogin } from "@react-oauth/google";

// export default function Signup() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState("");
//   const navigate = useNavigate();
//   const { setIsLoggedIn } = useContext(ThemeContext);

//   const validatePassword = (pwd) => /.{8,}/.test(pwd) && /[A-Z]/.test(pwd);

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setErr("");

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
//       } else setErr(data.message || "Signup failed");
//     } catch (err) {
//       console.error(err);
//       setErr("Server error. Make sure backend is running.");
//     }
//   };

//   const handleGoogleLogin = async (credentialResponse) => {
//     setErr("");
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/google", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token: credentialResponse.credential }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         localStorage.setItem("token", data.token);
//         setIsLoggedIn(true);
//         navigate("/");
//       } else setErr(data.message || "Google login failed");
//     } catch (err) {
//       console.error(err);
//       setErr("Google login server error.");
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gold-600 via-gray-100 to-burgundy-600 p-0">
//       <div className="w-full max-w-sm bg-white/90 p-8 rounded-2xl shadow-2xl transform transition hover:scale-105 hover:shadow-3xl">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-burgundy-600">Create Account</h2>
//         {err && <div className="text-red-600 mb-4 text-center animate-pulse">{err}</div>}

//         <form onSubmit={handleSignup} className="flex flex-col gap-5">
//           <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-3 rounded-lg focus:ring-2 focus:ring-gold-600" required />
//           <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-3 rounded-lg focus:ring-2 focus:ring-gold-600" required />
//           <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-3 rounded-lg focus:ring-2 focus:ring-gold-600" required />
//           <button className="bg-burgundy-600 hover:bg-gold-600 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105 hover:shadow-xl">Sign Up</button>
//         </form>

//         <div className="my-5 flex justify-center">
//           <GoogleLogin onSuccess={handleGoogleLogin} onError={() => setErr("Google login failed")} />
//         </div>

//         <p className="mt-6 text-center text-gray-700">
//           Already have an account?{" "}
//           <span onClick={() => navigate("/login")} className="text-burgundy-600 font-semibold cursor-pointer hover:underline">Log in</span>
//         </p>
//       </div>
//     </div>
//   );
// }



import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";
import { GoogleLogin } from "@react-oauth/google";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn, setToken } = useContext(ThemeContext);


  const validatePassword = (pwd) => /(?=.*[A-Z]).{8,}/.test(pwd);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErr("");
    if (!validatePassword(password)) {
      setErr("Password must be at least 8 characters and include one uppercase letter.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);   // <-- replace localStorage set
        navigate("/");
      } else setErr(data.message || "Signup failed");
    } catch (err) {
      console.error(err);
      setErr("Server error. Make sure backend is running.");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setErr("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await res.json();
      if (res.ok) {
  setToken(data.token);   // <-- replace localStorage set
  navigate("/");
}
 else setErr(data.message || "Google login failed");
    } catch (err) {
      console.error(err);
      setErr("Google login server error.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gold-600 via-gray-100 to-burgundy-600 overflow-hidden p-0">
      <div className="w-full max-w-sm bg-white/90 p-8 rounded-2xl shadow-2xl 
                      transform transition duration-500 hover:scale-105 hover:shadow-3xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-burgundy-600 tracking-wide">Create Account</h2>

        {err && <div className="text-red-600 mb-4 text-center animate-pulse">{err}</div>}

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <input className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600 transition duration-300" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600 transition duration-300" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600 transition duration-300" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="bg-burgundy-600 hover:bg-gold-600 text-white py-3 rounded-lg font-semibold transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl">Sign Up</button>
        </form>

        <div className="my-5 flex justify-center">
          <GoogleLogin onSuccess={handleGoogleLogin} onError={() => setErr("Google login failed")} />
        </div>

        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-burgundy-600 font-semibold cursor-pointer hover:underline">Log in</span>
        </p>
      </div>
    </div>
  );
}
