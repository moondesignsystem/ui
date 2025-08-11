import LinksBlock from "../../shared/LinksBlock";
import createBadge from "./Badge";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Badge";

const meta: Meta<Props> = {
  title: "Indicators & status/Badge",
  render: createBadge,
  argTypes: {
    children: {
      description: "Content of Badge",
      control: "text",
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="indicators-and-status/badge-Zo8Ufqsg"
          github="_badge.scss"
        />
      ),
    },
  },
};

export default meta;

export const Badge: StoryObj<Props> = {
  args: {
    children: "",
  },
};
