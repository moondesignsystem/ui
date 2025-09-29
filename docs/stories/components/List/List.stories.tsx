import LinksBlock from "../../shared/LinksBlock";
import createList, { SIZES } from "./List";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./List";

const meta: Meta<Props> = {
  title: "Content display/List",
  render: createList,
  argTypes: {
    items: {
      description: "Amount of List items",
      control: { type: "range", min: 1, max: 7, step: 1 },
    },
    label: {
      description: "Item lables for List",
      control: "text",
    },
    size: {
      description: "Size of List",
      control: "select",
      options: SIZES,
    },
    hasStartIcon: {
      description: "Start icon of List",
      control: "boolean",
    },
    hasEndIcon: {
      description: "End icon of List",
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      container: ({ context }: { context: any }) => (
        <LinksBlock
          context={context}
          moon="content-display/list"
          github="_list.scss"
        />
      ),
    },
  },
};

export default meta;

export const List: StoryObj<Props> = {
  args: {
    size: "md",
    items: 3,
    hasStartIcon: false,
    hasEndIcon: false,
    label: "Label",
  },
};
