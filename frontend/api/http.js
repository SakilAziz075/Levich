const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function httpPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error("Request failed");
  }

  return res.json();
}

export async function httpGet(path) {
  const res = await fetch(`${API_BASE}${path}`);

  if (!res.ok) {
    throw new Error("Request failed");
  }

  return res.json();
}
