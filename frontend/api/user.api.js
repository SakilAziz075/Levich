import { httpPost } from "./http";

export function createSession(username) {
  return httpPost("/api/users/session", { username });
}
