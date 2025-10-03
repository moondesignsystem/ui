import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";

export type Props = {
  label: string;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
};

const Checkbox = ({ label, checked, indeterminate, disabled }: Props) => {
  const checkbox = (
    <input
      type="checkbox"
      className="moon-checkbox"
      checked={checked}
      disabled={disabled}
    />
  );

  if (label) {
    return (
      <label>
        {checkbox}
        <span>{label}</span>
      </label>
    );
  }

  return checkbox;
};

export default createHTMLComponent(Checkbox);
