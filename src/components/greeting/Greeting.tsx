import { useEffect, useState } from "react";
import "./Greeting.scss";

export function Greeting(props: any) {
  const [today, setToday] = useState<string>("");

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
      Jan: "January",
      Feb: "February",
      Mar: "March",
      Apr: "April",
      May: "May",
      Jun: "June",
      Jul: "July",
      Aug: "August",
      Sep: "Septeber",
      Oct: "October",
      Nov: "November",
      Dec: "December",
    };

    const getMonth = (date: string) => {
      return date.slice(4, 7);
    };

    const getDay = (date: string) => {
      return String(Number(date.slice(8, 10)));
    };

    const today = String(new Date());

    const month = getMonth(today);
    const monthString = monthMap[month];
    const dayString = getDay(today);

    const daySuffix =
      dayString.slice(-1) === "1"
        ? "st"
        : dayString.slice(-1) === "2"
        ? "nd"
        : dayString.slice(-1) === "3"
        ? "rd"
        : "th";

    setToday(monthString + " " + dayString + daySuffix);
  }, []);

  return (
    <header>
      <h1 className="headline">
        Today is <span className="headline-accent is-block">{today}</span>
      </h1>
      <sub className="subheadline">
        There’s a <span className="headline-accent">running clock</span>{" "}
        somewhere.
      </sub>
    </header>
  );
}
