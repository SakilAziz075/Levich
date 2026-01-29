import { useAuction } from "../hooks/useAuction";
import ItemGrid from "../components/ItemGrid";

export default function Dashboard({ user, onLogout }) {
  const { items, placeBid, offset } = useAuction(user);

  return (
    <div className="dashboard">
      <div className="dashboard-inner">

        <div className="top-bar">
          <span>Welcome, {user.username}</span>
          <button onClick={onLogout}>Logout</button>
        </div>

        <h2 className="dashboard-title">Live Auctions</h2>

        <ItemGrid
          items={items}
          onBid={placeBid}
          user={user}
          offset={offset}
        />

      </div>
    </div>
  );
}
