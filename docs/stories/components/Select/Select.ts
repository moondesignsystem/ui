import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["sm", "md", "lg", "xl"] as const;

export type Props = {
  disabled: boolean;
  error: boolean;
  label: string;
  hint: string;
  size: (typeof SIZES)[number];
};

const createSelect = (args: Props) => {
  const { disabled, error, label, hint, size } = args;
  const select = document.createElement("select");
  const options = ["option1", "option2", "option3", "option4", "option5"];
  options.forEach((option) => {
    const optionNode = document.createElement("option");
    optionNode.value = option;
    optionNode.textContent = option;
    select.appendChild(optionNode);
  });
  if (disabled) {
    select.setAttribute("disabled", "true");
  }
  if (label || hint) {
    const formGroup = document.createElement("div");
    const labelNode = document.createElement("label");
    const hintNode = document.createElement("p");
    formGroup.className = joinClassnames([
      "moon-form-group",
      error ? "moon-form-group-error" : "",
    ]);
    select.className = joinClassnames(["moon-select", getClasses(size)]);
    hintNode.className = "moon-form-hint";
    label &&
      formGroup
        .appendChild(labelNode)
        .appendChild(document.createTextNode(label));
    formGroup.appendChild(select);
    hint &&
      formGroup
        .appendChild(hintNode)
        .appendChild(document.createTextNode(hint));
    return formGroup;
  }
  select.className = joinClassnames([
    "moon-select",
    getClasses(size),
    error && "moon-select-error",
  ]);
  return select;
};

export default createSelect;
