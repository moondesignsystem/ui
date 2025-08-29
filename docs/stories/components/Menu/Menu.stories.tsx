import LinksBlock from "../../shared/LinksBlock";
import createMenu, { SIZES } from "./Menu";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Menu";

const meta: Meta<Props> = {
  title: "Navigation/Menu",
  render: createMenu,
  argTypes: {
    items: {
      description: "Amount of Menu items",
      control: { type: "range", min: 1, max: 7, step: 1 },
    },
    label: {
      description: "Item lables for Menu",
      control: "text",
    },
    size: {
      description: "Size of Menu",
      control: "select",
      options: SIZES,
    },
    hasStartIcon: {
      description: "Start icon of Menu",
      control: "boolean",
    },
    hasEndIcon: {
      description: "End icon of Menu",
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="navigation/menu"
          github="_menu.scss"
        />
      ),
    },
  },
};

export default meta;

export const Menu: StoryObj<Props> = {
  args: {
    size: "md",
    items: 3,
    hasStartIcon: false,
    hasEndIcon: false,
    label: "Label",
  },
};
