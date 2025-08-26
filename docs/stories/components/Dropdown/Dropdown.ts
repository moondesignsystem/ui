export type Props = {};

const createDropdown = (args: Props) => {
  const {} = args;
  const dropdown = document.createElement("div");
  const content = document.createElement("div");
  content.className =
    "w-full flex items-center justify-center h-80 bg-brand-subtle text-brand";
  content.textContent = "Content";
  dropdown.className = "moon-dropdown";
  dropdown.appendChild(content);
  return dropdown;
};

export default createDropdown;
