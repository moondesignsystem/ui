import React from "react";
import LinksBlock from "../../shared/LinksBlock";
import createAuthenticator, { SIZES } from "./Authenticator";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Authenticator";

const meta: Meta<Props> = {
  title: "Forms & selection controls/Authenticator",
  render: createAuthenticator,
  argTypes: {
    size: {
      description: "Size of Authenticator",
      control: "select",
      options: SIZES,
    },
    disabled: {
      description: "Disabled state of Authenticator",
      type: "boolean",
    },
    error: {
      description: "Error state of Authenticator",
      type: "boolean",
    },
    label: {
      description: "Label of Authenticator",
      control: "text",
    },
    hint: {
      description: "Hint of Authenticator",
      control: "text",
    },
    length: {
      description: "Length of Authenticator",
      control: { type: "range", min: 4, max: 6, step: 1 },
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="forms-and-selection-controls/authenticator-Vjp3l9gH"
          github="_authenticator.scss"
        />
      ),
    },
  },
};

export default meta;

export const Authenticator: StoryObj<Props> = {
  args: {
    size: "md",
    length: 6,
    error: false,
    disabled: false,
    label: "",
    hint: "",
  },
};
