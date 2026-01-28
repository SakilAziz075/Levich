import { useEffect, useState } from "react";
import { createSession } from "../api/user.api";
import { httpGet } from "../api/http";

export function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function hydrate() {
      const saved = localStorage.getItem("user");
      if (!saved) return;

      const parsed = JSON.parse(saved);

      try {
        const serverUser = await httpGet(`/api/users/${parsed.id}`);
        setUser(serverUser);
      } catch {
        const fresh = await createSession(parsed.username);
        localStorage.setItem("user", JSON.stringify(fresh));
        setUser(fresh);
      }
    }

    hydrate();
  }, []);

  async function login(user) {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return { user, login, logout };
}
