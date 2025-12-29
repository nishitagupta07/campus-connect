// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { signUp } from '../redux/user/userSlice'; // adjust path as needed

// export default function SignUpAsAlumini() {
//   const [formData, setFormData] = useState({});
//   const [file, setFile] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);

//       const formDataToSend = new FormData();
//       if (file) {
//         formDataToSend.append("photo", file);
//       }

//       // ⚠️ Rename `username` to `name` to match backend model
//       for (const key in formData) {
//         formDataToSend.append(key === "username" ? "name" : key, formData[key]);
//       }

//       // Send using Redux thunk
//       const res = await dispatch(signUp(formDataToSend));

//       if (res.error) {
//         setError(res.payload);
//         setLoading(false);
//         return;
//       }

//       setError(null);
//       setLoading(false);
//       navigate('/sign-in-as-alumini');
//     } catch (err) {
//       setError(err.message || "Signup failed");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
//         <input
//           type="file"
//           accept="image/*"
//           className="border p-3 rounded-lg"
//           onChange={handleFileChange}
//         />
//         <input
//           type="text"
//           placeholder="Username"
//           className="border p-3 rounded-lg"
//           id="username"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Branch"
//           className="border p-3 rounded-lg"
//           id="branch"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Passout Year"
//           className="border p-3 rounded-lg"
//           id="passoutYear"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="url"
//           placeholder="LinkedIn Profile URL"
//           className="border p-3 rounded-lg"
//           id="linkedIn"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-3 rounded-lg"
//           id="email"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-3 rounded-lg"
//           id="password"
//           onChange={handleChange}
//           required
//         />

//         <button
//           disabled={loading}
//           className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
//         >
//           {loading ? 'Loading...' : 'Sign Up'}
//         </button>
//       </form>

//       <div className="flex gap-2 mt-5">
//         <p>Have an account?</p>
//         <Link to="/signin">
//           <span className="text-blue-700">Sign in</span>
//         </Link>
//       </div>

//       {error && <p className="text-red-500 mt-5">{error}</p>}
//     </div>
//   );
// }



import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../redux/user/userSlice'; // adjust path as needed

export default function SignUpAsAlumini() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",                              // New addition by Mehul
    branch: "",
    passoutYear: "",
    linkedIn: ""
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();

      // Attach photo
      if (file) formDataToSend.append("photo", file);

      // Attach all text fields explicitly
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("branch", formData.branch);
      formDataToSend.append("passoutYear", formData.passoutYear);
      formDataToSend.append("linkedIn", formData.linkedIn);

      // Use Redux thunk for signup
      const result = await dispatch(signUp(formDataToSend)).unwrap();

      console.log("Signup success:", result);
      // Navigate to dashboard after successful signup
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err || "Sign Up Failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
        <input
          type="file"
          accept="image/*"
          className="border p-3 rounded-lg"
          onChange={handleFileChange}
        />
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Branch"
          className="border p-3 rounded-lg"
          id="branch"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="Passout Year"
          className="border p-3 rounded-lg"
          id="passoutYear"
          onChange={handleChange}
          required
        />
        <input
          type="url"
          placeholder="LinkedIn Profile URL"
          className="border p-3 rounded-lg"
          id="linkedIn"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
          required
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>

      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
