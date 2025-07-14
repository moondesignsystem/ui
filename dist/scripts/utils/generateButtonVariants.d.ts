/**
 * Automatically detects button variants from CSS variables and generates Sass list
 */
declare const generateButtonVariants: () => string[];
/**
 * Generates Sass file with dynamic button variants
 */
declare const generateButtonVariantsSass: () => string[];
export { generateButtonVariants, generateButtonVariantsSass };
export default generateButtonVariants;
