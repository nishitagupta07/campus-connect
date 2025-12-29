// client/src/components/Post.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, createPost, toggleLike, addComment } from "../redux/post/postSlice";

export default function Post() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((s) => s.post);

  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", branch: "", year: "", infoType: "" });
  const [filter, setFilter] = useState({ q: "", branch: "", year: "", infoType: "" });

  useEffect(() => { dispatch(fetchPosts()); }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ ...form, year: Number(form.year) || undefined }))
      .then(() => setIsOpen(false));
  };

  const onSearch = () => dispatch(fetchPosts(filter));

  return (
    <div className="w-full">
      {/* Search bar + filters */}
      <div className="max-w-5xl mx-auto mt-6 p-4 rounded-xl bg-slate-900/80 text-white">
        <input
          className="w-full p-3 rounded-lg bg-black/40 outline-none"
          placeholder="Search for interview experiences, questions, or resources…"
          value={filter.q}
          onChange={(e)=>setFilter({ ...filter, q: e.target.value })}
        />
        <div className="flex gap-3 mt-3">
          <select value={filter.branch} onChange={e=>setFilter({...filter, branch:e.target.value})} className="px-3 py-2 rounded-md bg-black/40">
            <option value="">Branch</option><option>CSE</option><option>ECE</option><option>ME</option>
          </select>
          <select value={filter.year} onChange={e=>setFilter({...filter, year:e.target.value})} className="px-3 py-2 rounded-md bg-black/40">
            <option value="">Year</option><option>2025</option><option>2024</option><option>2023</option>
          </select>
          <select value={filter.infoType} onChange={e=>setFilter({...filter, infoType:e.target.value})} className="px-3 py-2 rounded-md bg-black/40">
            <option value="">Information Type</option><option>Experience</option><option>Question</option><option>Resource</option>
          </select>
          <button onClick={onSearch} className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500">Search Experiences</button>
          <button onClick={()=>setIsOpen(true)} className="ml-auto px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500">Add Your Post +</button>
        </div>
      </div>

      {/* Posts list */}
      <div className="max-w-3xl mx-auto mt-8 space-y-5">
        {loading && <p>Loading…</p>}
        {error && <p className="text-red-600">{error}</p>}
        {posts.map(p => (
          <div key={p._id} className="bg-white rounded-2xl shadow p-5">
            <div className="text-xs text-slate-500">{p.branch} • {p.year} • {p.infoType}</div>
            <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-slate-700">{p.content}</p>

            <div className="mt-3 flex items-center gap-3">
              <button onClick={()=>dispatch(toggleLike(p._id))} className="px-3 py-1 rounded-md bg-slate-100">
                ❤️ {p.likes?.length || 0}
              </button>
              <CommentBox postId={p._id} onSend={(txt)=>dispatch(addComment(p._id, txt))} />
            </div>

            {/* Show latest 2 comments */}
            <div className="mt-3 space-y-1">
              {(p.comments || []).slice(-2).map(c => (
                <div key={c._id} className="text-sm text-slate-700"><b>{c.user?.name || "User"}:</b> {c.text}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Post Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <form onSubmit={onSubmit} className="bg-white rounded-2xl w-full max-w-lg p-6 space-y-3">
            <h3 className="text-xl font-semibold">Create a Post</h3>
            <input className="w-full border rounded-md p-2" placeholder="Title"
              value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
            <textarea className="w-full border rounded-md p-2 h-32" placeholder="Write your experience…"
              value={form.content} onChange={e=>setForm({...form, content:e.target.value})} />
            <div className="grid grid-cols-3 gap-3">
              <select className="border rounded-md p-2" value={form.branch} onChange={e=>setForm({...form, branch:e.target.value})}>
                <option value="">Branch</option><option>CSE</option><option>ECE</option><option>ME</option>
              </select>
              <input className="border rounded-md p-2" type="number" placeholder="Year"
                value={form.year} onChange={e=>setForm({...form, year:e.target.value})} />
              <select className="border rounded-md p-2" value={form.infoType} onChange={e=>setForm({...form, infoType:e.target.value})}>
                <option value="">Type</option><option>Experience</option><option>Question</option><option>Resource</option>
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" className="px-4 py-2 rounded-md bg-slate-200" onClick={()=>setIsOpen(false)}>Cancel</button>
              <button className="px-4 py-2 rounded-md bg-blue-600 text-white">Post</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function CommentBox({ postId, onSend }) {
  const [text, setText] = useState("");
  return (
    <div className="flex items-center gap-2">
      <input
        className="border rounded-md px-2 py-1"
        placeholder="Write a comment…"
        value={text}
        onChange={(e)=>setText(e.target.value)}
      />
      <button
        className="px-3 py-1 rounded-md bg-slate-100"
        onClick={()=>{ if(text.trim()) { onSend(text); setText(""); } }}
      >
        Comment
      </button>
    </div>
  );
}
