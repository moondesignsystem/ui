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
          {i === items.length - 1 ? (
            <>Page {i + 1}</>
          ) : (
            <a href="#">Page {i + 1}</a>
          )}
        </li>
      ))}
    </ul>
  );
};

export default createHTMLComponent(Breadcrumb);
