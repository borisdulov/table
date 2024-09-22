import { IClassesDay } from "@/core/classesParser";
import { Link } from "@nextui-org/link";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { Divider } from "@nextui-org/divider";
import React from "react";
import { IConvertedCell } from "@/core/sheetConverter";

interface DisciplinesProps {
  disciplines: IConvertedCell[];
}

// Названия дисциплин одного ряда таблицы
// Получает массив из названий дисциплин одного ряда. В одном элементе массива могут быть под-элементы разделенные символом "\n"
// Под-элементы делит по "\n" и создает на каждый <p>
// Элементы разделяет с помощью <Divider />
const DisciplinesComponent: React.FC<DisciplinesProps> = ({ disciplines }) => {
  return (
    <>
      {disciplines.map((discipline, id) => (
        <React.Fragment key={id}>
          {id > 0 && <Divider className="my-1" />}
          {discipline.text.split("\n").map((text, id) => (
            <p className="text-xs" key={id}>
              {text}
            </p>
          ))}
        </React.Fragment>
      ))}
    </>
  );
};

interface PlaceProps {
  place: IConvertedCell | undefined;
}

// Место проведения занятия одного ряда
// Если есть гиперссылка, создает <Link />, если нет - <p>
const PlaceComponent: React.FC<PlaceProps> = ({ place }) => {
  if (!place) return null;
  if (place.hyperlink) {
    return (
      <Link href={place.hyperlink} isExternal className="text-xs">
        {place.text}
      </Link>
    );
  } else {
    return <p className="text-xs">{place.text}</p>;
  }
};

const TextComponent: React.FC<{ text: string }> = ({ text }) => {
  return <p className="text-xs">{text}</p>;
};

interface DayCardProps {
  day: IClassesDay;
}

export const DayCardComponent: React.FC<DayCardProps> = ({ day }) => {
  return (
    <Table isStriped aria-label="Example static collection table max-w-screen">
      <TableHeader>
        <TableColumn>Время</TableColumn>
        <TableColumn>Дисциплина</TableColumn>
        <TableColumn>Место</TableColumn>
      </TableHeader>
      <TableBody>
        {day.map((row, id) => (
          <TableRow key={id}>
            <TableCell>
              <TextComponent text={row.time.text} />
            </TableCell>
            <TableCell className="w-full">
              <DisciplinesComponent disciplines={row.disciplines} />
            </TableCell>
            <TableCell className="text-center">
              <PlaceComponent place={row.place} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
