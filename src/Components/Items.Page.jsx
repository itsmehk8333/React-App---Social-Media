import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getItems from "../apis/items.apis";
import "./Items.css";
import { Link } from "react-router-dom";

function ItemsPage() {
  const items = useSelector((store) => store.items);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  // when items arrive, stop loading
  useEffect(() => {
    if (items && items.length > 0) {
      setLoading(false);
    }
  }, [items]);

  return (
    <div className="items-page">
      <div className="items-inner">
        <h2 className="items-title">Social Media For Travellers</h2>

        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search here..."
            className="search-input"
          />
        </div>

        <div className="grid-container">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <ItemSkeleton key={index} />
              ))
            : items.map((item) => <ItemComponent key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );
}

const ItemComponent = ({ item }) => {
  return (
    <Link to={`/item/${item.id}`} className="no-link-style">
      <div className="grid-box">
        <div className="item-image">
          <img
            src={`https://picsum.photos/600/350?random=${item.id}`}
            alt={item.title}
          />
        </div>

        <div className="item-content">
          <h3>{item.title}</h3>
          <p>{item.body}</p>

          <button className="item-cta">
            <span>&gt;</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

// 💀 Skeleton card for loading state
const ItemSkeleton = () => {
  return (
    <div className="grid-box">
      <div className="item-image">
        <div className="skeleton skeleton-img" />
      </div>

      <div className="item-content">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text short" />

        <div className="skeleton skeleton-btn" />
      </div>
    </div>
  );
};

export default ItemsPage;
