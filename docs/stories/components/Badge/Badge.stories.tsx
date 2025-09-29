import type { Meta, StoryObj } from "@storybook/html-vite";
import LinksBlock from "../../shared/LinksBlock";
import CONTEXTS from "../../shared/contexts";
import createBadge, { VARIANTS } from "./Badge";
import type { Props } from "./Badge";

const meta: Meta<Props> = {
  title: "Indicators & status/Badge",
  render: createBadge,
  argTypes: {
    children: {
      description: "Content of Badge",
      control: "text",
    },
    variant: {
      description: "Variant of Badge",
      control: "select",
      options: VARIANTS,
    },
    context: {
      description: "Context of Badge",
      control: "select",
      options: CONTEXTS,
    },
  },
  parameters: {
    docs: {
      container: ({ context }: { context: any }) => (
        <LinksBlock
          context={context}
          moon="indicators-and-status/badge"
          github="_badge.scss"
        />
      ),
    },
  },
};

export default meta;

export const Badge: StoryObj<Props> = {
  args: {
    children: "",
    variant: "fill",
    context: "brand",
  },
};
