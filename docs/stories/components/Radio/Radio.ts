export const LABEL_POSITIONS = ["start", "end"] as const;

export type Props = {
  label: string;
  checked: boolean;
  disabled: boolean;
  labelPosition: (typeof LABEL_POSITIONS)[number];
};

const createRadio = (args: Props) => {
  const { label, checked, disabled, labelPosition } = args;
  const radio = document.createElement("input");
  radio.type = "radio";
  radio.setAttribute("id", "moon-radio");
  radio.className = "moon-radio";
  if (disabled) {
    radio.setAttribute("disabled", "true");
  }
  if (checked) {
    radio.setAttribute("checked", "true");
  }
  if (label) {
    const radioWrapper = document.createElement("div");
    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", "moon-radio");
    labelElement.textContent = label;
    radioWrapper.className = "moon-radio-wrapper";
    if (labelPosition === "end") {
      radioWrapper.appendChild(labelElement);
      radioWrapper.appendChild(radio);
    } else {
      radioWrapper.appendChild(radio);
      radioWrapper.appendChild(labelElement);
    }
    return radioWrapper;
  }
  return radio;
};

export default createRadio;
