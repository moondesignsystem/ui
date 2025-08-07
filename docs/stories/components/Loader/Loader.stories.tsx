import React from "react";
import LinksBlock from "../../shared/LinksBlock";
import createLoader, { SIZES } from "./Loader";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Loader";

const meta: Meta<Props> = {
  title: "Indicators & status/Loader",
  render: createLoader,
  argTypes: {
    size: {
      description: "Size of Loader",
      control: "select",
      options: SIZES,
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="indicators-and-status/loader-f9YNrGZD"
          github="_loader.scss"
        />
      ),
    },
  },
};

export default meta;

export const Loader: StoryObj<Props> = {
  args: {
    size: "md",
  },
};
