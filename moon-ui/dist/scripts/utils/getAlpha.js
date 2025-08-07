const getAlpha = (alpha) => alpha === 1 ? "" : ` / ${alpha.toFixed(2) === "0.00" ? 0 : alpha.toFixed(2)}`;
export default getAlpha;
