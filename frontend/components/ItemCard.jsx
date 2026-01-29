import { useEffect, useRef, useState } from "react";
import Countdown from "./Countdown";

export default function ItemCard({ item, onBid, user, offset }) {

  const [flash, setFlash] = useState(false);

  const prevPriceRef = useRef(item.currentBid);
  const prevWinnerRef = useRef(item.highestBidder?.id);

  const isWinning = item.highestBidder?.id === user.id;
  const wasWinning = prevWinnerRef.current === user.id;
  const isOutbid = wasWinning && !isWinning;

  // Build leaderboard (one entry per user, highest bid)
  const leaderboard = Object.values(
    item.bidHistory.reduce((acc, bid) => {
      if (!acc[bid.userId] || bid.amount > acc[bid.userId].amount) {
        acc[bid.userId] = bid;
      }
      return acc;
    }, {})
  ).sort((a, b) => b.amount - a.amount);

  // Flash only when price changes
  useEffect(() => {
    if (item.currentBid !== prevPriceRef.current) {
      setFlash(true);
      setTimeout(() => setFlash(false), 400);
      prevPriceRef.current = item.currentBid;
    }
  }, [item.currentBid]);

  // Track previous winner for outbid detection
  useEffect(() => {
    prevWinnerRef.current = item.highestBidder?.id;
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

      {isWinning && (
        <div className="badge-win">Winning</div>
      )}

      {isOutbid && (
        <div className="badge-outbid">Outbid</div>
      )}

      <button
        disabled={Date.now() + offset > item.endTime}
        onClick={() => onBid(item.id, item.currentBid + 10)}
      >
        Bid +$10
      </button>

      <hr />

      <h4>Top Bidders</h4>

      {leaderboard.length === 0 && (
        <p>No bids yet</p>
      )}

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
