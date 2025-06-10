/**
 * @param {number} dimension
 * @returns {string|number}
 */

const getDimension = (dimension) =>
  dimension === 0 ? dimension : `${dimension}px`;

export default getDimension;
