import { IClassesDay } from "@/core/classesParser";
import { Link } from "@nextui-org/link";
import React from "react";
import { IConvertedCell } from "@/core/sheetConverter";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Badge } from "@nextui-org/badge";

interface DisciplinesProps {
  disciplines: IConvertedCell[];
}

// Названия дисциплин одного ряда таблицы
// Получает массив из названий дисциплин одного ряда. В одном элементе массива могут быть под-элементы разделенные символом "\n"
// Под-элементы делит по "\n" и создает на каждый <p>
// Элементы разделяет с помощью <Divider />
const DisciplinesComponent: React.FC<DisciplinesProps> = ({ disciplines }) => {
  return (
    <div className="flex flex-row mt-1">
      {disciplines.map((discipline, id) => (
        <div key={id} className={`w-full ${id != 0 ? "border-l" : ""}`}>
          {discipline.text.split("\n").map((text, id) => (
            <div className="text-xs px-2 text-center" key={id}>
              {text}
            </div>
          ))}
        </div>
      ))}
    </div>
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

  return <div className="w-full text-center">{content}</div>;
};

const TimeComponent: React.FC<{ time: string }> = ({ time }) => {
  return (
    <div className="text-xs font-bold text-center w-full">
      {time.replace(/(\d\d)-(\d\d)/, "$1:$2")}
    </div>
  );
};

interface DisciplinesAndPlaceProps {
  disciplines: IConvertedCell[];
  place: IConvertedCell | undefined;
}

const DisciplinesAndPlace: React.FC<DisciplinesAndPlaceProps> = ({ disciplines, place }) => {
  return (
    <Card>
      <CardBody>
        <DisciplinesComponent disciplines={disciplines} />
      </CardBody>
      <Divider />
      <CardFooter>
        <PlaceComponent place={place} />
      </CardFooter>
    </Card>
  );
};

interface DayCardProps {
  day: IClassesDay;
}

export const DayCardComponent: React.FC<DayCardProps> = ({ day }) => {
  let prevTime: string;

  return (
    <div className="flex flex-col gap-2">
      {day.map((row, id) => {
        const currentTime = row.time.text;
        const showTime = currentTime !== prevTime;
        prevTime = currentTime;

        return (
          <div key={id} className="flex flex-col gap-2">
            {showTime && <TimeComponent time={row.time.text} />}
            <DisciplinesAndPlace place={row.place} disciplines={row.disciplines} />
          </div>
        );
      })}
    </div>
  );
};
