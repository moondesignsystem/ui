import{j as h}from"./index-DKxaqQgQ.js";import{L as B}from"./LinksBlock-8AqbDGcr.js";import{g as s}from"./getChildren-Bp76MxS-.js";import{j as I}from"./joinClassnames-CPymqmKP.js";import{s as e}from"./starIcon-Bd4NHJf_.js";import"./iframe-B37x74Pe.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CfOrKyLd.js";import"./index-DrFu-skq.js";import"./preview-CzSQLk2e.js";import"./DocsRenderer-CFRXHY34-CzDC7Aws.js";const a=t=>t==="md"||t==="fill"?"":`moon-button-${t}`,g=["xs","sm","md","lg","xl"],E=["fill","tonal","outline","ghost","destructive"],S=t=>{const{label:c,size:d,disabled:m,variant:p,hasStartIcon:u,hasEndIcon:b}=t,o=document.createElement("button"),f=s({children:c});return u&&o.appendChild(s({children:e})),o.appendChild(f),b&&o.appendChild(s({children:e})),o.className=I(["moon-button",a(d),a(p)]),m&&o.setAttribute("disabled","true"),o},R={title:"Actions/Button",render:S,argTypes:{size:{description:"Size of Button",control:"select",options:g},disabled:{description:"Disabled state of Button",control:"boolean"},hasStartIcon:{description:"Start icon of Button",control:"boolean"},hasEndIcon:{description:"End icon of Button",control:"boolean"},variant:{description:"Variant of Button",control:"select",options:E}},parameters:{docs:{container:({context:t})=>h.jsx(B,{context:t,moon:"actions/button-lyMcENoZ",github:"_button.scss"})}}},n={args:{size:"md",variant:"fill",disabled:!1,hasStartIcon:!1,hasEndIcon:!1,label:"Button"}};var r,i,l;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    size: "md",
    variant: "fill",
    disabled: false,
    hasStartIcon: false,
    hasEndIcon: false,
    label: "Button"
  }
}`,...(l=(i=n.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};const T=["Button"];export{n as Button,T as __namedExportsOrder,R as default};
