import "./Skeleton.css";

interface ISkeleton {
  outer?: string;
  type: string;
}

function SkeletonElement({ outer, type }: ISkeleton) {
  return <div className={type}></div>;
}

export default SkeletonElement;
