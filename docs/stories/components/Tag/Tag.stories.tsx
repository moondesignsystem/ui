import type { Meta, StoryObj } from "@storybook/html-vite";
import LinksBlock from "../../shared/LinksBlock";
import CONTEXTS from "../../shared/contexts";
import createTag, { SIZES, VARIANTS } from "./Tag";
import type { Props } from "./Tag";

const meta: Meta<Props> = {
  title: "Indicators & status/Tag",
  render: createTag,
  argTypes: {
    label: {
      description: "Content of Tag",
      control: "text",
    },
    size: {
      description: "Size of Tag",
      control: "select",
      options: SIZES,
    },
    variant: {
      description: "Variant of Tag",
      control: "select",
      options: VARIANTS,
    },
    context: {
      description: "Context of Tag",
      control: "select",
      options: CONTEXTS,
    },
    hasStartIcon: {
      description: "Start icon of Tag",
      control: "boolean",
    },
    hasEndIcon: {
      description: "End icon of Tag",
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="indicators-and-status/tag"
          github="_tag.scss"
        />
      ),
    },
  },
};

export default meta;

export const Tag: StoryObj<Props> = {
  args: {
    size: "xs",
    variant: "fill",
    context: "brand",
    hasStartIcon: false,
    hasEndIcon: false,
    label: "Tag",
  },
};
