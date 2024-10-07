import { IClassesWeek } from "@/core/classesParser";
import { DayCardComponent } from "./DayCard.cmp";
import { DateBarComponent } from "./DateBar.cmp";
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
    const offset = 48;
    const yPos = todayRef.current.offsetTop - offset;
    window.scrollTo({ top: yPos, behavior: "smooth" });
  });

  return (
    <div className="flex flex-col m-2">
      {dayKeys.map((key, id) => (
        <div key={id} ref={id === today ? todayRef : null}>
          <DateBarComponent dayId={id} />
          <DayCardComponent day={week[key]} />
        </div>
      ))}
    </div>
  );
};
