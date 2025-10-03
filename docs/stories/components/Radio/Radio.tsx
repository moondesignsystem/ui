import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";

export type Props = {
  checked: boolean;
  disabled: boolean;
};

const Radio = ({ checked, disabled }: Props) => (
  <div className="moon-radio-group" role="radiogroup">
    <label>
      <input
        type="radio"
        name="example"
        value="option 1"
        className="moon-radio"
        checked={checked}
        disabled={disabled}
      />
      Option 1
    </label>
    <label>
      <input
        type="radio"
        name="example"
        value="option 2"
        className="moon-radio"
        checked={checked}
        disabled={disabled}
      />
      Option 2
    </label>
  </div>
);

export default createHTMLComponent(Radio);
