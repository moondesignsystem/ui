const generateBorderUtilities = () => `@utility border-* {
border-color: --value(--semantic-border- *);
}
@utility border-x-* {
border-inline-color: --value(--semantic-border- *);
}
@utility border-y-* {
border-block-color: --value(--semantic-border- *);
}
@utility border-s-* {
border-inline-start-color: --value(--semantic-border- *);
}
@utility border-e-* {
border-inline-end-color: --value(--semantic-border- *);
}
@utility border-t-* {
border-top-color: --value(--semantic-border- *);
}
@utility border-r-* {
border-right-color: --value(--semantic-border- *);
}
@utility border-b-* {
border-bottom-color: --value(--semantic-border- *);
}
@utility border-l-* {
border-left-color: --value(--semantic-border- *);
}
@utility divide-* {
& > :not(:last-child) {
border-color: --value(--semantic-border- *);
}
}
@utility outline-* {
outline-color: --value(--semantic-border- *);
}
@utility inset-ring-* {
--tw-inset-ring-color: --value(--semantic-border- *);
}
@utility ring-* {
--tw-ring-color: --value(--semantic-border- *);
}`;
export default generateBorderUtilities;
