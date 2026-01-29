import { httpPost, httpGet } from "./http";

export function createSession(username) {
  return httpPost("/api/users/session", { username });
}

export function getUser(id) {
  return httpGet(`/api/users/${id}`);
}
