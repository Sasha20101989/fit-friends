export function formatDateString(inputDate: string): string {
  const date = new Date(inputDate);

  const day = date.getDate();
  const month = getMonthNameInGenitiveCase(date);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${day} ${month}, ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  return formattedDate;
}

export function formatCustomDateTimeString(inputDate: string): string {
  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = getMonthNameInGenitiveCase(date);
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDateTime = `${year}-${(month.length === 1 ? '0' : '') + (date.getMonth() + 1)}-${(day < 10 ? '0' : '') + day} ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  return formattedDateTime;
}

export const getMonthNameInGenitiveCase = (date = new Date) => {
  return date.toLocaleString('ru', {
    month: 'long',
    day: 'numeric',
  }).split(' ')[1];
};
