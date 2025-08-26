import type { Meta, StoryObj } from "@storybook/html-vite";
import LinksBlock from "../../shared/LinksBlock";
import CONTEXTS from "../../shared/contexts";
import createAccordion, { SIZES, VARIANTS } from "./Accordion";
import type { Props } from "./Accordion";

const meta: Meta<Props> = {
  title: "Content display/Accordion",
  render: createAccordion,
  argTypes: {
    size: {
      description: "Size of Accordion",
      control: "select",
      options: SIZES,
    },
    variant: {
      description: "Variant of Accordion",
      control: "select",
      options: VARIANTS,
    },
    context: {
      description: "Context of Accordion",
      control: "select",
      options: CONTEXTS,
    },
    items: {
      description: "Amount of Accordion items",
      control: { type: "range", min: 1, max: 5, step: 1 },
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="content-display/accordion-E9XfQUMP"
          github="_accordion.scss"
        />
      ),
    },
  },
};

export default meta;

export const Accordion: StoryObj<Props> = {
  args: {
    size: "md",
    variant: "fill",
    context: "brand",
    items: 3,
  },
};
