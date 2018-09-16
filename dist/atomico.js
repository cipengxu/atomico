"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var ELEMENT="Atomico",MOUNT="elementMount",UNMOUNT="elementUnmount",RECEIVE_PROPS="elementReceiveProps";function getProps(t,e,n){void 0===n&&(n={});for(var r=e instanceof HTMLElement,i=0;i<t.length;i++){var s=t[i],o=r?e.getAttribute(s):e[s];n[s.replace(/-+([\w])/g,function(t,e){return e.toUpperCase()})]=null===o?void 0:o}return n}function root(t){return t.shadowRoot||t}function remove(t,e){root(t).removeChild(e)}function append(t,e){root(t).appendChild(e)}function replace(t,e,n){root(t).replaceChild(e,n)}function h(t,e){for(var n=[],r=arguments.length-2;r-- >0;)n[r]=arguments[r+2];return new VDom(t,e,concat(n))}function VDom(t,e,n){this.tag=t,this.props=e||{},this.children=n||[]}function isDom(t){return null!==t&&"object"==typeof t&&11!==t.nodeType}function isVDom(t){return"object"==typeof t&&t instanceof VDom}function concat(t,e){void 0===e&&(e=[]);for(var n=0;n<t.length;n++){var r=t[n];Array.isArray(r)?concat(r,e):e.push(isVDom(r)?r:isDom(r)?new VDom(r,{},""):new VDom("",{},r||""))}return e}function diffProps(t,e,n,r,i){for(var s=Object.keys(e).concat(Object.keys(n)),o=0;o<s.length;o++){var a=s[o];if(e[a]!==n[a]){if(i&&t._props.indexOf(a)>-1){i[a]=n[a];continue}if("function"==typeof n[a]||"function"==typeof e[a])e[a]&&t.removeEventListener(a,e[a]),t.addEventListener(a,n[a]);else if(a in n)if(a in t&&!r||r&&"style"===a)if("style"===a)if("object"==typeof n[a])for(var c in n[a])t.style[c]=n[a][c];else t.style.cssText=n[a];else t[a]=n[a];else{if(r&&"xmlns"===a)continue;r?t.setAttributeNS(null,a,n[a]):t.setAttribute(a,n[a])}else t.removeAttribute(a)}}i&&t.dispatch(RECEIVE_PROPS,i)}function slot(t,e){return"slot"===t.tag&&(t.tag=e.slots[t.props.name]||""),t}function diff(t,e,n,r,i){void 0===r&&(r=t);for(var s=t.childNodes||[],o=Math.max(e.length,n.length),a=0;a<o;a++){var c=e[a]||new VDom,l=n[a],p=s[a];if(l){l=slot(l,r),c=slot(c,r);var h=p,d=isDom(l.tag);if(i=i||"svg"===l.tag,c.tag!==l.tag)if(d)h=l.tag,p?replace(t,h,p):append(t,h);else if(l.tag)if(h=i?document.createElementNS("http://www.w3.org/2000/svg",l.tag):document.createElement(l.tag),p){if(replace(t,h,p),!h[ELEMENT])for(;p.firstChild;)append(h,p.firstChild)}else append(t,h);else h=document.createTextNode(""),c.tag?replace(t,h,p):append(t,h);d||"#text"!==h.nodeName?(diffProps(h,c.props,l.props,i,h[ELEMENT]&&{children:l.children.map(function(t){return t.tag?t:t.children})}),d||!h||h[ELEMENT]||diff(h,c.children,l.children,r,i)):c.children!==l.children&&(h.textContent=l.children)}else p&&remove(t,p)}}class element extends HTMLElement{constructor(){for(super(),this[ELEMENT]=!0,this.state={},this.slots={},this._props=this.constructor.props||[],this._render=[],this.props=getProps(this._props,this),this.props.children=[],this.fragment=document.createDocumentFragment();this.firstChild;){var t=this.firstChild,e=t.getAttribute&&t.getAttribute("slot");e&&(this.slots[e]=t),append(this.fragment,t),this.props.children.push(t)}this.livecycle()}static get observedAttributes(){return this.props||[]}livecycle(){var t=this,e=!0;this.listeners=[MOUNT,UNMOUNT,RECEIVE_PROPS].map(function(n){var r=function(r){r.type===n&&(n===MOUNT&&(e=!1),e||(t[n]&&t[n](r),r.defaultPrevented||(n===RECEIVE_PROPS&&(t.props=getProps(Object.keys(r.detail),r.detail,Object.assign({},t.props))),t.setState({}))))};return t.addEventListener(n,r),function(){return t.removeEventListener(n,r)}})}setAttribute(t,e){this._props.indexOf(t)>-1?this.attributeChangedCallback(t,this.props[t],e):super.setAttribute(t,e)}connectedCallback(){this.dispatch(MOUNT)}disconnectedCallback(){this.dispatch(UNMOUNT),this.listeners.forEach(function(t){return t()})}attributeChangedCallback(t,e,n){var r;e!==n&&this.dispatch(RECEIVE_PROPS,getProps([t],((r={})[t]=n,r)))}dispatch(t,e){this.dispatchEvent(new CustomEvent(t,{cancelable:!0,detail:e}))}setState(t){if(t){this.state=Object.assign({},this.state,t);var e=concat([this.render()]);diff(root(this),this._render,e),this._render=e}}render(){}}exports.h=h,exports.Element=element;
//# sourceMappingURL=atomico.js.map
