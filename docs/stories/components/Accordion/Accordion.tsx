import Icon from "../../shared/Icon";
import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";
import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["sm", "md", "lg", "xl"] as const;
export const VARIANTS = ["fill", "ghost", "outline"] as const;

export type Props = {
  size: (typeof SIZES)[number];
  variant: (typeof VARIANTS)[number];
  items: number;
};

const Accordion = ({ size, variant, items }: Props) => {
  const accordionItems = new Array(items).fill("");

  return (
    <div
      className={joinClassnames([
        "moon-accordion",
        getClasses(size),
        getClasses(variant),
      ])}
    >
      {accordionItems.map((_, index) => (
        <div key={index} className="moon-accordion-item">
          <input type="radio" name="accordion" />
          <p className="moon-accordion-title">
            <span className="moon-accordion-title-text">Item {index + 1}</span>
            <button className="moon-accordion-chevron-button">
              <Icon
                name="chevron-right"
                className="moon-accordion-chevron-icon"
              />
            </button>
          </p>
          <p className="moon-accordion-content">Content</p>
        </div>
      ))}
    </div>
  );
};

export default createHTMLComponent(Accordion);
