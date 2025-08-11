import getChildren from "../../shared/utils/getChildren";
import chevronLeft from "../../shared/icons/chevronLeft";
import chevronRight from "../../shared/icons/chevronRight";

export type Props = {
  length: number;
  hasNavigation: boolean;
};

const createPagination = (args: Props) => {
  const { length, hasNavigation } = args;
  const pagination = document.createElement("div");
  const items = new Array(length).fill("");
  const startButton = document.createElement("button");
  const endButton = document.createElement("button");
  startButton.className =
    "moon-icon-button moon-icon-button-sm moon-icon-button-soft";
  startButton.appendChild(getChildren({ children: chevronLeft }));
  endButton.appendChild(getChildren({ children: chevronRight }));
  endButton.className =
    "moon-icon-button moon-icon-button-sm moon-icon-button-soft";
  hasNavigation && pagination.appendChild(startButton);
  items.forEach((_, i) => {
    const button = document.createElement("button");
    button.className = "moon-pagination-item";
    button.className = `moon-pagination-item${
      i === 2 ? " moon-pagination-item-active" : ""
    }`;
    button.textContent = (i + 1).toString();
    pagination.appendChild(button);
  });
  hasNavigation && pagination.appendChild(endButton);
  pagination.className = "moon-pagination";
  return pagination;
};

export default createPagination;
