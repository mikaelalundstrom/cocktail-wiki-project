import "./Skeleton.css";
import { ISkeleton } from "../interfaces";

function SkeletonElement({ type }: ISkeleton) {
  return <div className={type}></div>;
}

export default SkeletonElement;
