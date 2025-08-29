import LinksBlock from "../../shared/LinksBlock";
import createBottomSheet from "./BottomSheet";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./BottomSheet";

const meta: Meta<Props> = {
  title: "Containers & layout/Bottom Sheet",
  render: createBottomSheet,
  argTypes: {
    hasDismissButton: {
      description: "Dismiss button of Bottom Sheet",
      control: "boolean",
      if: { arg: "hasTitle" },
    },
    title: {
      descriptrion: "Title of Bottom Sheet",
      control: "text",
      if: { arg: "hasTitle" },
    },
    hasTitle: {
      description: "Has title of Bottom Sheet",
      control: "boolean",
    },
    hasHandle: {
      description: "Has handle of Bottom Sheet",
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="containers-and-layout/bottom-sheet"
          github="_bottomSheet.scss"
        />
      ),
    },
  },
};

export default meta;

export const BottomSheet: StoryObj<Props> = {
  args: {
    hasTitle: false,
    title: "Bottom Sheet",
    hasDismissButton: false,
    hasHandle: false,
  },
  play: async ({ canvasElement, userEvent }) => {
    const button = canvasElement.querySelector("button");
    await userEvent.click(button);
  },
};
