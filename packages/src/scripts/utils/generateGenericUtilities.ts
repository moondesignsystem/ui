const generateGenericUtilities = () =>
  `@utility icon-* {
color: --value(--semantic-icon-*);
}
@utility text-* {
color: --value(--semantic-text-*);
}
@utility bg-* {
background-color: --value(--semantic-background-*);
}
@utility opacity-* {
opacity: --value(--effect-opacity-*);
}`;

export default generateGenericUtilities;
