import LinksBlock from "../../shared/LinksBlock";
import createDrawer, { POSITIONS } from "./Drawer";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Drawer";

const meta: Meta<Props> = {
  title: "Containers & layout/Drawer",
  render: createDrawer,
  argTypes: {
    hasCloseButton: {
      description: "Close button of Drawer",
      control: "boolean",
      if: { arg: "hasTitle" },
    },
    title: {
      descriptrion: "Title of Drawer",
      control: "text",
      if: { arg: "hasTitle" },
    },
    hasTitle: {
      description: "Has title of Drawer",
      control: "boolean",
    },
    position: {
      description: "Position of Drawer",
      control: "select",
      options: POSITIONS,
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="containers-and-layout/drawer"
          github="_drawer.scss"
        />
      ),
    },
  },
};

export default meta;

export const Drawer: StoryObj<Props> = {
  args: {
    position: "end",
    hasTitle: false,
    title: "Drawer",
    hasCloseButton: false,
  },
  play: async ({ canvasElement, userEvent }) => {
    const button = canvasElement.querySelector("button");
    await userEvent.click(button);
  },
};
