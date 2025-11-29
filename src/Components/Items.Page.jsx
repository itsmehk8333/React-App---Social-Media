import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getItems from "../apis/items.apis";
import "./Items.css";
import { Link } from "react-router-dom";

function ItemsPage() {
  const items = useSelector((store) => store.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <div className="items-page">
      <div className="items-inner">
        <h2 className="items-title">Social Media For Travellers</h2>

        <div className="search-wrapper">
          {/* optional icon – you can swap for an SVG */}
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search here..."
            className="search-input"
          />
        </div>

        <div className="grid-container">
          {items.map((item) => (
            <ItemComponent key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

const ItemComponent = ({ item }) => {
  return (
    <Link to={`/item/${item.id}`}  className="no-link-style">
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

export default ItemsPage;
