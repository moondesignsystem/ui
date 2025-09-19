import type { Meta, StoryObj } from "@storybook/html-vite";
import LinksBlock from "../../shared/LinksBlock";
import CONTEXTS from "../../shared/contexts";
import createIconButton, { SIZES, VARIANTS } from "./IconButton";
import type { Props } from "./IconButton";

const meta: Meta<Props> = {
  title: "Actions/Icon Button",
  render: createIconButton,
  argTypes: {
    size: {
      description: "Size of Icon Button",
      control: "select",
      options: SIZES,
    },
    disabled: {
      description: "Disabled state of Icon Button",
      control: "boolean",
    },
    rounded: {
      description: "Rounded Icon Button",
      control: "boolean",
    },
    variant: {
      description: "Variant of Icon Button",
      control: "select",
      options: VARIANTS,
    },
    context: {
      description: "Context of Icon Button",
      control: "select",
      options: CONTEXTS,
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="actions/icon-button"
          github="_iconButton.scss"
        />
      ),
    },
  },
};

export default meta;

export const IconButton: StoryObj<Props> = {
  args: {
    size: "md",
    variant: "fill",
    context: "brand",
    rounded: false,
    disabled: false,
  },
};
