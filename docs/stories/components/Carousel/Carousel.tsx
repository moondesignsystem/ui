import Icon from "../../shared/Icon";
import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";

export type Props = {
  length: number;
  hasPagination: boolean;
  hasArrows: boolean;
};

const Carousel = ({ length, hasPagination, hasArrows }: Props) => {
  const items = new Array(length).fill("");

  return (
    <div className="moon-carousel">
      <ul className="moon-carousel-reel">
        {items.map((_, index) => (
          <li key={index} className="moon-carousel-item">
            <div className="flex items-center justify-center h-160 w-2xs bg-brand-subtle text-brand">
              Item {index + 1}
            </div>
          </li>
        ))}
      </ul>

      {hasArrows && (
        <>
          <button className="moon-carousel-control">
            <Icon name="chevron-left" />
          </button>
          <button className="moon-carousel-control">
            <Icon name="chevron-right" />
          </button>
        </>
      )}

      {hasPagination && (
        <div className="moon-pagination">
          {items.map((_, index) => (
            <button
              key={index}
              className={`moon-pagination-item${
                index === 2 ? " moon-pagination-item-active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default createHTMLComponent(Carousel);
