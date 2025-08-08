import React from "react";
import LinksBlock from "../../shared/LinksBlock";
import createTable, { SIZES } from "./Table";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Table";

const meta: Meta<Props> = {
  title: "Content display/Table",
  render: createTable,
  argTypes: {
    cols: {
      description: "Amount of Table cols",
      control: { type: "range", min: 2, max: 5, step: 1 },
    },
    rows: {
      description: "Amount of Table rows",
      control: { type: "range", min: 2, max: 10, step: 1 },
    },
    size: {
      description: "Size of Table rows",
      control: "select",
      options: SIZES,
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="content-display/table-djm1mitt"
          github="_table.scss"
        />
      ),
    },
  },
};

export default meta;

export const Table: StoryObj<Props> = {
  args: {
    size: "md",
    cols: 3,
    rows: 5,
  },
};
