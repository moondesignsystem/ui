import type { Meta, StoryObj } from "@storybook/html-vite";
import LinksBlock from "../../shared/LinksBlock";
import createDialog from "./Dialog";
import type { Props } from "./Dialog";

const meta: Meta<Props> = {
  title: "Containers & layout/Dialog",
  render: createDialog,
  argTypes: {
    hasCloseButton: {
      description: "Close button of Dialog",
      control: "boolean",
      if: { arg: "hasTitle" },
    },
    title: {
      descriptrion: "Title of Dialog",
      control: "text",
      if: { arg: "hasTitle" },
    },
    hasTitle: {
      description: "Has title of Dialog",
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="containers-and-layout/dialog"
          github="_dialog.scss"
        />
      ),
    },
  },
};

export default meta;

export const Dialog: StoryObj<Props> = {
  args: {
    hasTitle: false,
    title: "Dialog",
    hasCloseButton: false,
  },
  play: async ({ canvasElement, userEvent }) => {
    const button = canvasElement.querySelector("button");
    await userEvent.click(button);
  },
};
