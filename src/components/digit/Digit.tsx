import { useEffect, useRef } from "react";
import "./Digit.scss";

export const Digit = (props: any) => {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (numberRef.current) {
      numberRef.current.classList.add("animate-digit");
    }
  });

  return (
    <div className="digit-container" aria-hidden="true">
      <span key={props.value} className="digit" ref={numberRef}>
        {props.value}
      </span>
    </div>
  );
};
