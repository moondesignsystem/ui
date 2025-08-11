import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["sm", "md", "lg", "xl"] as const;

export type Props = {
  size: (typeof SIZES)[number];
  length: number;
  label: string;
  hint: string;
  error: boolean;
  disabled: boolean;
};

const createAuthenticator = (args: Props) => {
  const { size, length, label, hint, error, disabled } = args;
  const authenticator = document.createElement("div");
  const items = new Array(length).fill("");
  items.forEach(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("maxlength", "1");
    disabled && input.setAttribute("disabled", "true");
    authenticator.appendChild(input);
  });
  if (label || hint) {
    const formGroup = document.createElement("div");
    const labelNode = document.createElement("label");
    labelNode.textContent = label;
    const hintNode = document.createElement("p");
    hintNode.className = "moon-form-hint";
    hintNode.textContent = hint;
    formGroup.className = joinClassnames([
      "moon-form-group",
      error ? "moon-form-group-error" : "",
    ]);
    label && formGroup.appendChild(labelNode);
    authenticator.className = joinClassnames([
      "moon-authenticator",
      getClasses(size),
    ]);
    formGroup.appendChild(authenticator);
    hint && formGroup.appendChild(hintNode);
    return formGroup;
  }
  authenticator.className = joinClassnames([
    "moon-authenticator",
    getClasses(size),
    error ? "moon-authenticator-error" : "",
  ]);
  return authenticator;
};

export default createAuthenticator;
