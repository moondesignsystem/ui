import stringToFragment from "./stringToFragment";

const getChildren = ({ children }) => {
  const fragment = document.createDocumentFragment();
  if (!children) {
    return fragment;
  }

  if (typeof children === "string") {
    const parsedChildren = stringToFragment(children);
    return fragment.appendChild(parsedChildren);
  }

  if (children) {
    if (Array.isArray(children)) {
      children.forEach((child) => fragment.appendChild(child));
    } else {
      fragment.appendChild(children);
    }
  }

  return fragment;
};

export default getChildren;
