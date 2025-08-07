const joinClassnames = (classList = []) => {
  const classNames = classList.filter((item) => item !== "").join(" ");

  return classNames;
};

export default joinClassnames;
