import{l as b,aK as T,a$ as W}from"./mermaid.core-t4AR573K.js";import{e as x}from"./Editor-qWCnsSMW.js";function E(n){const t=n.replace(/\n{2,}/g,`
`);return W(t)}function w(n){const t=E(n),{children:e}=x(t),o=[[]];let s=0;function i(r,a="normal"){r.type==="text"?r.value.split(`
`).forEach((l,p)=>{p!==0&&(s++,o.push([])),l.split(" ").forEach(f=>{f&&o[s].push({content:f,type:a})})}):(r.type==="strong"||r.type==="emphasis")&&r.children.forEach(c=>{i(c,r.type)})}return e.forEach(r=>{r.type==="paragraph"&&r.children.forEach(a=>{i(a)})}),o}function S(n){const{children:t}=x(n);function e(o){return o.type==="text"?o.value.replace(/\n/g,"<br/>"):o.type==="strong"?`<strong>${o.children.map(e).join("")}</strong>`:o.type==="emphasis"?`<em>${o.children.map(e).join("")}</em>`:o.type==="paragraph"?`<p>${o.children.map(e).join("")}</p>`:`Unsupported markdown: ${o.type}`}return t.map(e).join("")}function j(n){return Intl.Segmenter?[...new Intl.Segmenter().segment(n)].map(t=>t.segment):[...n]}function v(n,t){const e=j(t.content);return g(n,[],e,t.type)}function g(n,t,e,o){if(e.length===0)return[{content:t.join(""),type:o},{content:"",type:o}];const[s,...i]=e,r=[...t,s];return n([{content:r.join(""),type:o}])?g(n,r,i,o):(t.length===0&&s&&(t.push(s),e.shift()),[{content:t.join(""),type:o},{content:e.join(""),type:o}])}function L(n,t){if(n.some(({content:e})=>e.includes(`
`)))throw new Error("splitLineToFitWidth does not support newlines in the line");return h(n,t)}function h(n,t,e=[],o=[]){if(n.length===0)return o.length>0&&e.push(o),e.length>0?e:[];let s="";n[0].content===" "&&(s=" ",n.shift());const i=n.shift()??{content:" ",type:"normal"},r=[...o];if(s!==""&&r.push({content:s,type:"normal"}),r.push(i),t(r))return h(n,t,e,r);if(o.length>0)e.push(o),n.unshift(i);else if(i.content){const[a,c]=v(t,i);e.push([a]),c.content&&n.unshift(c)}return h(n,t,e)}function $(n,t){t&&n.attr("style",t)}function k(n,t,e,o,s=!1){const i=n.append("foreignObject"),r=i.append("xhtml:div"),a=t.label,c=t.isNode?"nodeLabel":"edgeLabel";r.html(`
    <span class="${c} ${o}" `+(t.labelStyle?'style="'+t.labelStyle+'"':"")+">"+a+"</span>"),$(r,t.labelStyle),r.style("display","table-cell"),r.style("white-space","nowrap"),r.style("max-width",e+"px"),r.attr("xmlns","http://www.w3.org/1999/xhtml"),s&&r.attr("class","labelBkg");let l=r.node().getBoundingClientRect();return l.width===e&&(r.style("display","table"),r.style("white-space","break-spaces"),r.style("width",e+"px"),l=r.node().getBoundingClientRect()),i.style("width",l.width),i.style("height",l.height),i.node()}function m(n,t,e){return n.append("tspan").attr("class","text-outer-tspan").attr("x",0).attr("y",t*e-.1+"em").attr("dy",e+"em")}function M(n,t,e){const o=n.append("text"),s=m(o,1,t);d(s,e);const i=s.node().getComputedTextLength();return o.remove(),i}function H(n,t,e){var o;const s=n.append("text"),i=m(s,1,t);d(i,[{content:e,type:"normal"}]);const r=(o=i.node())==null?void 0:o.getBoundingClientRect();return r&&s.remove(),r}function R(n,t,e,o=!1){const i=t.append("g"),r=i.insert("rect").attr("class","background"),a=i.append("text").attr("y","-10.1");let c=0;for(const l of e){const p=u=>M(i,1.1,u)<=n,f=p(l)?[l]:L(l,p);for(const u of f){const y=m(a,c,1.1);d(y,u),c++}}if(o){const l=a.node().getBBox(),p=2;return r.attr("x",-p).attr("y",-p).attr("width",l.width+2*p).attr("height",l.height+2*p),i.node()}else return a.node()}function d(n,t){n.text(""),t.forEach((e,o)=>{const s=n.append("tspan").attr("font-style",e.type==="emphasis"?"italic":"normal").attr("class","text-inner-tspan").attr("font-weight",e.type==="strong"?"bold":"normal");o===0?s.text(e.content):s.text(" "+e.content)})}const I=(n,t="",{style:e="",isTitle:o=!1,classes:s="",useHtmlLabels:i=!0,isNode:r=!0,width:a=200,addSvgBackground:c=!1}={})=>{if(b.info("createText",t,e,o,s,i,r,c),i){const l=S(t),p={isNode:r,label:T(l).replace(/fa[blrs]?:fa-[\w-]+/g,u=>`<i class='${u.replace(":"," ")}'></i>`),labelStyle:e.replace("fill:","color:")};return k(n,p,a,s,c)}else{const l=w(t);return R(a,n,l,c)}};export{I as a,H as c};
