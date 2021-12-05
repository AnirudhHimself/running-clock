import { Digit } from "components/digit";
import "./Clock.scss";

/**
 * Presentational Component that Displays the
 * elapsed time.
 */
export const Clock = (props: any) => {
  return (
    <div className="clock" role="timer" aria-label={props.ariaLabel}>
      <Digit value={props.value[0]} />
      <Digit value={props.value[1]} />
      <Digit value={":"} />
      <Digit value={props.value[2]} />
      <Digit value={props.value[3]} />
    </div>
  );
};
