import { IClassesWeek } from "@/core/classesParser";
import { DayCardComponent } from "./DayCard.cmp";
import { DayChipComponent } from "./DayChip.cmp";
import { Skeleton } from "@nextui-org/skeleton";
import React, { useEffect, useRef } from "react";

interface DaysListProps {
  week: IClassesWeek | null;
}

// Отображается пока данные грузятся
const DaysListSkeleton = () => {
  return <Skeleton className="w-screen h-screen fixed top-0 left-0" />;
};

export const DaysListComponent: React.FC<DaysListProps> = ({ week }) => {
  if (!week) return <DaysListSkeleton />;
  const dayKeys = Object.keys(week);
  const today = new Date().getDay() - 1;
  const todayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!todayRef.current) return;
    const offset = 55;
    const yPos = todayRef.current.offsetTop - offset;
    window.scrollTo({ top: yPos, behavior: "smooth" });
  });

  return (
    <div className="flex flex-col gap-2 mt-2 mb-24">
      {dayKeys.map((key, id) => (
        <div key={id} ref={id === today ? todayRef : null}>
          <DayChipComponent dayId={id} />
          <DayCardComponent day={week[key]} />
        </div>
      ))}
    </div>
  );
};
