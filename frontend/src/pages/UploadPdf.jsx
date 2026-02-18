import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Upload.css";

export default function UploadPdf() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [active, setActive] = useState("list");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const [list, setList] = useState([]);

  // ------------------ load uploaded PDFs ------------------
  const loadPdfs = async () => {
    try {
      const res = await fetch("https://edu-platform-kzxw.onrender.com/api/pdf/my", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
      });

      const data = await res.json();
      if (res.ok) setList(data);
    } catch (err) { }
  };

  useEffect(() => {
    if (active === "list") {
      loadPdfs();
    }
  }, [active]);

  // ------------------ upload ------------------
  const upload = async (e) => {

    e.preventDefault();

    setMsg("");
    setError("");
    setLoading(true);

    const fd = new FormData(e.target);

    try {
      const res = await fetch(
        "https://edu-platform-kzxw.onrender.com/api/pdf/upload",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
          body: fd
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMsg("PDF uploaded successfully");
        e.target.reset();
      } else {
        setError(data.msg || data.error || "Upload failed");
      }

    } catch (err) {
      setError("Server not reachable");
    }

    setLoading(false);
  };

  return (
    <div className="academy-layout">

      {/* ------------ sidebar ------------ */}
      <aside className="academy-sidebar">

        <h3 className="logo">Academy</h3>

        <button
          className={active === "list" ? "side-btn active" : "side-btn"}
          onClick={() => setActive("list")}
        >
          📄 Uploaded PDFs
        </button>

        <button
          className={active === "upload" ? "side-btn active" : "side-btn"}
          onClick={() => setActive("upload")}
        >
          ⬆ Upload PDF
        </button>

        <button
          className="side-btn logout"
          onClick={logout}
        >
          🚪 Logout
        </button>

      </aside>

      {/* ------------ content ------------ */}
      <main className="academy-content">

        {/* ================= list view ================= */}
        {active === "list" && (
          <div className="card">

            <h2>Uploaded PDFs</h2>

            <table className="pdf-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Class</th>
                  <th>School</th>
                  <th>Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {list.map(p => (
                  <tr key={p._id}>
                    <td>{p.subject}</td>
                    <td>{p.className}</td>
                    <td>{p.schoolName}</td>
                    <td>
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}

                {list.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No PDFs uploaded yet
                    </td>
                  </tr>
                )}

              </tbody>
            </table>

          </div>
        )}

        {/* ================= upload view ================= */}
        {active === "upload" && (
          <div className="card">

            <h2>Upload Subject PDF</h2>
            <p className="sub">Academy dashboard</p>

            {msg && <div className="success">{msg}</div>}
            {error && <div className="error">{error}</div>}

            <form onSubmit={upload} className="form-grid">

              <div className="field">
                <label>Subject</label>
                <input name="subject" required />
              </div>

              <div className="field">
                <label>Class</label>
                <input name="className" required />
              </div>

              <div className="field">
                <label>School</label>
                <input name="schoolName" required />
              </div>

              <div className="field full">
                <label>PDF file</label>
                <input type="file" name="pdf" accept="application/pdf" required />
              </div>

              <button className="btn" disabled={loading}>
                {loading ? "Uploading..." : "Upload PDF"}
              </button>

            </form>

          </div>
        )}

      </main>

    </div>
  );
}