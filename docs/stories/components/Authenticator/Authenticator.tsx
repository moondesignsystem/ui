import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";
import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["sm", "md", "lg", "xl"] as const;
export const VARIANTS = ["fill", "outline"] as const;

export type Props = {
  size: (typeof SIZES)[number];
  variant: (typeof VARIANTS)[number];
  length: number;
  label: string;
  hint: string;
  error: boolean;
  disabled: boolean;
};

const Authenticator = ({
  size,
  variant,
  length,
  label,
  hint,
  error,
  disabled,
}: Props) => {
  console.log("Authenticator component rendering with length:", length);
  const inputs = new Array(length)
    .fill("")
    .map((_, index) => (
      <input key={index} type="text" maxLength={1} disabled={disabled} />
    ));

  const authenticatorElement = (
    <div
      className={joinClassnames([
        "moon-authenticator",
        getClasses(size),
        getClasses(variant),
        !label && !hint && error && "moon-authenticator-error",
      ])}
    >
      {inputs}
    </div>
  );

  if (label || hint) {
    return (
      <div
        className={joinClassnames([
          "moon-form-group",
          error && "moon-form-group-error",
        ])}
      >
        {label && <label>{label}</label>}
        {authenticatorElement}
        {hint && <p className="moon-form-hint">{hint}</p>}
      </div>
    );
  }

  return authenticatorElement;
};

export default createHTMLComponent(Authenticator);
