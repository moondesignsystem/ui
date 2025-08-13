import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";

export type Props = {
  length: number;
};

const Breadcrumb = ({ length }: Props) => {
  const items = new Array(length).fill("");

  return (
    <ul className="moon-breadcrumb">
      {items.map((_, i) => (
        <li
          key={i}
          className={
            i === items.length - 1
              ? "moon-breadcrumb-item moon-breadcrumb-item-active"
              : "moon-breadcrumb-item"
          }
        >
          <button>Page {i + 1}</button>
        </li>
      ))}
    </ul>
  );
};

export default createHTMLComponent(Breadcrumb);
