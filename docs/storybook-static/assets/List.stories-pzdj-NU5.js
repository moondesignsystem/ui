import{j as I}from"./index-DKxaqQgQ.js";import{L}from"./LinksBlock-8AqbDGcr.js";import{g as n}from"./getChildren-Bp76MxS-.js";import{j as g}from"./joinClassnames-CPymqmKP.js";import{s as i}from"./starIcon-Bd4NHJf_.js";import"./iframe-B37x74Pe.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CfOrKyLd.js";import"./index-DrFu-skq.js";import"./preview-CzSQLk2e.js";import"./DocsRenderer-CFRXHY34-CzDC7Aws.js";const u=t=>t==="md"?"":`moon-list-${t}`,E=["sm","md","lg","xl","2xl"],b=t=>{const{items:c,label:m,size:p,hasStartIcon:d,hasEndIcon:h}=t,o=document.createElement("ul");return o.className=g(["moon-list",u(p)]),new Array(c).fill("").forEach((S,f)=>{const s=document.createElement("li");d&&s.appendChild(n({children:i})),s.appendChild(n({children:`${m} ${f+1}`})),h&&s.appendChild(n({children:i})),o.appendChild(s)}),o},M={title:"Content display/List",render:b,argTypes:{items:{description:"Amount of List items",control:{type:"range",min:1,max:7,step:1}},label:{description:"Item lables for List",control:"text"},size:{description:"Size of List",control:"select",options:E},hasStartIcon:{description:"Start icon of List",control:"boolean"},hasEndIcon:{description:"End icon of List",control:"boolean"}},parameters:{docs:{container:({context:t})=>I.jsx(L,{context:t,moon:"content-display/list-zn1TMgX6",github:"_list.scss"})}}},e={args:{size:"md",items:3,hasStartIcon:!1,hasEndIcon:!1,label:"Label"}};var r,a,l;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    size: "md",
    items: 3,
    hasStartIcon: false,
    hasEndIcon: false,
    label: "Label"
  }
}`,...(l=(a=e.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const N=["List"];export{e as List,N as __namedExportsOrder,M as default};
