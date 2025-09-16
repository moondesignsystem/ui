import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";
import joinClassnames from "../../shared/utils/joinClassnames";
import Icon from "../../shared/Icon";
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
        <details key={index} className="moon-accordion-item">
          <summary className="moon-accordion-item-header">
            Item {index + 1}
            <div className="moon-accordion-item-meta">
              <button className="moon-accordion-item-toggle">
                <Icon name="chevron-down" />
              </button>
            </div>
          </summary>
          <div className="moon-accordion-item-content">Content</div>
        </details>
      ))}
    </div>
  );
};

export default createHTMLComponent(Accordion);
