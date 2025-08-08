import React from "react";
import LinksBlock from "../../shared/LinksBlock";
import createAccordion, { SIZES } from "./Accordion";
import type { Meta, StoryObj } from "@storybook/html-vite";
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
    items: 3,
  },
};
