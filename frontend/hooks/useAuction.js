import { useEffect, useRef, useState } from "react";
import { getItems, getServerTime } from "../api/auction.api";
import { createSocket } from "../socket/socketClient";

export function useAuction(user) {
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const socketRef = useRef(null);

  useEffect(() => {
    async function init() {
      const serverTimeRes = await getServerTime();
      setOffset(serverTimeRes.serverTime - Date.now());

      const data = await getItems();
      setItems(data);

      const socket = createSocket(user.id);
      socketRef.current = socket;

      socket.on("UPDATE_BID", (updatedItem) => {
        setItems((prev) =>
          prev.map((i) => (i.id === updatedItem.id ? updatedItem : i)),
        );
      });

      socket.on("BID_ERROR", (err) => {
        alert(err.message);
      });

      socket.on("NEW_AUCTION", (item) => {
        setItems((prev) => [...prev, item]);
      });
    }

    init();

    return () => socketRef.current?.disconnect();
  }, [user.id]);

  function placeBid(itemId, amount) {
    socketRef.current.emit("BID_PLACED", { itemId, amount });
  }

  return { items, placeBid, offset };
}
