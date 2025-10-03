import LinksBlock from "../../shared/LinksBlock";
import createRadio from "./Radio";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Radio";

const meta: Meta<Props> = {
  title: "Forms & selection controls/Radio",
  render: createRadio,
  argTypes: {
    disabled: {
      description: "Disabled state of Radio",
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      container: ({ context }: { context: any }) => (
        <LinksBlock
          context={context}
          moon="forms-and-selection-controls/radio"
          github="_radio.scss"
        />
      ),
    },
  },
};

export default meta;

export const Radio: StoryObj<Props> = {
  args: {
    disabled: false,
  },
};
