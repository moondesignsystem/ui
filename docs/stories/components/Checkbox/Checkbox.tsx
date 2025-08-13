import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";

export const LABEL_POSITIONS = ["start", "end"] as const;

export type Props = {
  label: string;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  labelPosition: (typeof LABEL_POSITIONS)[number];
};

const Checkbox = ({
  label,
  checked,
  indeterminate,
  disabled,
  labelPosition,
}: Props) => {
  const checkbox = (
    <input
      type="checkbox"
      id="moon-checkbox"
      className="moon-checkbox"
      checked={checked}
      disabled={disabled}
    />
  );

  if (label) {
    return (
      <div className="moon-checkbox-wrapper">
        {labelPosition === "end" ? (
          <>
            <label htmlFor="moon-checkbox">{label}</label>
            {checkbox}
          </>
        ) : (
          <>
            {checkbox}
            <label htmlFor="moon-checkbox">{label}</label>
          </>
        )}
      </div>
    );
  }

  return checkbox;
};

export default createHTMLComponent(Checkbox);
