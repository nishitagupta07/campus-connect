import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "../redux/profile/profileSlice";
import API from "../api/axios";

export default function ProfilePage({ userId }) {
  const dispatch = useDispatch();
  const { profiles, loading, error } = useSelector((state) => state.profiles);

  // Local states
  const [profile, setProfile] = useState(null);
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("All Branches");
  const [passoutYear, setPassoutYear] = useState("All Years");
  const [category, setCategory] = useState("All Categories");

  // Fetch single profile using token
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/profiles/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    if (userId) fetchProfile();
  }, [userId]);

  // Fetch all profiles using Redux
  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(fetchProfiles({ search, branch, passoutYear, category, token }));
  }, [dispatch]);

  const handleSearch = () => {
    const token = localStorage.getItem("token");
    dispatch(fetchProfiles({ search, branch, passoutYear, category, token }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 md:px-12 py-10">
      <h1 className="text-4xl font-bold mb-2">Discover Students</h1>
      <p className="text-gray-400 text-lg mb-8">
        Connect with students from various branches and graduation years
      </p>

      {/* Filter Bar */}
      <div className="bg-[#1e293b] p-6 rounded-xl mb-10">
        <div className="mb-4 flex gap-4">
          <input
            type="text"
            placeholder="Search by name, branch, skills, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-3 rounded-md bg-[#334155] text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg font-semibold"
          >
            Search Students
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Branch Filter */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Branch</label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#334155] text-white"
            >
              <option>All Branches</option>
              <option>Computer Science</option>
              <option>Information Technology</option>
              <option>Electronics & Communication</option>
              <option>artifical intelligence and data science</option>
              <option>cse ai</option>
              <option>mechanical</option>
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Passout Year</label>
            <select
              value={passoutYear}
              onChange={(e) => setPassoutYear(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#334155] text-white"
            >
              <option>All Years</option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
               <option>2023</option>
              <option>2024</option>
              <option>2025</option>
               <option>2026</option>
              <option>2027</option>
              
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#334155] text-white"
            >
              <option>All Categories</option>
              <option>DSA</option>
              <option>System Design</option>
              <option>Technical Interviews</option>
               <option>oa round</option>
              <option>technical skill</option>
              <option>mock test</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-lg">Loading profiles...</p>}
      {error && typeof error === "string" && (
        <p className="text-lg text-red-400">Error: {error}</p>
      )}

      {/* Student Count */}
      {!loading && !error && profiles.length > 0 && (
        <p className="text-sm text-gray-400 mb-4">
          {profiles.length} students found
        </p>
      )}

      {/* Empty State */}
      {!loading && !error && profiles.length === 0 && (
        <p className="text-gray-400 text-center">No students found.</p>
      )}

      {/* Student Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((student, index) => (
          <div
            key={index}
            className="bg-[#1e293b] p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                {student.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold">{student.name}</h2>
                  {student.year && (
                    <span className="bg-[#0f172a] text-sm px-3 py-1 rounded-full text-blue-400 font-medium">
                      {student.year}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400">{student.branch}</p>
                <p className="text-sm text-gray-400">{student.location}</p>
                {student.linkedin && (
                  <a
                    href={student.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-sm mt-1 inline-block hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                )}
              </div>
            </div>

            {student.description && (
              <p className="text-sm text-gray-300 mb-4">{student.description}</p>
            )}

            {student.skills?.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {student.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-[#334155] text-sm px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-medium">
              View Profile
            </button>
          </div>
        ))}
      </div>

      {/* Show selected profile details */}
      {profile && (
        <div className="mt-10 p-4 bg-[#1e293b] rounded-xl">
          <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
          <p className="text-gray-300">{profile.email}</p>
        </div>
      )}
    </div>
  );
}
