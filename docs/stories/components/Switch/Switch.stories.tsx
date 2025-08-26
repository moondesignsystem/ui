import LinksBlock from "../../shared/LinksBlock";
import createSwitch, { SIZES } from "./Switch";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Switch";

const meta: Meta<Props> = {
  title: "Forms & selection controls/Switch",
  render: createSwitch,
  argTypes: {
    size: {
      description: "Size of Switch",
      control: "select",
      options: SIZES,
    },
    checked: {
      description: "Checked state of Switch",
      control: "boolean",
    },
    disabled: {
      description: "Disabled state of Switch",
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="forms-and-selection-controls/switch-5jjecI2N"
          github="_switch.scss"
        />
      ),
    },
  },
};

export default meta;

export const Switch: StoryObj<Props> = {
  args: {
    size: "sm",
    checked: false,
    disabled: false,
  },
};
