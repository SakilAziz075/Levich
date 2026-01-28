import { useEffect, useRef, useState } from "react";
import Countdown from "./Countdown";

export default function ItemCard({ item, onBid, user, offset }) {
  const [flash, setFlash] = useState(false);
  const prevHighestRef = useRef(null);

  const isWinning = item.highestBidder?.id === user.id;
  const wasWinning = prevHighestRef.current === user.id;

  const isOutbid = wasWinning && !isWinning;

  const leaderboard = Object.values(
    item.bidHistory.reduce((acc, bid) => {
      if (!acc[bid.userId] || bid.amount > acc[bid.userId].amount) {
        acc[bid.userId] = bid;
      }
      return acc;
    }, {}),
  ).sort((a, b) => b.amount - a.amount);

  useEffect(() => {
    if (prevHighestRef.current !== item.highestBidder?.id) {
      setFlash(true);
      setTimeout(() => setFlash(false), 300);
    }

    prevHighestRef.current = item.highestBidder?.id;
  }, [item.highestBidder]);

  return (
    <div className={`card ${flash ? "flash" : ""}`}>
      <h3>{item.title}</h3>

      <div className="price">${item.currentBid}</div>

      {item.highestBidder && (
        <p>Highest Bidder: {item.highestBidder.username}</p>
      )}

      <div className="timer">
        <Countdown endTime={item.endTime} offset={offset} />
      </div>

      {isWinning && <p className="badge-win">Winning</p>}

      {isOutbid && <p className="badge-outbid">Outbid</p>}

      <button
        disabled={Date.now() + offset > item.endTime}
        onClick={() => onBid(item.id, item.currentBid + 10)}
      >
        Bid +$10
      </button>

      <hr />

      <h4>Top Bidders</h4>

      {leaderboard.length === 0 && <p>No bids yet</p>}

      <div className="leaderboard">
        {leaderboard.map((b, idx) => (
          <div className="leaderboard-item" key={idx}>
            <span>
              {idx + 1}. {b.username}
              {b.userId === user.id && " (You)"}
            </span>
            <span>${b.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
