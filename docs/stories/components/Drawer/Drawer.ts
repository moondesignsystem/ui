import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const POSITIONS = ["start", "end"] as const;

export type Props = {
  hasCloseButton: boolean;
  title: string;
  hasTitle: boolean;
  position: (typeof POSITIONS)[number];
};

const createDrawer = (args: Props) => {
  const { title, hasTitle, hasCloseButton, position } = args;
  const drawerWrapper = document.createElement("div");
  const drawer = document.createElement("dialog");
  const drawerBox = document.createElement("div");
  const content = document.createElement("div");
  const openButton = document.createElement("button");
  const formButton = document.createElement("button");
  const form = document.createElement("form");
  form.method = "dialog";
  form.className = "moon-backdrop";
  form.appendChild(formButton);
  content.className =
    "w-full flex items-center justify-center h-full bg-brand-subtle text-brand";
  content.textContent = "Content";
  drawer.className = joinClassnames(["moon-drawer", getClasses(position)]);
  drawer.id = "drawer";
  drawerBox.className = "moon-drawer-box";
  openButton.textContent = "Open Drawer";
  openButton.className = "moon-button";
  openButton.setAttribute("onclick", "drawer.showModal()");
  if (hasTitle) {
    const titleElement = document.createElement("p");
    const closeButton = document.createElement("button");
    closeButton.className = "moon-drawer-close";
    closeButton.setAttribute("onclick", "drawer.close()");
    titleElement.className = "moon-drawer-header";
    titleElement.textContent = title;
    const icon = document.createElement("div");
    icon.className = "moon-icon mask-cover bg-[currentColor]";
    icon.style.maskImage = `url(/icons/close.svg)`;
    closeButton.appendChild(icon);
    hasCloseButton && titleElement.appendChild(closeButton);
    drawerBox.appendChild(titleElement);
  }
  drawerBox.appendChild(content);
  drawer.appendChild(drawerBox);
  drawer.appendChild(form);
  drawerWrapper.appendChild(openButton);
  drawerWrapper.appendChild(drawer);
  return drawerWrapper;
};

export default createDrawer;
