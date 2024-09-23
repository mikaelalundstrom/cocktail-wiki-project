import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

// skeleton/placeholder for info page
function SkeletonInfo() {
  return (
    <>
      <section className="skeleton-image-wrapper">
        <div className="skeleton-info-image-wrapper">
          <SkeletonElement type="skeleton-info-image" /> {/* Image */}
          <Shimmer />
        </div>
        <div className="skeleton-h1-wrapper">
          <SkeletonElement type="skeleton-h1" /> {/* h1 */}
          <Shimmer />
        </div>
        <div className="skeleton-h3-wrapper">
          <SkeletonElement type="skeleton-h3" /> {/* h3 */}
          <Shimmer />
        </div>
      </section>
      <section className="skeleton-ingredients-wrapper">
        <h2>Ingredients</h2>
        <SkeletonElement type="skeleton-ingredients-and-measures" />{" "}
        <SkeletonElement type="skeleton-ingredients-and-measures" />{" "}
        <SkeletonElement type="skeleton-ingredients-and-measures" />{" "}
        <SkeletonElement type="skeleton-ingredients-and-measures" /> <Shimmer />
      </section>
      <section className="skeleton-instructions-section">
        <h2>Instructions</h2>
        <SkeletonElement type="skeleton-instruction-content" /> {/* p */}
        <SkeletonElement type="skeleton-instruction-content" /> {/* p */}
        <SkeletonElement type="skeleton-instruction-content" /> {/* p */}
        <SkeletonElement type="skeleton-instruction-content" /> {/* p */}
        <SkeletonElement type="skeleton-instruction-content" /> {/* p */}
        <SkeletonElement type="skeleton-instruction-content" /> {/* p */}
        <SkeletonElement type="skeleton-glass-info" /> {/* italic p */}
        <SkeletonElement type="skeleton-tags" /> {/* italic p */}
        <Shimmer />
      </section>
    </>
  );
}

export default SkeletonInfo;
