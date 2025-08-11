export type Props = {
  length: number;
};

const createBreadcrumb = (args: Props) => {
  const { length } = args;
  const breadcrumb = document.createElement("ul");
  const items = new Array(length).fill("");
  items.forEach((_, i) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = `Page ${i + 1}`;
    li.className =
      i === items.length - 1
        ? "moon-breadcrumb-item moon-breadcrumb-item-active"
        : "moon-breadcrumb-item";

    li.appendChild(button);
    breadcrumb.appendChild(li);
  });
  breadcrumb.className = "moon-breadcrumb";
  return breadcrumb;
};

export default createBreadcrumb;
