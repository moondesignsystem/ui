import React from "react";
import LinksBlock from "../../shared/LinksBlock";
import createRadio, { LABEL_POSITIONS } from "./Radio";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Radio";

const meta: Meta<Props> = {
  title: "Forms & selection controls/Radio",
  render: createRadio,
  argTypes: {
    checked: {
      description: "Checked state of Radio",
      control: "boolean",
    },
    disabled: {
      description: "Disabled state of Radio",
      control: "boolean",
    },
    label: {
      description: "Label of Radio",
      control: "text",
    },
    labelPosition: {
      description: "Position of label of Radio",
      control: "select",
      options: LABEL_POSITIONS,
      if: { arg: "label" },
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="forms-and-selection-controls/radio-0WSJs8Jn"
          github="_radio.scss"
        />
      ),
    },
  },
};

export default meta;

export const Radio: StoryObj<Props> = {
  args: {
    disabled: false,
    checked: false,
    label: "",
    labelPosition: "start",
  },
};
