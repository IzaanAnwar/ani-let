import{getOwner as Z,runWithOwner as ee,createMemo as R,createContext as D,useContext as q,createSignal as O,createRenderEffect as te,untrack as _,on as ne,startTransition as re,resetErrorBoundaries as k,createComponent as se}from"solid-js";import{isServer as W,getRequestEvent as z}from"solid-js/web";function oe(){let e=new Set;function t(r){return e.add(r),()=>e.delete(r)}let n=!1;function s(r,o){if(n)return!(n=!1);const c={to:r,options:o,defaultPrevented:!1,preventDefault:()=>c.defaultPrevented=!0};for(const i of e)i.listener({...c,from:i.location,retry:l=>{l&&(n=!0),i.navigate(r,o)}});return!c.defaultPrevented}return{subscribe:t,confirm:s}}const ae=/^(?:[a-z0-9]+:)?\/\//i,ce=/^\/+|(\/)\/+$/g;function A(e,t=!1){const n=e.replace(ce,"$1");return n?t||/^[?#]/.test(n)?n:"/"+n:""}function B(e,t,n){if(ae.test(t))return;const s=A(e),r=n&&A(n);let o="";return!r||t.startsWith("/")?o=s:r.toLowerCase().indexOf(s.toLowerCase())!==0?o=s+r:o=r,(o||"/")+A(t,!o)}function ie(e,t){if(e==null)throw new Error(t);return e}function ue(e,t){return A(e).replace(/\/*(\*.*)?$/g,"")+A(t)}function K(e){const t={};return e.searchParams.forEach((n,s)=>{t[s]=n}),t}function le(e,t,n){const[s,r]=e.split("/*",2),o=s.split("/").filter(Boolean),c=o.length;return i=>{const l=i.split("/").filter(Boolean),u=l.length-c;if(u<0||u>0&&r===void 0&&!t)return null;const p={path:c?"":"/",params:{}},d=h=>n===void 0?void 0:n[h];for(let h=0;h<c;h++){const m=o[h],w=l[h],P=m[0]===":",E=P?m.slice(1):m;if(P&&F(w,d(E)))p.params[E]=w;else if(P||!F(w,m))return null;p.path+=`/${w}`}if(r){const h=u?l.slice(-u).join("/"):"";if(F(h,d(r)))p.params[r]=h;else return null}return p}}function F(e,t){const n=s=>s.localeCompare(e,void 0,{sensitivity:"base"})===0;return t===void 0?!0:typeof t=="string"?n(t):typeof t=="function"?t(e):Array.isArray(t)?t.some(n):t instanceof RegExp?t.test(e):!1}function fe(e){const[t,n]=e.pattern.split("/*",2),s=t.split("/").filter(Boolean);return s.reduce((r,o)=>r+(o.startsWith(":")?2:3),s.length-(n===void 0?0:1))}function he(e){const t=new Map,n=Z();return new Proxy({},{get(s,r){return t.has(r)||ee(n,()=>t.set(r,R(()=>e()[r]))),t.get(r)()},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}},ownKeys(){return Reflect.ownKeys(e())}})}function U(e){let t=/(\/?\:[^\/]+)\?/.exec(e);if(!t)return[e];let n=e.slice(0,t.index),s=e.slice(t.index+t[0].length);const r=[n,n+=t[1]];for(;t=/^(\/\:[^\/]+)\?/.exec(s);)r.push(n+=t[1]),s=s.slice(t[0].length);return U(s).reduce((o,c)=>[...o,...r.map(i=>i+c)],[])}const pe=100,de=D(),H=D(),M=()=>ie(q(de),"Make sure your app is wrapped in a <Router />"),me=()=>q(H)||M().base,xe=e=>{const t=me();return R(()=>t.resolvePath(e()))},Ee=e=>{const t=M();return R(()=>{const n=e();return n!==void 0?t.renderPath(n):n})},Se=()=>M().navigatorFactory(),Ae=()=>M().location;function ge(e,t=""){const{component:n,load:s,children:r,metadata:o}=e,c=!r||Array.isArray(r)&&!r.length,i={key:e,component:n,load:s,metadata:o};return N(e.path).reduce((l,u)=>{for(const p of U(u)){const d=ue(t,p),h=c?d:d.split("/*",1)[0];l.push({...i,originalPath:p,pattern:h,matcher:le(h,!c,e.matchFilters)})}return l},[])}function ve(e,t=0){return{routes:e,score:fe(e[e.length-1])*1e4-t,matcher(n){const s=[];for(let r=e.length-1;r>=0;r--){const o=e[r],c=o.matcher(n);if(!c)return null;s.unshift({...c,route:o})}return s}}}function N(e){return Array.isArray(e)?e:[e]}function ye(e,t="",n=[],s=[]){const r=N(e);for(let o=0,c=r.length;o<c;o++){const i=r[o];if(i&&typeof i=="object"){i.hasOwnProperty("path")||(i.path="");const l=ge(i,t);for(const u of l){n.push(u);const p=Array.isArray(i.children)&&i.children.length===0;if(i.children&&!p)ye(i.children,u.pattern,n,s);else{const d=ve([...n],s.length);s.push(d)}n.pop()}}}return n.length?s:s.sort((o,c)=>c.score-o.score)}function Re(e,t){for(let n=0,s=e.length;n<s;n++){const r=e[n].matcher(t);if(r)return r}return[]}function we(e,t){const n=new URL("http://sar"),s=R(l=>{const u=e();try{return new URL(u,n)}catch{return console.error(`Invalid path ${u}`),l}},n,{equals:(l,u)=>l.href===u.href}),r=R(()=>s().pathname),o=R(()=>s().search,!0),c=R(()=>s().hash),i=()=>"";return{get pathname(){return r()},get search(){return o()},get hash(){return c()},get state(){return t()},get key(){return i()},query:he(ne(o,()=>K(s())))}}let y;function Ce(e,t,n={}){const{signal:[s,r],utils:o={}}=e,c=o.parsePath||(a=>a),i=o.renderPath||(a=>a),l=o.beforeLeave||oe(),u=B("",n.base||"");if(u===void 0)throw new Error(`${u} is not a valid base path`);u&&!s().value&&r({value:u,replace:!0,scroll:!1});const[p,d]=O(!1),h=async a=>{d(!0);try{await re(a)}finally{d(!1)}},[m,w]=O(s().value),[P,E]=O(s().state),X=we(m,P),S=[],$=O(W?Y():[]),I={pattern:u,params:{},path:()=>u,outlet:()=>null,resolvePath(a){return B(u,a)}};return te(()=>{const{value:a,state:f}=s();_(()=>{a!==m()&&h(()=>{y="native",w(a),E(f),k(),$[1]([])}).then(()=>{y=void 0})})}),{base:I,location:X,isRouting:p,renderPath:i,parsePath:c,navigatorFactory:J,beforeLeave:l,preloadRoute:V,submissions:$};function G(a,f,g){_(()=>{if(typeof f=="number"){f&&(o.go?l.confirm(f,g)&&o.go(f):console.warn("Router integration does not support relative routing"));return}const{replace:C,resolve:j,scroll:v,state:x}={replace:!1,resolve:!0,scroll:!0,...g},b=j?a.resolvePath(f):B("",f);if(b===void 0)throw new Error(`Path '${f}' is not a routable path`);if(S.length>=pe)throw new Error("Too many redirects");const T=m();if(b!==T||x!==P()){if(W){const L=z();L&&(L.response=new Response(null,{status:302,headers:{Location:b}})),r({value:b,replace:C,scroll:v,state:x})}else if(l.confirm(b,g)){const L=S.push({value:T,replace:C,scroll:v,state:P()});h(()=>{y="navigate",w(b),E(x),k(),$[1]([])}).then(()=>{S.length===L&&(y=void 0,Q({value:b,state:x}))})}}})}function J(a){return a=a||q(H)||I,(f,g)=>G(a,f,g)}function Q(a){const f=S[0];f&&((a.value!==f.value||a.state!==f.state)&&r({...a,replace:f.replace,scroll:f.scroll}),S.length=0)}function V(a,f){const g=Re(t(),a.pathname),C=y;y="preload";for(let j in g){const{route:v,params:x}=g[j];v.component&&v.component.preload&&v.component.preload(),f&&v.load&&v.load({params:x,location:{pathname:a.pathname,search:a.search,hash:a.hash,query:K(a),state:null,key:""},intent:"preload"})}y=C}function Y(){const a=z();return a&&a.initialSubmission?[a.initialSubmission]:[]}}function Le(e,t,n,s,r){const{base:o,location:c}=e,{pattern:i,component:l,load:u}=s().route,p=R(()=>s().path);l&&l.preload&&l.preload();const d=u?u({params:r,location:c,intent:y||"initial"}):void 0;return{parent:t,pattern:i,path:p,params:r,outlet:()=>l?se(l,{params:r,location:c,data:d,get children(){return n()}}):n(),resolvePath(m){return B(o.path(),m,p())}}}export{de as R,Ce as a,he as b,ye as c,Le as d,H as e,Se as f,Re as g,xe as h,Ee as i,A as n,Ae as u};
