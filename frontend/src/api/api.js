const BASE = "https://edu-platform-kzxw.onrender.com/api";

export const login = (data) =>
    fetch(BASE + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(r => r.json());