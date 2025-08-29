import LinksBlock from "../../shared/LinksBlock";
import createCheckbox, { LABEL_POSITIONS } from "./Checkbox";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Checkbox";

const meta: Meta<Props> = {
  title: "Forms & selection controls/Checkbox",
  render: createCheckbox,
  argTypes: {
    checked: {
      description: "Checked state of Checkbox",
      control: "boolean",
    },
    disabled: {
      description: "Disabled state of Checkbox",
      control: "boolean",
    },
    indeterminate: {
      description: "Indeterminate state of Checkbox",
      control: "boolean",
    },
    label: {
      description: "Label of Checkbox",
      control: "text",
    },
    labelPosition: {
      description: "Position of label of Checkbox",
      control: "select",
      options: LABEL_POSITIONS,
      if: { arg: "label" },
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="forms-and-selection-controls/checkbox"
          github="_checkbox.scss"
        />
      ),
    },
  },
};

export default meta;

export const Checkbox: StoryObj<Props> = {
  args: {
    disabled: false,
    checked: false,
    indeterminate: false,
    label: "",
    labelPosition: "start",
  },
};
