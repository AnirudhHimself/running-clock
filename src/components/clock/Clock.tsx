import { Digit } from "components/digit";
import "./Clock.scss";

export const Clock = (props: any) => {
  return (
    <div aria-label={props.ariaLabel}>
      <Digit value={props.value[0]} />
      <Digit value={props.value[1]} />
      <span className="clock-divider" aria-hidden={"true"}>
        :
      </span>
      <Digit value={props.value[2]} />
      <Digit value={props.value[3]} />
    </div>
  );
};
