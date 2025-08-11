import React from "react";
import { renderToString } from "react-dom/server";

const formatHtml = (html: string): string => {
  let formatted = "";
  let indent = 0;
  const indentStr = "  ";
  const tokens = html.split(/(<[^>]*>)/g).filter(Boolean);
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].trim();
    if (!token) continue;
    if (token.startsWith("</")) {
      const prevToken = i > 0 ? tokens[i - 1].trim() : "";
      const prevWasText = prevToken && !prevToken.startsWith("<");
      const prevTokenIndex = i - 1;
      const prevActualToken =
        prevTokenIndex >= 0 ? tokens[prevTokenIndex].trim() : "";
      const isEmpty =
        prevActualToken &&
        prevActualToken.startsWith("<") &&
        !prevActualToken.startsWith("</");
      if (prevWasText || isEmpty) {
        formatted += token;
      } else {
        indent--;
        formatted += "\n" + indentStr.repeat(indent) + token;
      }
    } else if (token.startsWith("<")) {
      formatted += "\n" + indentStr.repeat(indent) + token;
      if (
        !token.endsWith("/>") &&
        !token.match(/<(br|hr|img|input|meta|link)/)
      ) {
        const nextTokenIndex = i + 1;
        const nextToken =
          nextTokenIndex < tokens.length ? tokens[nextTokenIndex].trim() : "";
        const isEmptyElement = nextToken && nextToken.startsWith("</");
        let nextNonEmptyIndex = i + 1;
        while (
          nextNonEmptyIndex < tokens.length &&
          !tokens[nextNonEmptyIndex].trim()
        ) {
          nextNonEmptyIndex++;
        }
        const nextNonEmptyToken =
          nextNonEmptyIndex < tokens.length
            ? tokens[nextNonEmptyIndex].trim()
            : "";
        const hasOnlyTextContent =
          nextNonEmptyIndex < tokens.length - 1 &&
          nextNonEmptyToken &&
          !nextNonEmptyToken.startsWith("<") &&
          tokens[nextNonEmptyIndex + 1] &&
          tokens[nextNonEmptyIndex + 1].trim().startsWith("</");
        if (!hasOnlyTextContent && !isEmptyElement) {
          indent++;
        }
      }
    } else {
      formatted += token;
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
      Object.defineProperty(element, "outerHTML", {
        get: () => formattedHtml,
        configurable: true,
      });
    }

    return element;
  };
};

export default createHTMLComponent;
