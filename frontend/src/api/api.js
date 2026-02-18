const BASE = "http://localhost:5000/api";

export const login = (data) =>
    fetch(BASE + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(r => r.json());