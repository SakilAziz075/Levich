import { useAuction } from "../hooks/useAuction";
import ItemGrid from "../components/ItemGrid";

export default function Dashboard({ user }) {
  const { items, placeBid, offset } = useAuction(user);

  return (
    <div className="dashboard">
      <div className="dashboard-inner">

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
