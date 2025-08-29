import LinksBlock from "../../shared/LinksBlock";
import createPagination from "./Pagination";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Pagination";

const meta: Meta<Props> = {
  title: "Navigation/Pagination",
  render: createPagination,
  argTypes: {
    length: {
      description: "Amount of Pagination items",
      control: { type: "range", min: 3, max: 7, step: 1 },
    },
    hasNavigation: {
      description: "Naviagation buttons for Pagination",
      type: "boolean",
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="navigation/pagination"
          github="_pagination.scss"
        />
      ),
    },
  },
};

export default meta;

export const Pagination: StoryObj<Props> = {
  args: {
    length: 5,
    hasNavigation: false,
  },
};
