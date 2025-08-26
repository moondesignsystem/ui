import LinksBlock from "../../shared/LinksBlock";
import createDropdown from "./Dropdown";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { Props } from "./Dropdown";

const meta: Meta<Props> = {
  title: "Containers & layout/Dropdown",
  render: createDropdown,
  argTypes: {},
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="containers-and-layout/dropdown-7PTKuVFo-7PTKuVFo"
          github="_dropdown.scss"
        />
      ),
    },
  },
};

export default meta;

export const Dropdown: StoryObj<Props> = {
  args: {},
};
