import{j as e,M as r}from"./index-DKxaqQgQ.js";import{useMDXComponents as i}from"./index-BvtBMtTD.js";import"./iframe-B37x74Pe.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CfOrKyLd.js";import"./index-DrFu-skq.js";function l(n){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Getting started"}),`
`,e.jsxs("div",{class:"sb-unstyled flex flex-col sm:flex-row gap-space-12 mb-space-40",children:[e.jsxs("a",{href:"https://beta.moon.io/",target:"_blank",class:"overflow-hidden flex items-center border border-primary rounded-4 h-space-48",children:[e.jsx("div",{class:"flex items-center justify-center h-full aspect-square bg-tertiary",children:e.jsx("img",{src:"/logo.png",alt:"Website",class:"w-space-40"})}),e.jsxs("div",{class:"flex flex-col px-space-8",children:[e.jsx("span",{class:"text-body-300 font-medium",children:"Moon Design System"}),e.jsx("span",{class:"text-body-200 text-secondary",children:"Website"})]})]}),e.jsxs("a",{href:"https://www.npmjs.com/package/@heathmont/moon-css",target:"_blank",class:"overflow-hidden flex items-center border border-primary rounded-4 h-space-48",children:[e.jsx("div",{class:"flex items-center justify-center h-full aspect-square bg-tertiary",children:e.jsx("img",{src:"/npm.png",alt:"NPM",class:"w-space-40"})}),e.jsxs("div",{class:"flex flex-col px-space-8",children:[e.jsx("span",{class:"text-body-300 font-medium",children:"View package"}),e.jsx("span",{class:"text-body-200 text-secondary",children:"NPM"})]})]}),e.jsxs("a",{href:"https://github.com/coingaming/moon-css",target:"_blank",class:"overflow-hidden flex items-center border border-primary rounded-4 h-space-48",children:[e.jsx("div",{class:"flex items-center justify-center h-full aspect-square bg-tertiary",children:e.jsx("img",{src:"/github.png",alt:"GitHub",class:"w-space-40"})}),e.jsxs("div",{class:"flex flex-col px-space-8",children:[e.jsx("span",{class:"text-body-300 font-medium",children:"View repository"}),e.jsx("span",{class:"text-body-200 text-secondary",children:"GitHub"})]})]})]}),`
`,e.jsx(s.h1,{id:"moon-ui",children:"Moon UI"}),`
`,e.jsx(s.p,{children:"A library for generating primitive, semantic, component variables and component classes."}),`
`,e.jsx(s.h2,{id:"features",children:"Features"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Generates CSS variables from Figma design tokens"}),`
`,e.jsx(s.li,{children:"Optionally configures a Tailwind v3 preset"}),`
`,e.jsx(s.li,{children:"Optionally generates pre-built component classes"}),`
`]}),`
`,e.jsx(s.h3,{id:"installation",children:"Installation"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:["Get required and optional variables:",`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Personal Access Token (",e.jsx(s.code,{children:"FIGMA_TOKEN"}),")"]}),`
`,e.jsxs(s.li,{children:["Base variables Figma file ID (",e.jsx(s.code,{children:"FIGMA_FILE"}),")"]}),`
`,e.jsxs(s.li,{children:["Component variables Figma file ID (",e.jsx(s.code,{children:"FIGMA_COMPONENTS_FILE"}),"). OPTIONAL"]}),`
`,e.jsxs(s.li,{children:["Installation directory for the Moon CSS script (",e.jsx(s.code,{children:"MOON_OUTPUT_DIR"}),"). OPTIONAL"]}),`
`]}),`
`]}),`
`,e.jsxs(s.li,{children:["Create a ",e.jsx(s.code,{children:".env"})," file with your variables:"]}),`
`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-shell",children:`FIGMA_TOKEN=figd_personal-access-token
FIGMA_FILE=your-brand:BZiHkvF7pXFHrFH8P0cG2T
FIGMA_COMPONENTS_FILE=your-brand:S3q1SkVngbwHuwpxHKCsgtJj
MOON_OUTPUT_DIR=assets
`})}),`
`,e.jsx(s.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(s.p,{children:"Basic installation:"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-shell",children:`npx @heathmont/moon-css
`})}),`
`,e.jsxs(s.p,{children:["This generates ",e.jsx(s.code,{children:"css/your-brand-base.css"})," with all CSS variables."]}),`
`,e.jsx(s.h3,{id:"optional-features",children:"Optional Features"}),`
`,e.jsx(s.p,{children:"Generate Tailwind preset:"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-shell",children:`npx @heathmont/moon-css --with-preset
`})}),`
`,e.jsxs(s.p,{children:["This adds ",e.jsx(s.code,{children:"js/your-brand-base-preset.js"})," for Tailwind utility classes."]}),`
`,e.jsx(s.p,{children:"Include pre-built components:"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-shell",children:`npx @heathmont/moon-css --with-preset --with-components
`})}),`
`,e.jsxs(s.p,{children:["This also generates ",e.jsx(s.code,{children:"js/moon-components.js"})," with ready-to-use component classes."]}),`
`,e.jsx(s.h2,{id:"output-files",children:"Output Files"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"css/your-brand-base.css"})," - CSS variables"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"js/your-brand-base-preset.js"})," - Tailwind preset configuration (optional)"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"js/moon-components.js"})," - Pre-built component classes (optional)"]}),`
`]})]})}function x(n={}){const{wrapper:s}={...i(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(l,{...n})}):l(n)}export{x as default};
