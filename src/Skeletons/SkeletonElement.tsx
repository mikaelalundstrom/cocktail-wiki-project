import "./Skeleton.css";

interface ISkeleton {
  outer?: string;
  type: string;
}

function SkeletonElement({ outer, type }: ISkeleton) {
  const classes = ` ${type}`;

  return <div className={classes}></div>;
}

export default SkeletonElement;
