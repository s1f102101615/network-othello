(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{9208:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(9178)}])},1516:function(e,t){"use strict";function n(e,t,n,a){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return n}}),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5569:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return g}});let a=n(4788),s=n(8754),i=n(224),l=s._(n(7294)),r=n(4532),o=n(3353),c=n(1410),u=n(9064),d=n(370),f=n(9955),p=n(4224),h=n(508),_=n(1516),m=n(4266),x=new Set;function b(e,t,n,a,s){if(s||(0,o.isLocalURL)(t)){if(!a.bypassPrefetchedCheck){let s=void 0!==a.locale?a.locale:"locale"in e?e.locale:void 0,i=t+"%"+n+"%"+s;if(x.has(i))return;x.add(i)}Promise.resolve(e.prefetch(t,n,a)).catch(e=>{})}}function v(e){return"string"==typeof e?e:(0,c.formatUrl)(e)}let j=l.default.forwardRef(function(e,t){let n,s;let{href:c,as:x,children:j,prefetch:g,passHref:y,replace:N,shallow:w,scroll:k,locale:C,onClick:M,onMouseEnter:E,onTouchStart:O,legacyBehavior:L=!1}=e,P=i._(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","onTouchStart","legacyBehavior"]);n=j,L&&("string"==typeof n||"number"==typeof n)&&(n=l.default.createElement("a",null,n));let B=!1!==g,T=l.default.useContext(f.RouterContext),S=l.default.useContext(p.AppRouterContext),I=null!=T?T:S,R=!T,{href:A,as:H}=l.default.useMemo(()=>{if(!T){let e=v(c);return{href:e,as:x?v(x):e}}let[e,t]=(0,r.resolveHref)(T,c,!0);return{href:e,as:x?(0,r.resolveHref)(T,x):t||e}},[T,c,x]),U=l.default.useRef(A),D=l.default.useRef(H);L&&(s=l.default.Children.only(n));let z=L?s&&"object"==typeof s&&s.ref:t,[F,K,X]=(0,h.useIntersection)({rootMargin:"200px"}),q=l.default.useCallback(e=>{(D.current!==H||U.current!==A)&&(X(),D.current=H,U.current=A),F(e),z&&("function"==typeof z?z(e):"object"==typeof z&&(z.current=e))},[H,z,A,X,F]);l.default.useEffect(()=>{I&&K&&B&&b(I,A,H,{locale:C},R)},[H,A,K,C,B,null==T?void 0:T.locale,I,R]);let G={ref:q,onClick(e){L||"function"!=typeof M||M(e),L&&s.props&&"function"==typeof s.props.onClick&&s.props.onClick(e),I&&!e.defaultPrevented&&function(e,t,n,a,s,i,r,c,u,d){let{nodeName:f}=e.currentTarget,p="A"===f.toUpperCase();if(p&&(function(e){let t=e.currentTarget,n=t.getAttribute("target");return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!u&&!(0,o.isLocalURL)(n)))return;e.preventDefault();let h=()=>{"beforePopState"in t?t[s?"replace":"push"](n,a,{shallow:i,locale:c,scroll:r}):t[s?"replace":"push"](a||n,{forceOptimisticNavigation:!d})};u?l.default.startTransition(h):h()}(e,I,A,H,N,w,k,C,R,B)},onMouseEnter(e){L||"function"!=typeof E||E(e),L&&s.props&&"function"==typeof s.props.onMouseEnter&&s.props.onMouseEnter(e),I&&(B||!R)&&b(I,A,H,{locale:C,priority:!0,bypassPrefetchedCheck:!0},R)},onTouchStart(e){L||"function"!=typeof O||O(e),L&&s.props&&"function"==typeof s.props.onTouchStart&&s.props.onTouchStart(e),I&&(B||!R)&&b(I,A,H,{locale:C,priority:!0,bypassPrefetchedCheck:!0},R)}};if((0,u.isAbsoluteUrl)(H))G.href=H;else if(!L||y||"a"===s.type&&!("href"in s.props)){let e=void 0!==C?C:null==T?void 0:T.locale,t=(null==T?void 0:T.isLocaleDomain)&&(0,_.getDomainLocale)(H,e,null==T?void 0:T.locales,null==T?void 0:T.domainLocales);G.href=t||(0,m.addBasePath)((0,d.addLocale)(H,e,null==T?void 0:T.defaultLocale))}return L?l.default.cloneElement(s,G):l.default.createElement("a",a._({},P,G),n)}),g=j;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},508:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return o}});let a=n(7294),s=n(29),i="function"==typeof IntersectionObserver,l=new Map,r=[];function o(e){let{rootRef:t,rootMargin:n,disabled:o}=e,c=o||!i,[u,d]=(0,a.useState)(!1),f=(0,a.useRef)(null),p=(0,a.useCallback)(e=>{f.current=e},[]);(0,a.useEffect)(()=>{if(i){if(c||u)return;let e=f.current;if(e&&e.tagName){let a=function(e,t,n){let{id:a,observer:s,elements:i}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},a=r.find(e=>e.root===n.root&&e.margin===n.margin);if(a&&(t=l.get(a)))return t;let s=new Map,i=new IntersectionObserver(e=>{e.forEach(e=>{let t=s.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e);return t={id:n,observer:i,elements:s},r.push(n),l.set(n,t),t}(n);return i.set(e,t),s.observe(e),function(){if(i.delete(e),s.unobserve(e),0===i.size){s.disconnect(),l.delete(a);let e=r.findIndex(e=>e.root===a.root&&e.margin===a.margin);e>-1&&r.splice(e,1)}}}(e,e=>e&&d(e),{root:null==t?void 0:t.current,rootMargin:n});return a}}else if(!u){let e=(0,s.requestIdleCallback)(()=>d(!0));return()=>(0,s.cancelIdleCallback)(e)}},[c,n,t,u,f.current]);let h=(0,a.useCallback)(()=>{d(!1)},[]);return[p,u,h]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1292:function(e,t,n){"use strict";n.d(t,{v:function(){return c}});var a=n(5893);let s=e=>(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:e.size,height:e.size,fill:e.fill,children:(0,a.jsx)("path",{d:"M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"})});var i=n(1733),l=n(7251),r=n(2038),o=n.n(r);let c=e=>{let{user:t}=e,n=async()=>{confirm("Logout?")&&await (0,l.k)()};return(0,a.jsx)("div",{className:o().container,children:(0,a.jsxs)("div",{className:o().main,children:[(0,a.jsx)("img",{src:i.D.frourio_svg,height:36,alt:"frourio logo"}),(0,a.jsxs)("div",{className:o().userBtn,onClick:n,children:[t.photoURL?(0,a.jsx)("img",{className:o().userIcon,src:t.photoURL,height:24,alt:t.displayName}):(0,a.jsx)(s,{size:18,fill:"#555"}),(0,a.jsx)("span",{className:o().userName,children:t.displayName})]})]})})}},9178:function(e,t,n){"use strict";n.r(t);var a=n(5893),s=n(7596),i=n.n(s),l=n(24),r=n(1664),o=n.n(r),c=n(7294),u=n(8239),d=n(1292),f=n(1290),p=n(3377),h=n(5371),_=n(2729),m=n.n(_);let x=()=>{let[e]=(0,l.KO)(h.L),[t,n]=(0,c.useState)(""),[s,r]=(0,c.useState)(void 0),[_,x]=(0,c.useState)(1),b=()=>{x(0)},v=()=>{x(1)},j=async()=>{let e=await f.x.rooms.$get().catch(p.F);i()(e,"クリック出来てるんだからRoomが無いわけがない"),e.reverse();let t=e.find(e=>"undefined"===e.black&&"undefined"!==e.white||"undefined"!==e.black&&"undefined"===e.white);void 0===t&&(t=e.find(e=>"undefined"===e.black&&"undefined"===e.white)),void 0===t&&(await f.x.rooms.post({body:{name:"クイック部屋"}}),j());let n=null==t?void 0:t.id;window.location.href="/othello/".concat(n)},g=e=>{n(e.target.value)},y=async()=>{let e=await f.x.rooms.$get().catch(p.F);null!==e&&r(e)},N=async e=>{e.preventDefault(),t&&(await f.x.rooms.post({body:{name:t}}),n(""),await y())};(0,c.useEffect)(()=>{let e=setInterval(y,50);return()=>clearInterval(e)},[]);let w=[],k=[],C=[];return(null==s||s.forEach(e=>{"waiting"===e.status?w.push(e):"playing"===e.status?k.push(e):C.push(e)}),e)?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(d.v,{user:e}),(0,a.jsx)("div",{className:m().title,children:"FrouriOthello"}),(0,a.jsxs)("div",{className:m().btncontainer,children:[(0,a.jsx)("a",{className:"".concat(m().btnflat," ").concat(m().btn),onClick:j,style:{paddingLeft:"35.8435px",paddingRight:"35.8435px"},children:(0,a.jsx)("span",{children:"クイックマッチ"})}),(0,a.jsx)("a",{className:"".concat(m().btnflat," ").concat(m().btn),onClick:b,children:(0,a.jsx)("span",{children:"ルーム作成"})})]}),(0,a.jsx)("div",{id:"mask",className:m().mask,style:{display:1===_?"none":"block"}}),(0,a.jsxs)("section",{className:m().modal,style:{display:1===_?"none":"block"},children:[(0,a.jsx)("span",{className:m().square_btn,onClick:v}),(0,a.jsx)("h1",{style:{textAlign:"center",marginTop:"10px"},children:"ルーム作成"}),(0,a.jsxs)("form",{style:{textAlign:"center",marginTop:"20px"},onSubmit:N,children:[(0,a.jsx)("input",{className:m().inpute,value:t,type:"text",onChange:g,placeholder:"部屋の名前",autoFocus:!0}),(0,a.jsx)("br",{}),(0,a.jsx)("input",{type:"submit",style:{textAlign:"center",marginTop:"5px"},onClick:v,className:m().submit})]})]}),(0,a.jsx)("div",{className:m().state,children:"参加待ち"}),(0,a.jsx)("div",{className:m().rooms,children:(null==w?void 0:w.length)?[...w].reverse().map(e=>(0,a.jsx)(o(),{href:"/othello/".concat(e.id),className:m().box,children:(0,a.jsxs)("div",{className:m().radiusLine,children:[(0,a.jsx)("span",{className:m().spans,children:e.name}),(0,a.jsx)("br",{}),"参加人数"," ","undefined"!==e.black&&"undefined"!==e.white?2:"undefined"!==e.black||"undefined"!==e.white?1:0,"人 観戦者数",e.watcher.length-1,"人"]},e.id)},e.id)):(0,a.jsx)("li",{children:"ルームが存在しません"})}),(0,a.jsx)("div",{className:m().state,children:"対戦中"}),(0,a.jsx)("div",{className:m().rooms,children:(null==k?void 0:k.length)?[...k].reverse().map(e=>(0,a.jsx)(o(),{href:"/othello/".concat(e.id),className:m().box,children:(0,a.jsxs)("div",{className:m().radiusLine,children:[(0,a.jsx)("span",{className:m().spans,children:e.name}),(0,a.jsx)("br",{}),"参加人数"," ","undefined"!==e.black&&"undefined"!==e.white?2:"undefined"!==e.black||"undefined"!==e.white?1:0,"人 観戦者数",e.watcher.length-1,"人"]},e.id)},e.id)):(0,a.jsx)("li",{children:"ルームが存在しません"})}),(0,a.jsx)("div",{className:m().state,children:"ゲーム終了"}),(0,a.jsx)("div",{className:m().rooms,children:(null==C?void 0:C.length)?[...C].reverse().map(e=>(0,a.jsx)(o(),{href:"/othello/".concat(e.id),className:m().box,children:(0,a.jsxs)("div",{className:m().radiusLine,children:[(0,a.jsx)("span",{className:m().spans,children:e.name}),(0,a.jsx)("br",{}),"参加人数"," ","undefined"!==e.black&&"undefined"!==e.white?2:"undefined"!==e.black||"undefined"!==e.white?1:0,"人 観戦者数",e.watcher.length-1,"人"]},e.id)},e.id)):(0,a.jsx)("li",{children:"ルームが存在しません"})})]}):(0,a.jsx)(u.g,{visible:!0})};t.default=x},7251:function(e,t,n){"use strict";n.d(t,{_:function(){return l},k:function(){return r}});var a=n(7908),s=n(328),i=n(3377);let l=async()=>{let e=new a.GH;e.addScope("read:user"),await (0,a.rh)((0,s.l)(),e).catch(i.F)},r=async()=>{await (0,s.l)().signOut()}},2038:function(e){e.exports={container:"BasicHeader_container__5rTZS",main:"BasicHeader_main__yd6De",userBtn:"BasicHeader_userBtn__B7CLf",userIcon:"BasicHeader_userIcon__fjiOn",userName:"BasicHeader_userName__vjAjN"}},2729:function(e){e.exports={title:"index_title__gEapU",tasks:"index_tasks__T3_J7",deleteBtn:"index_deleteBtn__DU3nM",radiusLine:"index_radiusLine__dN1di",spans:"index_spans__SMGXe",btncontainer:"index_btncontainer__NsARn",button:"index_button__6kyPH",hidden:"index_hidden__JaQ_h",mask:"index_mask__MNBVQ",modal:"index_modal__csgmw",submit:"index_submit__CMX4m",inpute:"index_inpute__oB6_9",square_btn:"index_square_btn__XEit5",btnflat:"index_btnflat__zVtHO",btn:"index_btn__mP8IA",rooms:"index_rooms__6smiT",box:"index_box__2NaWK",state:"index_state__9ZsAp"}},1664:function(e,t,n){e.exports=n(5569)}},function(e){e.O(0,[596,774,888,179],function(){return e(e.s=9208)}),_N_E=e.O()}]);