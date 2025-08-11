import closeIcon from "../../shared/icons/closeIcon";
import getChildren from "../../shared/utils/getChildren";

export type Props = {
  hasDismissButton: boolean;
  title: string;
  hasTitle: boolean;
  hasHandle: boolean;
};

const createBottomSheet = (args: Props) => {
  const { title, hasTitle, hasDismissButton, hasHandle } = args;
  const bottomSheetWrapper = document.createElement("div");
  const bottomSheet = document.createElement("dialog");
  const bottomSheetBox = document.createElement("div");
  const content = document.createElement("div");
  const openButton = document.createElement("button");
  const formButton = document.createElement("button");
  const form = document.createElement("form");
  form.method = "dialog";
  form.className = "moon-backdrop";
  form.appendChild(formButton);
  content.className =
    "w-full flex items-center justify-center h-full bg-brand-subtle text-brand overflow-y-auto";
  content.textContent = "Content";
  bottomSheet.className = "moon-bottom-sheet";
  bottomSheet.id = "bottomSheet";
  bottomSheetBox.className = "moon-bottom-sheet-box";
  openButton.textContent = "Open Bottom Sheet";
  openButton.className = "moon-button";
  openButton.setAttribute("onclick", "bottomSheet.showModal()");
  if (hasHandle) {
    const handle = document.createElement("div");
    handle.className = "moon-bottom-sheet-handle";
    bottomSheetBox.appendChild(handle);
  }
  if (hasTitle) {
    const titleElement = document.createElement("p");
    const dismissButton = document.createElement("button");
    dismissButton.className = "moon-bottom-sheet-close";
    dismissButton.setAttribute("onclick", "bottomSheet.close()");
    titleElement.className = "moon-bottom-sheet-title";
    titleElement.textContent = title;
    dismissButton.appendChild(getChildren({ children: closeIcon }));
    hasDismissButton && titleElement.appendChild(dismissButton);
    bottomSheetBox.appendChild(titleElement);
  }
  bottomSheetBox.appendChild(content);
  bottomSheet.appendChild(bottomSheetBox);
  bottomSheet.appendChild(form);
  bottomSheetWrapper.appendChild(openButton);
  bottomSheetWrapper.appendChild(bottomSheet);
  return bottomSheetWrapper;
};

export default createBottomSheet;
