import getColor from "./getColor.js";
import getAlpha from "./getAlpha.js";
import getFontFamily from "./getFontFamily.js";
import getFontWeight from "./getFontWeight.js";
import getOpacity from "./getOpacity.js";
import getDimension from "./getDimension.js";

/**
 * @param {string} type
 * @param {string} name
 * @param {(string|Object|number)} value
 * @returns {(string|number)}
 */

const formatValue = (type, name, value) => {
  if (type === "COLOR") {
    const { r, g, b, a } = value;
    const result = `rgb(${getColor(r)} ${getColor(g)} ${getColor(b)}${getAlpha(
      a
    )})`;
    return result;
  } else if (name.toLowerCase().includes("family")) {
    return getFontFamily(value);
  } else if (name.toLowerCase().includes("weight")) {
    return getFontWeight(value, type);
  } else if (name.toLowerCase().includes("opacity")) {
    return getOpacity(value);
  } else if (type === "FLOAT") {
    return getDimension(value);
  } else {
    return value;
  }
};

export default formatValue;
