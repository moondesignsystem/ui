import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["sm", "md", "lg", "xl"] as const;

export type Props = {
  size: (typeof SIZES)[number];
  items: number;
};

const createAccordion = (args: Props) => {
  const { size, items } = args;
  const accordion = document.createElement("div");
  const accordionItems = new Array(items).fill("");
  accordionItems.forEach((_) => {
    const accordionItem = document.createElement("div");
    const input = document.createElement("input");
    const title = document.createElement("p");
    const content = document.createElement("p");
    accordionItem.className = "moon-accordion-item";
    input.type = "radio";
    input.name = "accordion";
    accordionItem.appendChild(input);
    title.className = "moon-accordion-title";
    title.textContent = "Title";
    accordionItem.appendChild(title);
    content.className = "moon-accordion-content";
    content.textContent = "Content";
    accordionItem.appendChild(title);
    accordionItem.appendChild(content);
    accordion.appendChild(accordionItem);
  });
  accordion.className = joinClassnames(["moon-accordion", getClasses(size)]);
  return accordion;
};

export default createAccordion;
