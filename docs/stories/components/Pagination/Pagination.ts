export type Props = {
  length: number;
  hasControls: boolean;
};

const createPagination = (args: Props) => {
  const { length, hasControls } = args;
  const pagination = document.createElement("div");
  const items = new Array(length).fill("");
  const startButton = document.createElement("button");
  const endButton = document.createElement("button");
  startButton.className = "moon-pagination-control";
  const startIcon = document.createElement("div");
  startIcon.className = "moon-icon mask-cover bg-[currentColor]";
  startIcon.style.maskImage = `url(/icons/chevron-left.svg)`;
  startButton.appendChild(startIcon);
  const endIcon = document.createElement("div");
  endIcon.className = "moon-icon mask-cover bg-[currentColor]";
  endIcon.style.maskImage = `url(/icons/chevron-right.svg)`;
  endButton.appendChild(endIcon);
  endButton.className = "moon-pagination-control";
  hasControls && pagination.appendChild(startButton);
  items.forEach((_, i) => {
    const button = document.createElement("button");
    button.className = "moon-pagination-item";
    button.className = `moon-pagination-item${
      i === 2 ? " moon-pagination-item-active" : ""
    }`;
    button.textContent = (i + 1).toString();
    pagination.appendChild(button);
  });
  hasControls && pagination.appendChild(endButton);
  pagination.className = "moon-pagination";
  return pagination;
};

export default createPagination;
