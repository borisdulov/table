// Определяет является ли строка временем
export const isTime = (timeString: string): boolean => {
  //TODO const divider = "-";
  const regex = /^\d{1,2}-\d{2}$/;
  return regex.test(timeString);
};

// Изменяет ссылку для просмотра таблицы на ссылку для экспорта
export const handleUrl = (url: string) => {
  return url.replace("edit", "export");
};

export const letterToNumber = (letter: string): number => {
  return letter.toUpperCase().charCodeAt(0) - 64;
};
