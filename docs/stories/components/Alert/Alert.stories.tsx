import type { Meta, StoryObj } from "@storybook/html-vite";
import LinksBlock from "../../shared/LinksBlock";
import CONTEXTS from "../../shared/contexts";
import createAlert, { VARIANTS } from "./Alert";
import type { Props } from "./Alert";

const meta: Meta<Props> = {
  title: "Messaging & feedback/Alert",
  render: createAlert,
  argTypes: {
    title: {
      description: "Title of Alert",
      control: "text",
    },
    hasStartIcon: {
      description: "Start icon of Alert",
      control: "boolean",
    },
    hasDismissButton: {
      description: "Dismiss button of Alert",
      control: "boolean",
    },
    hasActionButton: {
      description: "Action button of Alert",
      control: "boolean",
    },
    actionLabel: {
      description: "Action button label of Alert",
      control: "text",
      if: { arg: "hasActionButton" },
    },
    hasContent: {
      description: "Has content of Alert",
      control: "boolean",
    },
    contentLabel: {
      description: "Text content of Alert",
      control: "text",
      if: { arg: "hasContent" },
    },
    variant: {
      description: "Variant of Alert",
      control: "select",
      options: VARIANTS,
    },
    context: {
      description: "Context of Alert",
      control: "select",
      options: CONTEXTS,
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="messaging-and-feedback/alert"
          github="_alert.scss"
        />
      ),
    },
  },
};

export default meta;

export const Alert: StoryObj<Props> = {
  args: {
    variant: "fill",
    context: "brand",
    hasStartIcon: false,
    hasDismissButton: false,
    hasActionButton: false,
    actionLabel: "Action",
    hasContent: false,
    contentLabel: "Content",
    title: "Alert",
  },
};
