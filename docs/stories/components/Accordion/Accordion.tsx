import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";
import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["sm", "md", "lg", "xl"] as const;

export type Props = {
  size: (typeof SIZES)[number];
  items: number;
};

const Accordion = ({ size, items }: Props) => {
  const accordionItems = new Array(items).fill("");

  return (
    <div className={joinClassnames(["moon-accordion", getClasses(size)])}>
      {accordionItems.map((_, index) => (
        <div key={index} className="moon-accordion-item">
          <input type="radio" name="accordion" />
          <p className="moon-accordion-title">Title</p>
          <p className="moon-accordion-content">Content</p>
        </div>
      ))}
    </div>
  );
};

export default createHTMLComponent(Accordion);
