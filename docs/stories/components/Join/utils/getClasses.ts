import type { Props } from "../Join";

const getClasses = (direction?: Props["direction"]): string => {
  let classes = ` moon-join-${direction}`;
  return classes.trim();
};

export default getClasses;
