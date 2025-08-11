import type { Meta, StoryObj } from "@storybook/html-vite";
import * as React from "react";
import LinksBlock from "../../shared/LinksBlock";
import Join from "./Join";
import { createHeartIcon } from "./utils/getIcon";

type Props = React.ComponentProps<typeof Join>;

const meta: Meta<Props> = {
  title: "Components/Join",
  component: Join,
  argTypes: {
    children: {
      description: "Elements to be joined together",
      control: false,
    },
    className: {
      description: "Custom class for the Join container",
      control: "text",
    },
    style: {
      description: "Custom style for the Join container",
      control: "object",
    },
  },
  parameters: {
    docs: {
      container: ({ context }) => (
        <LinksBlock
          context={context}
          moon="components/join"
          github="Join.tsx"
        />
      ),
    },
  },
};

export default meta;

export const JoinedButtons: StoryObj<Props> = {
  name: "Three Joined Buttons",
  render: (args) => {
    const join = Join(args);
    const btn1 = document.createElement("button");
    btn1.className = "moon-button moon-button-fill moon-join-item";
    const span = document.createElement("span");
    span.innerText = "Active";
    btn1.appendChild(span);
    const btn2 = document.createElement("button");
    btn2.className = "moon-icon-button moon-icon-button-fill moon-join-item";
    btn2.appendChild(createHeartIcon());
    join.appendChild(btn1);
    join.appendChild(btn2);
    return join;
  },
  args: {},
};

export const JoinedInputs: StoryObj<Props> = {
  name: "Three Joined Inputs",
  render: (args) => {
    const join = Join(args);
    const input1 = document.createElement("input");
    input1.className = "moon-input moon-join-item";
    input1.placeholder = "First";
    const input2 = document.createElement("input");
    input2.className = "moon-input moon-join-item";
    input2.placeholder = "Second";
    const input3 = document.createElement("input");
    const input4 = document.createElement("input");
    input3.className = "moon-input moon-join-item";
    input3.placeholder = "Third";
    input4.className = "moon-input moon-join-item";
    input4.placeholder = "Fourth";
    join.appendChild(input1);
    join.appendChild(input2);
    join.appendChild(input3);
    join.appendChild(input4);
    return join;
  },
  args: {},
};

export const JoinedInputsAndButtons: StoryObj<Props> = {
  name: "Joined Inputs and Buttons",
  render: (args) => {
    const join = Join(args);
    const input1 = document.createElement("input");
    input1.className = "moon-input moon-join-item";
    input1.placeholder = "First";
    const input2 = document.createElement("input");
    input2.className = "moon-input moon-join-item";
    input2.placeholder = "Second";
    const span1 = document.createElement("span");
    span1.innerText = "Btn";
    const span2 = document.createElement("span");
    span2.innerText = "Btn";
    const btn1 = document.createElement("button");
    btn1.className = "moon-button moon-join-item";
    const btn2 = document.createElement("button");
    btn2.className = "moon-button moon-join-item";
    btn2.appendChild(span2);
    btn1.appendChild(span1);
    join.appendChild(btn1);
    join.appendChild(input1);
    join.appendChild(input2);
    join.appendChild(btn2);

    return join;
  },
  args: {},
};

export const JoinedSearchAndSelect: StoryObj<Props> = {
  name: "Joined Search and Select",
  render: (args) => {
    const join = Join(args);
    const input1 = document.createElement("input");
    input1.className = "moon-input w-42 moon-join-item";
    input1.placeholder = "First";
    const input2 = document.createElement("select");
    input2.className = "moon-select w-28 moon-join-item";
    const option1 = document.createElement("option");
    option1.value = "option1";
    option1.innerText = "Option 1";
    const option2 = document.createElement("option");
    option2.value = "option2";
    option2.innerText = "Option 2";
    input2.appendChild(option1);
    input2.appendChild(option2);
    join.appendChild(input1);
    join.appendChild(input2);

    return join;
  },
  args: {},
};

export const VerticalJoinedInputs: StoryObj<Props> = {
  name: "Vertical Joined Inputs",
  render: (args) => {
    const join = Join(args);
    const input1 = document.createElement("input");
    input1.className = "moon-input moon-join-item";
    input1.placeholder = "First";
    const input2 = document.createElement("input");
    input2.className = "moon-input moon-join-item";
    input2.placeholder = "Second";
    const input3 = document.createElement("input");
    const input4 = document.createElement("input");
    input3.className = "moon-input moon-join-item";
    input3.placeholder = "Third";
    input4.className = "moon-input moon-join-item";
    input4.placeholder = "Fourth";
    join.appendChild(input1);
    join.appendChild(input2);
    join.appendChild(input3);
    join.appendChild(input4);
    return join;
  },
  args: {
    direction: "column",
  },
};

export const VerticalJoinedButtons: StoryObj<Props> = {
  name: "Vertical Joined Buttons",
  render: (args) => {
    const join = Join(args);
    const btn1 = document.createElement("button");
    btn1.className = "moon-icon-button moon-icon-button-ghost moon-join-item";
    btn1.appendChild(createHeartIcon());
    const btn2 = document.createElement("button");
    btn2.className = "moon-icon-button moon-icon-button-ghost moon-join-item";
    btn2.appendChild(createHeartIcon());
    const btn3 = document.createElement("button");
    btn3.className = "moon-icon-button moon-icon-button-ghost moon-join-item";
    btn3.appendChild(createHeartIcon());
    join.appendChild(btn1);
    join.appendChild(btn2);
    join.appendChild(btn3);
    return join;
  },
  args: {
    direction: "column",
  },
};
