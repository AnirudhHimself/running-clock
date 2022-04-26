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
   *
   */
  useEffect(() => {
    const currentDay = Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
    }).format(Date.now());

    var pr = new Intl.PluralRules('en-US', { type: 'ordinal' });

    const suffixes = new Map([
      ['one', 'st'],
      ['two', 'nd'],
      ['few', 'rd'],
      ['other', 'th'],
    ]);

    const formatDay = (day: string) => {
      const rule = pr.select(Number(day.slice(-1)));
      const suffix = suffixes.get(rule);
      return `${day}${suffix}`;
    };
    setToday(formatDay(currentDay));
  }, []);
  return today;
};
