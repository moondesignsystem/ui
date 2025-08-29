import type { Meta, StoryObj } from "@storybook/html-vite";
import LinksBlock from "../../shared/LinksBlock";
import createSelect, { SIZES, VARIANTS } from "./Select";
import type { Props } from "./Select";

const meta: Meta<Props> = {
  title: "Forms & selection controls/Select",
  render: createSelect,
  argTypes: {
    error: {
      description: "Error state of Select",
      type: "boolean",
    },
    disabled: {
      description: "Disabled state of Select",
      type: "boolean",
    },
    label: {
      description: "Label of Select",
      control: "text",
    },
    hint: {
      description: "Hint of Select",
      control: "text",
    },
    size: {
      description: "Size of Select",
      control: "select",
      options: SIZES,
    },
    variant: {
      description: "Variant of Select",
      control: "select",
      options: VARIANTS,
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="forms-and-selection-controls/select"
          github="_select.scss"
        />
      ),
    },
  },
};

export default meta;

export const Select: StoryObj<Props> = {
  args: {
    size: "md",
    variant: "fill",
    disabled: false,
    error: false,
    label: "",
    hint: "",
  },
};
