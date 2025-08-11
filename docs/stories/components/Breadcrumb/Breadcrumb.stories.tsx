import React from "react";
import LinksBlock from "../../shared/LinksBlock";
import createBreadcrumb from "./Breadcrumb";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Breadcrumb";

const meta: Meta<Props> = {
  title: "Navigation/Breadcrumb",
  render: createBreadcrumb,
  argTypes: {
    length: {
      description: "Amount of Breadcrumb items",
      control: { type: "range", min: 3, max: 7, step: 1 },
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="navigation/breadcrumb-fmvO4kmF"
          github="_breadcrumb.scss"
        />
      ),
    },
  },
};

export default meta;

export const Breadcrumb: StoryObj<Props> = {
  args: {
    length: 5,
  },
};
