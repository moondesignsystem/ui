import LinksBlock from "../../shared/LinksBlock";
import createCircularProgress, { SIZES } from "./CircularProgress";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./CircularProgress";

const meta: Meta<Props> = {
  title: "Indicators & status/Circular Progress",
  render: createCircularProgress,
  argTypes: {
    size: {
      description: "Size of Circular Progress",
      control: "select",
      options: SIZES,
    },
    value: {
      description: "Value of Circular Progress",
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
  },
  parameters: {
    docs: {
      container: ({ context }: { context: any }) => (
        <LinksBlock
          context={context}
          moon="indicators-and-status/circular-progress"
          github="_circularProgress.scss"
        />
      ),
    },
  },
};

export default meta;

export const CircularProgress: StoryObj<Props> = {
  args: {
    size: "md",
    value: 70,
  },
};
