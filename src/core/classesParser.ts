import { IConvertedCell, IConvertedSheet, SheetConverter } from "./sheetConverter";
import { SheetLoader } from "./sheetLoader";
import { isTime, letterToNumber } from "../utils/utils";
import lodash from "lodash";

interface IParseClassesDTO {
  url: string;
  leftBorder: string;
  rightBorder: string;
}

export interface IClassesWeek {
  [key: string]: IClassesDay;
}

export interface IClassesDay extends Array<IClassesRow> {}

export interface IClassesRow {
  time: IConvertedCell;
  disciplines: IConvertedCell[];
  place?: IConvertedCell;
}

// Парсит таблицу занятй
export abstract class ClassesParser {
  static async parseDTO(parseClassesDTO: IParseClassesDTO): Promise<IClassesWeek | null> {
    // Скачиваем данные
    const sheet = await SheetLoader.getSheetByUrl(parseClassesDTO.url);
    if (!sheet) {
      console.log("Ошибка при получении листа по ссылке");
      return null;
    }
    // Преобразуем в удобный для парсинга вид
    const convertedSheet: IConvertedSheet = await SheetConverter.convert(sheet);

    const leftBorder: number = letterToNumber(parseClassesDTO.leftBorder);
    const rightBorder: number = letterToNumber(parseClassesDTO.rightBorder);

    // Основной парсинг
    const week = await this.parseConvertedSheet(convertedSheet, leftBorder, rightBorder);
    if (!week) {
      console.log("Ошибка при парсинге листа");
      return null;
    }

    // Чистим от путых строк
    const cleanWeek = this.removeBlanks(week);

    console.log(cleanWeek);
    return cleanWeek;
  }

  private static async parseConvertedSheet(
    sheet: IConvertedSheet,
    leftBorder: number,
    rightBorder: number
  ): Promise<IClassesWeek | null> {
    let classesWeek: IClassesWeek = {};
    for (const row of sheet) {
      // Время и учебные дисциплины
      const time = row.find((cell) => cell.column === leftBorder);
      console.log(time);
      if (!time || !isTime(time.text)) continue;
      let disciplines = row.filter((cell) => cell.column > leftBorder && cell.column < rightBorder);
      disciplines = lodash.uniqBy(disciplines, "text"); // Удаляет дубликаты
      const place = row.find((cell) => cell.column === rightBorder); // Место занятия
      const dayKey = row[0].text; // День недели
      // Создаем день недели если его еще нет
      if (!classesWeek[dayKey]) {
        classesWeek[dayKey] = [];
      }
      // Добавляем строку в день
      classesWeek[dayKey].push({ time, disciplines, place });
    }

    return classesWeek;
  }

  // Удаляет пустые строки вначале и в конце
  private static removeBlanks = (week: IClassesWeek): IClassesWeek => {
    console.log("before ", week);
    let resultWeek: IClassesWeek = {};
    Object.keys(week).forEach((key) => {
      let resultDay: IClassesDay = [];
      let rowsBuffer: IClassesRow[] = [];
      for (const row of week[key]) {
        if (row.disciplines.length > 0) {
          resultDay.push(...rowsBuffer);
          resultDay.push(row);
          rowsBuffer = [];
        } else {
          if (resultDay.length > 0) {
            rowsBuffer.push(row);
          }
        }
      }
      resultWeek[key] = resultDay;
    });
    return resultWeek;
  };
}
