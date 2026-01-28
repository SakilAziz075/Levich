import { useEffect, useState } from "react";

export default function Countdown({ endTime, offset }) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(endTime - (Date.now() + offset));
    }, 1000);

    return () => clearInterval(id);
  }, [endTime, offset]);

  if (remaining <= 0) return <span>Auction Ended</span>;

  return <span>{Math.floor(remaining/1000)}s</span>;
}
