import React from "react";
import LinksBlock from "../../shared/LinksBlock";
import createTextarea, { SIZES } from "./Textarea";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Textarea";

const meta: Meta<Props> = {
  title: "Forms & selection controls/Textarea",
  render: createTextarea,
  argTypes: {
    error: {
      description: "Error state of Textarea",
      control: "boolean",
    },
    disabled: {
      description: "Disabled state of Textarea",
      control: "boolean",
    },
    label: {
      description: "Label of Textarea",
      control: "text",
    },
    hint: {
      description: "Hint of Textarea",
      control: "text",
    },
    placeholder: {
      description: "Placeholder of Textarea",
      control: "text",
    },
    size: {
      description: "Size of Textares",
      control: "select",
      options: SIZES,
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="forms-and-selection-controls/textarea-gQJz078t"
          github="_textarea.scss"
        />
      ),
    },
  },
};

export default meta;

export const Textarea: StoryObj<Props> = {
  args: {
    size: "md",
    disabled: false,
    error: false,
    hint: "",
    label: "",
    placeholder: "",
  },
};
