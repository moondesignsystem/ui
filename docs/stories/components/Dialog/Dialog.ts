export type Props = {
  hasCloseButton: boolean;
  title: string;
  hasTitle: boolean;
};

const createDialog = (args: Props) => {
  const { title, hasTitle, hasCloseButton } = args;
  const dialogWrapper = document.createElement("div");
  const dialog = document.createElement("dialog");
  const dialogBox = document.createElement("div");
  const content = document.createElement("div");
  const openButton = document.createElement("button");
  const formButton = document.createElement("button");
  const form = document.createElement("form");
  form.method = "dialog";
  form.className = "moon-backdrop";
  form.appendChild(formButton);
  content.className =
    "w-full flex items-center justify-center h-space-160 bg-brand-subtle text-brand";
  content.textContent = "Content";
  dialog.className = "moon-dialog";
  dialog.id = "dialog";
  dialogBox.className = "moon-dialog-box";
  openButton.textContent = "Open Dialog";
  openButton.className = "moon-button";
  openButton.setAttribute("onclick", "dialog.showModal()");
  if (hasTitle) {
    const titleElement = document.createElement("p");
    const closeButton = document.createElement("button");
    closeButton.className = "moon-dialog-close";
    closeButton.setAttribute("onclick", "dialog.close()");
    titleElement.className = "moon-dialog-header";
    titleElement.textContent = title;
    const icon = document.createElement("div");
    icon.className = "moon-icon mask-cover bg-[currentColor]";
    icon.style.maskImage = `url(/icons/close.svg)`;
    closeButton.appendChild(icon);
    hasCloseButton && titleElement.appendChild(closeButton);
    dialogBox.appendChild(titleElement);
  }
  dialogBox.appendChild(content);
  dialog.appendChild(dialogBox);
  dialog.appendChild(form);
  dialogWrapper.appendChild(openButton);
  dialogWrapper.appendChild(dialog);
  return dialogWrapper;
};

export default createDialog;
