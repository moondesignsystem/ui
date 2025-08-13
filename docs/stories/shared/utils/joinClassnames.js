const joinClassnames = (classList = []) => {
  const classNames = classList
    .filter((item) => item && item !== "")
    .join(" ")
    .trim();

  return classNames;
};

export default joinClassnames;
