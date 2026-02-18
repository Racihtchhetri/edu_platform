import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const res = await fetch("https://edu-platform-kzxw.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role })
      });

      const data = await res.json();

      if (res.ok && data._id) {
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
      }

    } catch (err) {
      setError("Server not reachable");
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">

      <form className="auth-card" onSubmit={submit}>

        <h2>Create account</h2>
        <p className="auth-sub">Register as student or academy</p>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <div className="auth-field">
          <label>Account type</label>

          <div className="role-switch">

            <button
              type="button"
              className={role === "student" ? "active" : ""}
              onClick={() => setRole("student")}
            >
              Student
            </button>

            <button
              type="button"
              className={role === "academy" ? "active" : ""}
              onClick={() => setRole("academy")}
            >
              Academy
            </button>

          </div>
        </div>

        <button className="auth-btn" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>

        <div className="auth-footer">
          Already have an account?
          <span onClick={() => navigate("/login")}> Login</span>
        </div>

      </form>

    </div>
  );
}
