import { DocsContextProps } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/html-vite";
import LinksBlock from "../../shared/LinksBlock";
import createDropdown from "./Dropdown";
import type { Props } from "./Dropdown";

const meta: Meta<Props> = {
  title: "Containers & layout/Dropdown",
  render: createDropdown,
  argTypes: {},
  parameters: {
    docs: {
      container: ({ context }: { context: DocsContextProps }) => (
        <LinksBlock
          context={context}
          moon="containers-and-layout/dropdown"
          github="_dropdown.scss"
        />
      ),
    },
  },
};

export default meta;

export const Dropdown: StoryObj<Props> = {
  args: {},
  play: async ({ canvasElement, userEvent }) => {
    const button = canvasElement.querySelector(".moon-button");
    if (button) {
      await userEvent.click(button);
    }
  },
};
