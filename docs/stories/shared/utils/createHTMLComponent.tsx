import React from "react";
import { renderToString } from "react-dom/server";

const formatHtml = (html: string): string => {
  const cleanedHtml = html.replace(/<!-- -->/g, "");
  let formatted = "";
  let indent = 0;
  const indentStr = "  ";
  // Split by tags and preserve text content
  const tokens = cleanedHtml
    .split(/(<[^>]*>)/g)
    .filter((token) => token.length > 0);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const trimmedToken = token.trim();

    if (!trimmedToken) continue;

    if (trimmedToken.startsWith("</")) {
      // Closing tag
      indent--;
      formatted += "\n" + indentStr.repeat(indent) + trimmedToken;
    } else if (trimmedToken.startsWith("<")) {
      // Opening tag
      formatted += "\n" + indentStr.repeat(indent) + trimmedToken;

      // Check if it's a self-closing tag or void element
      const isSelfClosing =
        trimmedToken.endsWith("/>") ||
        /^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/.test(
          trimmedToken
        );

      if (!isSelfClosing) {
        indent++;
      }
    } else {
      // Text content
      if (trimmedToken.length > 0) {
        formatted += "\n" + indentStr.repeat(indent) + trimmedToken;
      }
    }
  }

  return formatted.trim();
};

export const createHTMLComponent = <T extends Record<string, any>>(
  Component: React.ComponentType<T>
) => {
  return (args: T): HTMLElement => {
    const htmlString = renderToString(<Component {...args} />);
    const formattedHtml = formatHtml(htmlString);
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    const element = tempDiv.firstElementChild as HTMLElement;
    if (element) {
      // Store formatted HTML as a property for Storybook to display
      Object.defineProperty(element, "outerHTML", {
        get: () => {
          // Always re-format the current HTML content
          const currentHtml = element.cloneNode(true) as HTMLElement;
          const tempContainer = document.createElement("div");
          tempContainer.appendChild(currentHtml);
          return formatHtml(tempContainer.innerHTML);
        },
        configurable: true,
      });
      setTimeout(() => {
        // Handle BottomSheet
        const openBottomSheetButton = element.querySelector(
          '[data-action="open-bottom-sheet"], .moon-button'
        );
        const closeBottomSheetButton = element.querySelector(
          '[data-action="close-bottom-sheet"], .moon-bottom-sheet-close'
        );
        const bottomSheetDialog = element.querySelector(
          "#bottomSheet"
        ) as HTMLDialogElement;

        if (openBottomSheetButton && bottomSheetDialog) {
          openBottomSheetButton.addEventListener("click", () =>
            bottomSheetDialog.showModal()
          );
        }
        if (closeBottomSheetButton && bottomSheetDialog) {
          closeBottomSheetButton.addEventListener("click", () =>
            bottomSheetDialog.close()
          );
        }

        // Handle Dialog
        const openDialogButton = element.querySelector(".moon-button");
        const closeDialogButton = element.querySelector(".moon-dialog-close");
        const dialog = element.querySelector("#dialog") as HTMLDialogElement;

        if (openDialogButton && dialog && !bottomSheetDialog) {
          openDialogButton.addEventListener("click", () => dialog.showModal());
        }
        if (closeDialogButton && dialog) {
          closeDialogButton.addEventListener("click", () => dialog.close());
        }

        // Handle Drawer
        const openDrawerButton = element.querySelector(".moon-button");
        const closeDrawerButton = element.querySelector(".moon-drawer-close");
        const drawer = element.querySelector("#drawer") as HTMLDialogElement;

        if (openDrawerButton && drawer && !bottomSheetDialog && !dialog) {
          openDrawerButton.addEventListener("click", () => drawer.showModal());
        }
        if (closeDrawerButton && drawer) {
          closeDrawerButton.addEventListener("click", () => drawer.close());
        }
      }, 0);
    }

    return element;
  };
};

export default createHTMLComponent;
