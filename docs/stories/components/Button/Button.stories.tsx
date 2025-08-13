import LinksBlock from "../../shared/LinksBlock";
import createButton, { SIZES, VARIANTS } from "./Button";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Button";

const meta: Meta<Props> = {
  title: "Actions/Button",
  render: createButton,
  argTypes: {
    size: {
      description: "Size of Button",
      control: "select",
      options: SIZES,
    },
    disabled: {
      description: "Disabled state of Button",
      control: "boolean",
    },
    hasStartIcon: {
      description: "Start icon of Button",
      control: "boolean",
    },
    hasEndIcon: {
      description: "End icon of Button",
      control: "boolean",
    },
    variant: {
      description: "Variant of Button",
      control: "select",
      options: VARIANTS,
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="actions/button-lyMcENoZ"
          github="_button.scss"
        />
      ),
    },
  },
};

export default meta;

export const Button: StoryObj<Props> = {
  args: {
    size: "md",
    variant: "fill",
    disabled: false,
    hasStartIcon: false,
    hasEndIcon: false,
    label: "Button",
  },
};
