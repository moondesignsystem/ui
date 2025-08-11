import LinksBlock from "../../shared/LinksBlock";
import createSnackbar, { VARIANTS } from "./Snackbar";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Snackbar";

const meta: Meta<Props> = {
  title: "Messaging & feedback/Snackbar",
  render: createSnackbar,
  argTypes: {
    title: {
      description: "Title of Snackbar",
      control: "text",
    },
    hasStartIcon: {
      description: "Start icon of Snackbar",
      control: "boolean",
    },
    hasActionButton: {
      description: "Action button of Snackbar",
      control: "boolean",
    },
    actionLabel: {
      description: "Action button label of Snackbar",
      control: "text",
      if: { arg: "hasActionButton" },
    },
    variant: {
      description: "Variant of Snackbar",
      control: "select",
      options: VARIANTS,
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="messaging-and-feedback/snackbar-MAmMffP9"
          github="_snackbar.scss"
        />
      ),
    },
  },
};

export default meta;

export const Snackbar: StoryObj<Props> = {
  args: {
    variant: "neutral",
    hasStartIcon: false,
    hasActionButton: false,
    actionLabel: "Action",
    title: "Snackbar",
  },
};
