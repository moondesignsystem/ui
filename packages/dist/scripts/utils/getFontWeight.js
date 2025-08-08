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
const getFontWeight = (weight) => {
    if (typeof weight === "number") {
        return weight;
    }
    return fontWeight[weight.toLowerCase().replace(/[\/|\s]/g, "")];
};
export default getFontWeight;
