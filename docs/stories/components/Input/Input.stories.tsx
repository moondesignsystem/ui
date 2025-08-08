import React from "react";
import LinksBlock from "../../shared/LinksBlock";
import createInput, { SIZES } from "./Input";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Input";

const meta: Meta<Props> = {
  title: "Forms & selection controls/Input",
  render: createInput,
  argTypes: {
    error: {
      description: "Error state of Input",
      control: "boolean",
    },
    disabled: {
      description: "Disabled state of Input",
      control: "boolean",
    },
    label: {
      description: "Label of Input",
      control: "text",
    },
    hint: {
      description: "Hint of Input",
      control: "text",
    },
    size: {
      description: "Size of Input",
      control: "select",
      options: SIZES,
    },
    placeholder: {
      description: "Placeholder of Input",
      control: "text",
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="forms-and-selection-controls/input-7idv2lm3"
          github="_input.scss"
        />
      ),
    },
  },
};

export default meta;

export const Input: StoryObj<Props> = {
  args: {
    size: "md",
    disabled: false,
    error: false,
    label: "",
    hint: "",
    placeholder: "",
  },
};
