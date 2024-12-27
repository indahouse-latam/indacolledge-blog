import { Skeleton, cn } from "@nextui-org/react";
import React from "react";

export const CourseCardSkeleton = () => {
  return (
    <>
      {[0, 1, 2, 3, 4].map((index: number) => (
        <li key={cn("skeleton", index)}>
          <Skeleton className="course-card_skeleton" />
        </li>
      ))}
    </>
  );
};
