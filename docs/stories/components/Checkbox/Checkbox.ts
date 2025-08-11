export const LABEL_POSITIONS = ["start", "end"] as const;

export type Props = {
  label: string;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  labelPosition: (typeof LABEL_POSITIONS)[number];
};

const createCheckbox = (args: Props) => {
  const { label, checked, indeterminate, disabled, labelPosition } = args;
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.setAttribute("id", "moon-checkbox");
  checkbox.className = "moon-checkbox";
  if (disabled) {
    checkbox.setAttribute("disabled", "true");
  }
  if (checked) {
    checkbox.setAttribute("checked", "true");
    checkbox.innerHTML = "<svg />";
  }
  if (indeterminate) {
    checkbox.indeterminate = true;
    checkbox.innerHTML = "<svg />";
  }
  if (label) {
    const checkboxWrapper = document.createElement("div");
    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", "moon-checkbox");
    labelElement.textContent = label;
    checkboxWrapper.className = "moon-checkbox-wrapper";
    if (labelPosition === "end") {
      checkboxWrapper.appendChild(labelElement);
      checkboxWrapper.appendChild(checkbox);
    } else {
      checkboxWrapper.appendChild(checkbox);
      checkboxWrapper.appendChild(labelElement);
    }
    return checkboxWrapper;
  }
  return checkbox;
};

export default createCheckbox;
