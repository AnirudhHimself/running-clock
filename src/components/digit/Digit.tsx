import { useEffect, useRef } from "react";
import "./Digit.scss";

/**
 * Presentational Component that displays
 * a single digit of time. It is also
 * responsible for the digit entrance animation.
 */
export const Digit = (props: any) => {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (numberRef.current) {
      numberRef.current.classList.add("animate-digit");
    }
  });

  return (
    <span key={props.value} className="digit" ref={numberRef}>
      {props.value}
    </span>
  );
};
