import { IClassesWeek } from "@/core/classesParser";
import { DayCardComponent } from "./DayCard.cmp";
import { DayChipComponent } from "./DayChip.cmp";
import { Skeleton } from "@nextui-org/skeleton";
import React from "react";

interface DaysListProps {
  week: IClassesWeek | null;
}

const DaysListSkeleton = () => {
  return <Skeleton className="w-screen h-screen fixed top-0 left-0" />;
};

export const DaysListComponent: React.FC<DaysListProps> = ({ week }) => {
  if (!week) return <DaysListSkeleton />;
  const dayKeys = Object.keys(week);
  return (
    <div className="flex flex-col gap-2 mt-2 mb-24">
      {dayKeys.map((key, id) => (
        <React.Fragment key={id}>
          <DayChipComponent dayKey={key} />
          <DayCardComponent day={week[key]} />
        </React.Fragment>
      ))}
    </div>
  );
};
