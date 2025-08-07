import{j as d}from"./index-DKxaqQgQ.js";import{L as h}from"./LinksBlock-8AqbDGcr.js";import{g as C}from"./getChildren-Bp76MxS-.js";import{j as u}from"./joinClassnames-CPymqmKP.js";import"./iframe-B37x74Pe.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CfOrKyLd.js";import"./index-DrFu-skq.js";import"./preview-CzSQLk2e.js";import"./DocsRenderer-CFRXHY34-CzDC7Aws.js";const s=e=>e==="md"||e==="outline"?"":`moon-chip-${e}`,f=["sm","md"],g=["outline","ghost"],b=e=>{const{label:c,size:a,variant:p,selected:l}=e,t=document.createElement("button"),m=C({children:c});return t.appendChild(m),t.className=u(["moon-chip",s(a),s(p),l?"moon-chip-selected":""]),t},L={title:"Forms & selection controls/Chip",render:b,argTypes:{label:{description:"Content of Chip",control:"text"},size:{description:"Size of Chip",control:"select",options:f},selected:{description:"Selected state of Chip",control:"boolean"},variant:{description:"Variant of Chip",control:"select",options:g}},parameters:{docs:{container:({context:e})=>d.jsx(h,{context:e,moon:"forms-and-selection-controls/chip-KxJbxHjO",github:"_chip.scss"})}}},o={args:{size:"md",variant:"outline",selected:!1,label:"Chip"}};var n,i,r;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    size: "md",
    variant: "outline",
    selected: false,
    label: "Chip"
  }
}`,...(r=(i=o.parameters)==null?void 0:i.docs)==null?void 0:r.source}}};const N=["Chip"];export{o as Chip,N as __namedExportsOrder,L as default};
