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

export const areObjectsEqual = (obj1: any, obj2: any): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

export const todayDayOfWeek = () => new Date().getDay() - 1;
