import { Cell, Row, Worksheet } from "exceljs";

export interface IConvertedSheet extends Array<IConvertedRow> {}

export interface IConvertedRow extends Array<IConvertedCell> {}

export interface IConvertedCell {
  text: string;
  hyperlink?: string;
  column: number;
}

export interface IRichTextValue {
  richText: { text: string }[];
}

export interface IHyperlinkValue {
  hyperlink: string;
  text: string;
}

export interface IHyperlinkAndRichTextValue {
  hyperlink: string;
  text: { richText: { text: string }[] };
}

// Преобразует таблицу в удобный для парсинга вид
export abstract class SheetConverter {
  static async convert(sheet: Worksheet): Promise<IConvertedSheet> {
    const convertedSheet: IConvertedSheet = [];
    sheet.eachRow((row) => {
      const convertedRow = this.convertRow(row);
      convertedSheet.push(convertedRow);
    });
    return convertedSheet;
  }

  // Преобразует строку
  private static convertRow = (row: Row): IConvertedRow => {
    const convertedRow: IConvertedRow = [];
    row.eachCell((cell) => {
      if (!cell.value) {
        return;
      }

      const convertedCell = this.convertCell(cell);
      convertedRow.push(convertedCell);
    });

    return convertedRow;
  };

  // Преобразует ячейку
  private static convertCell = (cell: Cell): IConvertedCell => {
    // В ячейке таблицы могут быть такие типы
    var value = cell.value as
      | number
      | string
      | IRichTextValue
      | IHyperlinkValue
      | IHyperlinkAndRichTextValue;

    var text = "";
    var hyperlink;

    // Число
    if (typeof value === "number") {
      text = value.toString();
    }
    // Строка
    else if (typeof value === "string") {
      text = value;
    }
    // Форматированный текст
    else if ("richText" in value) {
      text = value.richText.map((richText) => richText.text).join("\n");
    }
    // Текст с гиперссылкой
    else if ("hyperlink" in value) {
      hyperlink = value.hyperlink;
      // Форматированный текст с гиперссылкой
      if (typeof value.text === "object" && "richText" in value.text) {
        text = (value.text as IRichTextValue).richText.map((obj) => obj.text).join("\n");
      }
      // Обычный текст с гиперссылкой
      else {
        text = value.text;
      }
    }

    return { text, hyperlink, column: Number(cell.col) };
  };
}
