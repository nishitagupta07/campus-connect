import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const { currentUser, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user's posts
    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await fetch('/api/posts?userId=' + currentUser?.id, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserPosts(data);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser && token) {
            fetchUserPosts();
        }
    }, [currentUser, token]);

    const handleLogout = () => {
        dispatch(signOut());
        navigate('/');
    };

    if (!currentUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Header */}
            <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            My Dashboard
                        </h1>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-slate-700 hover:border-blue-500 transition-all duration-300">
                            <div className="flex flex-col items-center">
                                {/* Avatar */}
                                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold mb-4 shadow-lg">
                                    {currentUser.name?.charAt(0).toUpperCase()}
                                </div>

                                {/* User Info */}
                                <h2 className="text-2xl font-bold mb-2">{currentUser.name}</h2>
                                <p className="text-gray-400 mb-4">{currentUser.email}</p>

                                {/* Badges */}
                                <div className="w-full space-y-3 mt-4">
                                    {currentUser.branch && (
                                        <div className="bg-slate-700/50 rounded-lg px-4 py-3 flex items-center gap-3">
                                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <div>
                                                <p className="text-xs text-gray-400">Branch</p>
                                                <p className="text-sm font-semibold">{currentUser.branch}</p>
                                            </div>
                                        </div>
                                    )}

                                    {currentUser.passoutYear && (
                                        <div className="bg-slate-700/50 rounded-lg px-4 py-3 flex items-center gap-3">
                                            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <div>
                                                <p className="text-xs text-gray-400">Passout Year</p>
                                                <p className="text-sm font-semibold">{currentUser.passoutYear}</p>
                                            </div>
                                        </div>
                                    )}

                                    {currentUser.linkedIn && (
                                        <a
                                            href={currentUser.linkedIn}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-blue-600/20 hover:bg-blue-600/30 rounded-lg px-4 py-3 flex items-center gap-3 transition-all duration-300 border border-blue-500/30"
                                        >
                                            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                            <span className="text-sm font-semibold text-blue-400">LinkedIn Profile</span>
                                        </a>
                                    )}
                                </div>

                                {/* Edit Profile Button */}
                                <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Posts Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-slate-700">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">My Posts</h2>
                                <button
                                    onClick={() => navigate('/Addpost')}
                                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                                >
                                    + Create Post
                                </button>
                            </div>

                            {loading ? (
                                <div className="text-center py-12">
                                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                    <p className="mt-4 text-gray-400">Loading your posts...</p>
                                </div>
                            ) : userPosts.length > 0 ? (
                                <div className="space-y-4">
                                    {userPosts.map((post, index) => (
                                        <div
                                            key={index}
                                            className="bg-slate-700/50 rounded-xl p-6 hover:bg-slate-700/70 transition-all duration-300 border border-slate-600 hover:border-blue-500"
                                        >
                                            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                                            <p className="text-gray-300 mb-4 line-clamp-2">{post.content}</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                    {post.likes?.length || 0} likes
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                                    </svg>
                                                    {post.comments?.length || 0} comments
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <svg className="w-24 h-24 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No posts yet</h3>
                                    <p className="text-gray-500 mb-6">Share your experiences and knowledge with the community!</p>
                                    <button
                                        onClick={() => navigate('/Addpost')}
                                        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                                    >
                                        Create Your First Post
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button
                                onClick={() => navigate('/post')}
                                className="bg-slate-800/70 hover:bg-slate-700/70 backdrop-blur-md rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all duration-300"
                            >
                                <svg className="w-8 h-8 text-blue-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                                <p className="font-semibold">Browse Posts</p>
                            </button>

                            <button
                                onClick={() => navigate('/ProfilePage')}
                                className="bg-slate-800/70 hover:bg-slate-700/70 backdrop-blur-md rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition-all duration-300"
                            >
                                <svg className="w-8 h-8 text-purple-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <p className="font-semibold">Find Students</p>
                            </button>

                            <button
                                onClick={() => navigate('/about')}
                                className="bg-slate-800/70 hover:bg-slate-700/70 backdrop-blur-md rounded-xl p-6 border border-slate-700 hover:border-green-500 transition-all duration-300"
                            >
                                <svg className="w-8 h-8 text-green-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="font-semibold">About</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
