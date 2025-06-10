const fontWeight = {
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

/**
 * @param {(string|number)} weight
 * @param {string} type
 * @returns {(string|number)}
 */

const getFontWeight = (weight, type) => {
  if (type === "FLOAT") {
    return weight;
  }
  return fontWeight[weight.toLowerCase().replace(/[\/|\s]/g, "")];
};

export default getFontWeight;
