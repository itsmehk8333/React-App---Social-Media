import "./Skeleton.css"

export default function Skeleton({ height, width, radius }) {
  return (
    <div
      className="skeleton"
      style={{
        height: height || "20px",
        width: width || "100%",
        borderRadius: radius || "8px",
      }}
    ></div>
  );
}
