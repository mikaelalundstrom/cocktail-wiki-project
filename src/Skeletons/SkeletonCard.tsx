import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

function SkeletonCard() {
  return (
    <article className="skeleton-wrapper-card">
      <div className="skeleton-wrapper">
        <SkeletonElement type="skeleton-image" />
        <Shimmer />
      </div>
      <div className="skeleton-wrapper">
        <SkeletonElement type="skeleton-text" />
        <Shimmer />
      </div>
    </article>
  );
}

export default SkeletonCard;
