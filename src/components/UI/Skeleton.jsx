import React from "react";

const SkeletonBox = ({ width, height, borderRadius, style }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    ></div>
  );
};

export const HotCollectionsSkeleton = () => {
  return (
    <div className="nft_coll">
      <SkeletonBox width="100%" height="160px" borderRadius="8px" />
      <SkeletonBox
        width="50px"
        height="50px"
        borderRadius="50%"
        style={{ marginTop: "-25px" }}
      />
      <SkeletonBox width="80%" height="20px" borderRadius="4px" />
      <SkeletonBox width="50%" height="16px" borderRadius="4px" />
    </div>
  );
};

export const NewItemsSkeleton = () => {
  return (
    <div className="nft__item">
      <SkeletonBox width="100%" height="180px" borderRadius="8px" />
      <SkeletonBox width="50px" height="50px" borderRadius="50%" />
      <SkeletonBox width="70%" height="20px" borderRadius="4px" />
      <SkeletonBox width="40%" height="16px" borderRadius="4px" />
    </div>
  );
};

export default SkeletonBox;