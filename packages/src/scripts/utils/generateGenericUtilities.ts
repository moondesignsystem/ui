const generateGenericUtilities = () =>
  `@utility icon-* {
color: --value(--color-icon-*);
}
@utility text-* {
color: --value(--color-text-*);
}
@utility bg-* {
background-color: --value(--color-background-*);
}
@utility opacity-* {
opacity: --value(--style-opacity-*);
}`;

export default generateGenericUtilities;
