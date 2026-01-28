import ItemCard from "./ItemCard";

export default function ItemGrid({ items, onBid, user, offset }) {
  return (
    <div className="grid">
      {items.map(item => (
        <ItemCard
          key={item.id}
          item={item}
          onBid={onBid}
          user={user}
          offset={offset}
        />
      ))}
    </div>
  );
}
