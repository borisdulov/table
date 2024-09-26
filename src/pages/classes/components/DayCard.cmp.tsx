import { IClassesDay } from "@/core/classesParser";
import { Link } from "@nextui-org/link";
import React from "react";
import { IConvertedCell } from "@/core/sheetConverter";
import { Card } from "@nextui-org/card";
import { DayChipComponent } from "./DateCard.cmp";

interface DisciplinesProps {
  disciplines: IConvertedCell[];
}

// Названия дисциплин одного ряда таблицы
// Получает массив из названий дисциплин одного ряда. В одном элементе массива могут быть под-элементы разделенные символом "\n"
// Под-элементы делит по "\n" и создает на каждый <p>
// Элементы разделяет с помощью <Divider />
const DisciplinesComponent: React.FC<DisciplinesProps> = ({ disciplines }) => {
  return (
    <Card className="flex-row p-2 mt-1" radius="sm">
      {disciplines.map((discipline, id) => (
        <div key={id} className={`w-full ${id != 0 ? "border-l" : ""}`}>
          {discipline.text.split("\n").map((text, id) => (
            <p className="text-xs px-2" key={id}>
              {text}
            </p>
          ))}
        </div>
      ))}
    </Card>
  );
};

interface PlaceProps {
  place: IConvertedCell | undefined;
}

// Место проведения занятия одного ряда
// Если есть гиперссылка, создает <Link />, если нет - <p>
const PlaceComponent: React.FC<PlaceProps> = ({ place }) => {
  var content: JSX.Element;
  if (place) {
    if (place.hyperlink) {
      content = (
        <Link href={place.hyperlink} isExternal className="text-xs">
          {place.text}
        </Link>
      );
    } else {
      content = <p className="text-xs">{place.text}</p>;
    }
  } else {
    content = <p className="text-xs">–</p>;
  }

  return (
    <Card className="p-2 w-full items-center" radius="sm">
      {content}
    </Card>
  );
};

const TimeComponent: React.FC<{ time: string }> = ({ time }) => {
  return (
    <Card className="py-2 px-4 items-center whitespace-nowrap" radius="sm">
      <p className="text-xs font-bold">{time.replace(/(\d\d)-(\d\d)/, "$1:$2")}</p>
    </Card>
  );
};

interface DayCardProps {
  day: IClassesDay;
}

export const DayCardComponent: React.FC<DayCardProps> = ({ day }) => {
  let prevTime: string;

  return (
    <Card className=" p-4">
      {day.map((row, id) => {
        const currentTime = row.time.text;
        const showTime = currentTime !== prevTime;
        prevTime = currentTime;

        return (
          <div key={id} className="flex flex-col">
            {showTime && (
              <div className="flex gap-1 mt-4">
                <TimeComponent time={row.time.text} />
                <PlaceComponent place={row.place} />
              </div>
            )}
            <DisciplinesComponent disciplines={row.disciplines} />
          </div>
        );
      })}
    </Card>
  );
};
