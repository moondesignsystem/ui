import LinksBlock from "../../shared/LinksBlock";
import createTabList, { SIZES } from "./TabList";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./TabList";

const meta: Meta<Props> = {
  title: "Navigation/Tab List",
  render: createTabList,
  argTypes: {
    label: {
      description: "Label of Tab List",
      control: "text",
    },
    size: {
      description: "Size of Tab List",
      control: "select",
      options: SIZES,
    },
    length: {
      description: "Length of Tab List",
      control: { type: "range", min: 2, max: 4, step: 1 },
    },
    hasStartIcon: {
      description: "Start icon of Tab List",
      control: "boolean",
    },
    hasEndIcon: {
      description: "End icon of Tab List",
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="navigation/tab-list-xPXqwb2q"
          github="_tabList.scss"
        />
      ),
    },
  },
};

export default meta;

export const TabList: StoryObj<Props> = {
  args: {
    size: "md",
    length: 3,
    hasStartIcon: false,
    hasEndIcon: false,
    label: "Tab",
  },
};
