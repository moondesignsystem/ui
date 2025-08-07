import{j as I}from"./index-DKxaqQgQ.js";import{L as f}from"./LinksBlock-8AqbDGcr.js";import{g as s}from"./getChildren-Bp76MxS-.js";import{j as g}from"./joinClassnames-CPymqmKP.js";import{s as a}from"./starIcon-Bd4NHJf_.js";import"./iframe-B37x74Pe.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CfOrKyLd.js";import"./index-DrFu-skq.js";import"./preview-CzSQLk2e.js";import"./DocsRenderer-CFRXHY34-CzDC7Aws.js";const E=e=>e==="md"?"":`moon-menu-${e}`,b=["sm","md","lg","xl","2xl"],x=e=>{const{items:c,label:l,size:p,hasStartIcon:d,hasEndIcon:u}=e,t=document.createElement("ul");return t.className=g(["moon-menu",E(p)]),new Array(c).fill("").forEach((S,h)=>{const n=document.createElement("li");d&&n.appendChild(s({children:a})),n.appendChild(s({children:`${l} ${h+1}`})),u&&n.appendChild(s({children:a})),t.appendChild(n)}),t},W={title:"Navigation/Menu",render:x,argTypes:{items:{description:"Amount of Menu items",control:{type:"range",min:1,max:7,step:1}},label:{description:"Item lables for Menu",control:"text"},size:{description:"Size of Menu",control:"select",options:b},hasStartIcon:{description:"Start icon of Menu",control:"boolean"},hasEndIcon:{description:"End icon of Menu",control:"boolean"}},parameters:{docs:{container:({context:e})=>I.jsx(f,{context:e,moon:"navigation/menu-eeIWIkLY-eeIWIkLY",github:"_menu.scss"})}}},o={args:{size:"md",items:3,hasStartIcon:!1,hasEndIcon:!1,label:"Label"}};var r,m,i;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    size: "md",
    items: 3,
    hasStartIcon: false,
    hasEndIcon: false,
    label: "Label"
  }
}`,...(i=(m=o.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};const Y=["Menu"];export{o as Menu,Y as __namedExportsOrder,W as default};
