import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Skeleton from "./Skeleton";
import "./SingleItem.css";

function SingleItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [itemData, setItemData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [morePosts, setMorePosts] = useState([]);
  const [activeTab, setActiveTab] = useState("details");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);

        const postRes = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const post = await postRes.json();

        const [userRes, moreRes] = await Promise.all([
          fetch(
            `https://jsonplaceholder.typicode.com/users/${post.userId}`
          ),
          fetch(
            `https://jsonplaceholder.typicode.com/posts?userId=${post.userId}&_limit=4`
          ),
        ]);

        const user = await userRes.json();
        const morePostsJson = await moreRes.json();

        setItemData(post);
        setUserData(user);
        setMorePosts(morePostsJson.filter((p) => p.id !== post.id));
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [id]);

  return (
    <div className="single-page">
      <div className="single-inner">
        {/* Header */}
        <div className="single-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ‹
          </button>
          <h2 className="single-title">Post Number #{id}</h2>
        </div>

        {/* MAIN CONTENT */}
        <div className="single-main">
          {/* ---------- LEFT: Main Post Card ---------- */}
          <div className="single-card">
            {loading ? (
              <>
                <Skeleton height="280px" radius="20px" />
                <div style={{ padding: "12px 18px" }}>
                  <Skeleton width="40%" height="20px" />
                </div>
              </>
            ) : (
              <>
                <img
                  src={`https://picsum.photos/700/450?random=${id}`}
                  alt={itemData.title}
                  className="single-card-img"
                />
                <div className="single-card-footer">
                  <span className="single-card-title">Post Title</span>
                  <div className="single-card-icons">
                    <span>↗</span>
                    <span>♡</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ---------- RIGHT: Details & User Info ---------- */}
          <div className="single-details">
            <div className="tabs">
              <button
                className={`tab-btn ${
                  activeTab === "details" ? "active" : ""
                }`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
              <button
                className={`tab-btn ${
                  activeTab === "user" ? "active" : ""
                }`}
                onClick={() => setActiveTab("user")}
              >
                User Info
              </button>
            </div>

            {/* -------- DETAILS TAB -------- */}
            {activeTab === "details" &&
              (loading ? (
                <div>
                  <Skeleton height="16px" width="90%" />
                  <Skeleton height="16px" width="75%" />
                  <Skeleton height="16px" width="60%" />
                </div>
              ) : (
                <p className="single-body">{itemData.body}</p>
              ))}

            {/* -------- USER INFO TAB -------- */}
            {activeTab === "user" &&
              (loading ? (
                <div>
                  <Skeleton height="18px" width="60%" />
                  <Skeleton height="16px" width="40%" />
                  <Skeleton height="16px" width="50%" />
                </div>
              ) : (
                userData && (
                  <div className="user-info">
                    <p className="user-line">
                      Posted by <strong>{userData.name}</strong>
                    </p>
                    <p>Email: {userData.email}</p>
                    <p>Username: {userData.username}</p>
                    <p>Website: {userData.website}</p>
                  </div>
                )
              ))}
          </div>
        </div>

        {/* ---------- MORE POSTS ---------- */}
        <h3 className="more-title">More Posts</h3>

        <div className="more-grid">
          {loading
            ? [1, 2, 3].map((n) => (
                <div key={n} className="more-card">
                  <Skeleton height="190px" radius="16px" />
                  <div className="more-card-content">
                    <Skeleton width="60%" height="16px" />
                  </div>
                </div>
              ))
            : morePosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/item/${post.id}`}
                   className="no-link-style"
                >
                  <div className="more-card">
                    <img
                      src={`https://picsum.photos/500/350?random=${post.id}`}
                      alt={post.title}
                      className="more-card-img"
                    />
                    <div className="more-card-content">
                      <span className="more-card-title">{post.title}</span>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
}

export default SingleItemPage;
