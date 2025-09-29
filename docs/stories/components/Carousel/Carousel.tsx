import Icon from "../../shared/Icon";
import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";

export type Props = {
  length: number;
  hasControls: boolean;
};

const Carousel = ({ length, hasControls }: Props) => {
  const items = new Array(length).fill("");

  return (
    <div className="moon-carousel">
      <ul className="moon-carousel-reel">
        {items.map((_, index) => (
          <li key={index} className="moon-carousel-item">
            <div className="flex items-center justify-center h-40 w-2xs bg-brand-subtle text-brand">
              Item {index + 1}
            </div>
          </li>
        ))}
      </ul>

      {hasControls && (
        <>
          <button className="moon-carousel-control">
            <Icon name="chevron-left" />
          </button>
          <button className="moon-carousel-control">
            <Icon name="chevron-right" />
          </button>
        </>
      )}
    </div>
  );
};

export default createHTMLComponent(Carousel);
