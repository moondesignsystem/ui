import closeIcon from "../../shared/icons/closeIcon";
import getChildren from "../../shared/utils/getChildren";

export type Props = {
  hasDismissButton: boolean;
  title: string;
  hasTitle: boolean;
};

const createDialog = (args: Props) => {
  const { title, hasTitle, hasDismissButton } = args;
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
    const dismissButton = document.createElement("button");
    dismissButton.className = "moon-dialog-close";
    dismissButton.setAttribute("onclick", "dialog.close()");
    titleElement.className = "moon-dialog-title";
    titleElement.textContent = title;
    dismissButton.appendChild(getChildren({ children: closeIcon }));
    hasDismissButton && titleElement.appendChild(dismissButton);
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
