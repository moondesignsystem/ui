import getColor from "./getColor.js";
import getAlpha from "./getAlpha.js";
import getFontFamily from "./getFontFamily.js";
import getFontWeight from "./getFontWeight.js";
import getOpacity from "./getOpacity.js";
import getDimension from "./getDimension.js";
import type { FigmaColor, FigmaResolvedType } from "../../types.js";

const formatValue = (
  type: FigmaResolvedType,
  name: string,
  value: string | FigmaColor | number
) => {
  if (type === "COLOR") {
    const colorValue = value as FigmaColor;
    const { r, g, b, a } = colorValue;
    const result = `rgb(${getColor(r)} ${getColor(g)} ${getColor(b)}${getAlpha(
      a
    )})`;
    return result;
  } else if (name.toLowerCase().includes("family")) {
    return getFontFamily(value as string);
  } else if (name.toLowerCase().includes("weight")) {
    return getFontWeight(value as string | number);
  } else if (name.toLowerCase().includes("opacity")) {
    return getOpacity(value as number);
  } else if (type === "FLOAT") {
    return getDimension(value as number);
  } else {
    return value;
  }
};

export default formatValue;
