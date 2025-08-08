import React from "react";
import LinksBlock from "../../shared/LinksBlock";
import createTooltip, { POSITIONS } from "./Tooltip";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Tooltip";

const meta: Meta<Props> = {
  title: "Messaging & feedback/Tooltip",
  render: createTooltip,
  argTypes: {
    children: {
      description: "Content of Tooltip",
      control: "text",
    },
    hasPointer: {
      description: "Pointer of Tooltip",
      control: "boolean",
    },
    position: {
      description: "Position of Tooltip",
      control: "select",
      options: POSITIONS,
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="messaging-and-feedback/tooltip-67OcVL5b"
          github="_tooltip.scss"
        />
      ),
    },
  },
};

export default meta;

export const Tooltip: StoryObj<Props> = {
  args: {
    position: "top",
    hasPointer: false,
    children: "Tooltip",
  },
};
