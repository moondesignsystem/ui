/**
 * @param {string} name
 * @returns {string}
 */

const formatName = (name) => name.toLowerCase().replace(/[/\s]/g, "-");

export default formatName;
