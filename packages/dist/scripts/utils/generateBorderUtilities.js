const generateBorderUtilities = () => `@utility border-* {
border-color: --value(--color-border- *);
}
@utility border-x-* {
border-inline-color: --value(--color-border- *);
}
@utility border-y-* {
border-block-color: --value(--color-border- *);
}
@utility border-s-* {
border-inline-start-color: --value(--color-border- *);
}
@utility border-e-* {
border-inline-end-color: --value(--color-border- *);
}
@utility border-t-* {
border-top-color: --value(--color-border- *);
}
@utility border-r-* {
border-right-color: --value(--color-border- *);
}
@utility border-b-* {
border-bottom-color: --value(--color-border- *);
}
@utility border-l-* {
border-left-color: --value(--color-border- *);
}
@utility divide-* {
& > :not(:last-child) {
border-color: --value(--color-border- *);
}
}
@utility outline-* {
outline-color: --value(--color-border- *);
}
@utility inset-ring-* {
--tw-inset-ring-color: --value(--color-border- *);
}
@utility ring-* {
--tw-ring-color: --value(--color-border- *);
}`;
export default generateBorderUtilities;
