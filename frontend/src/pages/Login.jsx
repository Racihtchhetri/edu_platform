import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try{
      const res = await fetch("https://edu-platform-kzxw.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if(data.token){
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        if(data.role === "academy"){
          navigate("/academy");
        }else{
          navigate("/student");
        }

      }else{
        setError("Invalid email or password");
      }

    }catch(err){
      setError("Server not responding");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">

      <form className="login-card" onSubmit={submit}>

        <h2>Login</h2>

        {error && <div className="error">{error}</div>}

        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            required
          />
        </div>

        <button disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

      </form>
    </div>
  );
}
