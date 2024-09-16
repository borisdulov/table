import { IClassesDay } from "@/core/classesParser";
import { Link } from "@nextui-org/link";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { Divider } from "@nextui-org/divider";
import React from "react";

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
            <TableCell className="text-xs">{row.time.text}</TableCell>
            <TableCell>
              {row.disciplines.map((discipline, id) => (
                <React.Fragment key={id}>
                  {id > 0 && <Divider className="my-1" />}
                  {discipline.text.split("\n").map((text, id) => (
                    <p className="text-xs" key={id}>
                      {text}
                    </p>
                  ))}
                </React.Fragment>
              ))}
            </TableCell>
            <TableCell>
              <Link className="text-xs" href={row.place?.hyperlink}>
                {row.place?.text}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
