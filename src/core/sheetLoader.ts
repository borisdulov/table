import { handleUrl } from "@/utils/utils";
import { Workbook, Worksheet } from "exceljs";

export abstract class SheetLoader {
  static async getSheetByUrl(url: string): Promise<Worksheet | null> {
    const handledUrl = handleUrl(url);
    const book = await this.fetchBook(handledUrl);
    if (!book) {
      console.log("Не удалось загрузить книгу");
      return null;
    }
    const sheet = this.findSheet(book);
    if (!sheet) {
      console.log("Не удалось найти лист");
      return null;
    }
    if (!sheet) return null;
    return sheet;
  }

  // Скачивает xlsx по url и возвращает Workbook из exceljs
  private static fetchBook = async (url: string): Promise<Workbook | null> => {
    try {
      const arrayBuffer = await fetch(url).then((response) => response.arrayBuffer());
      const book = new Workbook();
      await book.xlsx.load(arrayBuffer);
      return book;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // Логика получения листа из книги
  private static findSheet = (book: Workbook): Worksheet | null => {
    const sheet = book.getWorksheet(1);
    if (!sheet) return null;
    return sheet;
  };
}
