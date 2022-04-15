import { useEffect, useState } from 'react';

/**
 * Hook that returns the current day as a string
 * in a custom Month Day format.
 */
export const useCurrentDay = (): String => {
  const [today, setToday] = useState<String>('');

  /**
   * We determine the date in a month day format,
   * and set the "today" state.
   *
   * For example if today was 12/10/2021, then
   * this effect would set the today state to
   * "December 10th."
   */
  useEffect(() => {
    const monthMap: { [key: string]: string } = {
      Jan: 'January',
      Feb: 'February',
      Mar: 'March',
      Apr: 'April',
      May: 'May',
      Jun: 'June',
      Jul: 'July',
      Aug: 'August',
      Sep: 'Septeber',
      Oct: 'October',
      Nov: 'November',
      Dec: 'December',
    };

    const getMonth = (date: string): string => {
      return date.slice(4, 7);
    };

    const getDay = (date: string): string => {
      return String(Number(date.slice(8, 10)));
    };

    const today = String(new Date());

    const month = getMonth(today);
    const monthString = monthMap[month];
    const dayString = getDay(today);

    const daySuffix =
      dayString.slice(-1) === '1'
        ? 'st'
        : dayString.slice(-1) === '2'
        ? 'nd'
        : dayString.slice(-1) === '3'
        ? 'rd'
        : 'th';

    setToday(monthString + ' ' + dayString + daySuffix);
  }, []);
  return today;
};