
import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";

export function createSocket(userId) {
  return io(SOCKET_URL, {
    auth: { userId }
  });
}
