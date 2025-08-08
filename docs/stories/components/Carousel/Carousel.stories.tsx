import React from "react";
import LinksBlock from "../../shared/LinksBlock";
import createCarousel from "./Carousel";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Carousel";

const meta: Meta<Props> = {
  title: "Content display/Carousel",
  render: createCarousel,
  argTypes: {
    length: {
      description: "Amount of Carousel items",
      control: { type: "range", min: 2, max: 10, step: 1 },
    },
    hasPagination: {
      description: "Has pagination controls",
      control: "boolean",
    },
    hasArrows: {
      description: "Has arrow controls",
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="content-display/carousel-oPVnjD6U"
          github="_carousel.scss"
        />
      ),
    },
  },
};

export default meta;

export const Carousel: StoryObj<Props> = {
  args: {
    length: 5,
    hasArrows: false,
    hasPagination: false,
  },
};
