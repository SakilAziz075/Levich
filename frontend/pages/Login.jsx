import { useState } from "react";
import { createSession } from "../api/user.api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim()) return;

    try {
      setLoading(true);
      const user = await createSession(username);
      onLogin(user);
    } catch {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Enter Username</h2>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <button disabled={loading}>
          {loading ? "Joining..." : "Join Auction"}
        </button>
      </form>
    </div>
  );
}
