import React from "react";
import LinksBlock from "../../shared/LinksBlock";
import createChip, { SIZES, VARIANTS } from "./Chip";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Chip";

const meta: Meta<Props> = {
  title: "Forms & selection controls/Chip",
  render: createChip,
  argTypes: {
    label: {
      description: "Content of Chip",
      control: "text",
    },
    size: {
      description: "Size of Chip",
      control: "select",
      options: SIZES,
    },
    selected: {
      description: "Selected state of Chip",
      control: "boolean",
    },
    variant: {
      description: "Variant of Chip",
      control: "select",
      options: VARIANTS,
    },
    hasStartIcon: {
      description: "Start icon of Chip",
      control: "boolean",
    },
    hasEndIcon: {
      description: "End icon of Chip",
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="forms-and-selection-controls/chip-KxJbxHjO"
          github="_chip.scss"
        />
      ),
    },
  },
};

export default meta;

export const Chip: StoryObj<Props> = {
  args: {
    size: "md",
    variant: "fill",
    selected: false,
    hasStartIcon: false,
    hasEndIcon: false,
    label: "Chip",
  },
};
