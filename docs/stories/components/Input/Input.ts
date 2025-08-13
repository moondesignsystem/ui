import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["sm", "md", "lg", "xl"] as const;

export type Props = {
  disabled: boolean;
  error: boolean;
  label: string;
  hint: string;
  placeholder: string;
  size: (typeof SIZES)[number];
};

const createInput = (args: Props) => {
  const { disabled, error, label, hint, size, placeholder } = args;
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  if (disabled) {
    input.setAttribute("disabled", "true");
  }
  if (label || hint) {
    const formGroup = document.createElement("div");
    const labelNode = document.createElement("label");
    const hintNode = document.createElement("p");
    formGroup.className = joinClassnames([
      "moon-form-group",
      error && "moon-form-group-error",
    ]);
    input.className = joinClassnames(["moon-input", getClasses(size)]);
    placeholder && input.setAttribute("placeholder", placeholder);
    hintNode.className = "moon-form-hint";
    label &&
      formGroup
        .appendChild(labelNode)
        .appendChild(document.createTextNode(label));
    formGroup.appendChild(input);
    hint &&
      formGroup
        .appendChild(hintNode)
        .appendChild(document.createTextNode(hint));
    return formGroup;
  }
  input.className = joinClassnames([
    "moon-input",
    getClasses(size),
    error && "moon-input-error",
  ]);
  placeholder && input.setAttribute("placeholder", placeholder);
  return input;
};

export default createInput;
