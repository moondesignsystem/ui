import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["sm", "md", "lg", "xl"] as const;

export type Props = {
  label: string;
  hint: string;
  error: boolean;
  disabled: boolean;
  placeholder: string;
  size: (typeof SIZES)[number];
};

const createTextarea = (args: Props) => {
  const { label, hint, error, disabled, placeholder, size } = args;
  const textarea = document.createElement("textarea");
  placeholder && textarea.setAttribute("placeholder", placeholder);
  if (disabled) {
    textarea.setAttribute("disabled", "true");
  }
  if (label || hint) {
    const formGroup = document.createElement("div");
    const labelNode = document.createElement("label");
    const hintNode = document.createElement("p");
    formGroup.className = joinClassnames([
      "moon-form-group",
      error ? "moon-form-group-error" : "",
    ]);
    textarea.className = joinClassnames(["moon-textarea", getClasses(size)]);
    hintNode.className = "moon-form-hint";
    label &&
      formGroup
        .appendChild(labelNode)
        .appendChild(document.createTextNode(label));
    formGroup.appendChild(textarea);
    hint &&
      formGroup
        .appendChild(hintNode)
        .appendChild(document.createTextNode(hint));
    return formGroup;
  }
  textarea.className = joinClassnames([
    "moon-textarea",
    getClasses(size),
    error && "moon-textarea-error",
  ]);
  return textarea;
};

export default createTextarea;
