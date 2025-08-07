import React from "react";
import LinksBlock from "../../shared/LinksBlock";
import createSegmentedControl, { SIZES } from "./SegmentedControl";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./SegmentedControl";

const meta: Meta<Props> = {
  title: "Forms & selection controls/Segmented Control",
  render: createSegmentedControl,
  argTypes: {
    label: {
      description: "Label of Segmented Control",
      control: "text",
    },
    size: {
      description: "Size of Segmented Control",
      control: "select",
      options: SIZES,
    },
    length: {
      description: "Length of Segmented Control",
      control: { type: "range", min: 2, max: 4, step: 1 },
    },
    hasStartIcon: {
      description: "Start icon of Segmented Control",
      control: "boolean",
    },
    hasEndIcon: {
      description: "End icon of Segmented Control",
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="forms-and-selection-controls/segmented-control-4LpDPTEq"
          github="_segmentedControl.scss"
        />
      ),
    },
  },
};

export default meta;

export const SegmentedControl: StoryObj<Props> = {
  args: {
    size: "md",
    length: 3,
    hasStartIcon: false,
    hasEndIcon: false,
    label: "Segment",
  },
};
