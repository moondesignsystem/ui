import LinksBlock from "../../shared/LinksBlock";
import createPlaceholder from "./Placeholder";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Placeholder";

const meta: Meta<Props> = {
  title: "Indicators & status/Placeholder",
  render: createPlaceholder,
  argTypes: {
    className: {
      description: "Custom classes for Placeholder",
      control: "text",
    },
  },
  parameters: {
    docs: {
      container: ({ context }: { context: any }) => (
        <LinksBlock
          context={context}
          moon="indicators-and-status/placeholder"
          github="_placeholder.scss"
        />
      ),
    },
  },
};

export default meta;

export const Placeholder: StoryObj<Props> = {
  args: {},
};
