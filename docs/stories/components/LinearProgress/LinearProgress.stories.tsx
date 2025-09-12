import LinksBlock from "../../shared/LinksBlock";
import { createLinearProgress, SIZES } from "./LinearProgress";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./LinearProgress";

const meta: Meta<Props> = {
  title: "Indicators & status/Linear Progress",
  render: createLinearProgress,
  argTypes: {
    hasLabel: {
      description: "Shows a label for Linear Progress",
      control: "boolean",
    },
    label: {
      description: "Label for Linear Progress",
      control: "text",
      if: { arg: "hasLabel" },
    },
    value: {
      description: "Value of Linear Progress",
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    size: {
      description: "Size of Linear Progress",
      control: "select",
      options: SIZES,
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="indicators-and-status/linear-progress"
          github="_linearProgress.scss"
        />
      ),
    },
  },
};

export default meta;

export const LinearProgress: StoryObj<Props> = {
  args: {
    size: "2xs",
    value: 70,
    hasLabel: false,
    label: "Progress",
  },
};
