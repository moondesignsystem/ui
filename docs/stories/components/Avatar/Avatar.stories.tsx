import React from "react";
import LinksBlock from "../../shared/LinksBlock";
import createAvatar, { SIZES, VARIANTS } from "./Avatar";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Avatar";

const meta: Meta<Props> = {
  title: "Content display/Avatar",
  render: createAvatar,
  argTypes: {
    size: {
      description: "Size of Avatar",
      control: "select",
      options: SIZES,
    },
    variant: {
      description: "Variant of Avatar",
      control: "select",
      options: VARIANTS,
    },
    hasChildren: {
      description: "Content of Avatar",
      control: "boolean",
    },
    children: {
      description:
        "Content of Avatar. <br> <strong>Note:</strong> Added a fallback to user icon for example purposes",
      control: "text",
      if: { arg: "hasChildren" },
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="content-display/avatar-m0aYYxhj"
          github="_avatar.scss"
        />
      ),
    },
  },
};

export default meta;

export const Avatar: StoryObj<Props> = {
  args: {
    size: "md",
    variant: "fill",
    hasChildren: false,
    children: "AB",
  },
};
