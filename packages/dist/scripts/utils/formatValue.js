import getColor from "./getColor.js";
import getAlpha from "./getAlpha.js";
import getFontFamily from "./getFontFamily.js";
import getFontWeight from "./getFontWeight.js";
import getOpacity from "./getOpacity.js";
import getDimension from "./getDimension.js";
const formatValue = (type, name, value) => {
    if (type === "COLOR") {
        const colorValue = value;
        const { r, g, b, a } = colorValue;
        const result = `rgb(${getColor(r)} ${getColor(g)} ${getColor(b)}${getAlpha(a)})`;
        return result;
    }
    else if (name.toLowerCase().includes("family")) {
        return getFontFamily(value);
    }
    else if (name.toLowerCase().includes("weight")) {
        return getFontWeight(value);
    }
    else if (name.toLowerCase().includes("opacity")) {
        return getOpacity(value);
    }
    else if (type === "FLOAT") {
        return getDimension(value);
    }
    else {
        return value;
    }
};
export default formatValue;
