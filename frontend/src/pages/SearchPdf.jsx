import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

export default function SearchPdf() {

  const navigate = useNavigate();

  // ---------------- auth guard ----------------
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const [filters, setFilters] = useState({
    subject: "",
    className: "",
    schoolName: ""
  });

  const [preview, setPreview] = useState(null);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------------- logout ----------------
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const search = async () => {

    setLoading(true);

    const q = new URLSearchParams(filters).toString();

    const res = await fetch(
      "https://edu-platform-kzxw.onrender.com/api/search?" + q
    );

    const data = await res.json();
    setList(data);
    setLoading(false);
  };

  return (
    <div className="search-page">

      {/* top bar */}
      <div className="top-bar">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="search-card">

        <h2>Find Study Material</h2>
        <p className="sub">Search PDFs uploaded by academies</p>

        <div className="search-form">

          <input
            placeholder="Subject"
            value={filters.subject}
            onChange={e => setFilters({ ...filters, subject: e.target.value })}
          />

          <input
            placeholder="Class"
            value={filters.className}
            onChange={e => setFilters({ ...filters, className: e.target.value })}
          />

          <input
            placeholder="School"
            value={filters.schoolName}
            onChange={e => setFilters({ ...filters, schoolName: e.target.value })}
          />

          <button onClick={search} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>

        </div>

      </div>

      <div className="results-area">

        {list.length === 0 && !loading && (
          <div className="empty">
            No results yet. Try searching.
          </div>
        )}

        {list.map(p => (
          <div
            className="pdf-card file"
            key={p._id}
            onClick={() => setPreview(p)}
          >

            <div className="file-icon">📄</div>

            <div className="file-info">
              <h4>{p.subject}</h4>
              <p>{p.className} · {p.schoolName}</p>
            </div>

          </div>
        ))}

      </div>

      {preview && (
        <div className="preview-backdrop" onClick={() => setPreview(null)}>
          <div className="preview-box" onClick={e => e.stopPropagation()}>

            <div className="preview-header">
              <span>{preview.subject}</span>
              <button onClick={() => setPreview(null)}>✖</button>
            </div>

            <iframe
              src={`https://edu-platform-kzxw.onrender.com/api/view/${preview.filePath}`}
              title="preview"
            />

          </div>
        </div>
      )}

    </div>
  );
}