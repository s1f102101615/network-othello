(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[835],{8691:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/othello/[RoomId]",function(){return a(3702)}])},1292:function(e,t,a){"use strict";a.d(t,{v:function(){return c}});var l=a(5893);let s=e=>(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:e.size,height:e.size,fill:e.fill,children:(0,l.jsx)("path",{d:"M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"})});var o=a(1733),n=a(7251),i=a(2038),r=a.n(i);let c=e=>{let{user:t}=e,a=async()=>{confirm("Logout?")&&await (0,n.k)()};return(0,l.jsx)("div",{className:r().container,children:(0,l.jsxs)("div",{className:r().main,children:[(0,l.jsx)("img",{src:o.D.frourio_svg,height:36,alt:"frourio logo"}),(0,l.jsxs)("div",{className:r().userBtn,onClick:a,children:[t.photoURL?(0,l.jsx)("img",{className:r().userIcon,src:t.photoURL,height:24,alt:t.displayName}):(0,l.jsx)(s,{size:18,fill:"#555"}),(0,l.jsx)("span",{className:r().userName,children:t.displayName})]})]})})}},3702:function(e,t,a){"use strict";a.r(t);var l=a(5893),s=a(7596),o=a.n(s),n=a(24),i=a(1163),r=a(7294),c=a(8239),_=a(1292),d=a(1290),h=a(3377),u=a(5371),m=a(2108),f=a.n(m);let w=()=>{let e=(0,i.useRouter)(),{RoomId:t}=e.query,[a]=(0,n.KO)(u.L),[s,m]=(0,r.useState)(),[w,g]=(0,r.useState)(0),[x,j]=(0,r.useState)(0),[N,v]=(0,r.useState)(1),[p,b]=(0,r.useState)("-"),[k,y]=(0,r.useState)("-"),S=async()=>{let e=await d.x.rooms.$get().catch(h.F);o()(e,"クリック出来てるんだからRoomが無いわけがない");let a=e.find(e=>e.id===t);o()(a,"クリック出来てるんだからIDが合わないわけない"),v(a.turn),m(a.board),b(String(a.black)),y(String(a.white));let l=a.board.flat().filter(e=>1===e).length,s=a.board.flat().filter(e=>2===e).length;g(l),j(s)},B=async(e,a)=>{await d.x.rooms.board.$post({body:{x:e,y:a,RoomId:t}}),await S()};return((0,r.useEffect)(()=>{let e=setInterval(S,500);return()=>clearInterval(e)},[S]),s&&a)?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(_.v,{user:a}),(0,l.jsxs)("div",{className:f().container,children:[(0,l.jsx)("div",{className:f().youColor,children:(0,l.jsxs)("a",{children:["あなた:",String(a.id)===p?"黒":String(a.id)===k?"白":"観戦者"]})}),(0,l.jsxs)("a",{className:f().turn,children:["現在 ",1===N?"黒":"白"," のターン"]}),(0,l.jsx)("div",{className:f().black,children:(0,l.jsxs)("a",{className:f().blackname,children:["黒",w,"個"]})}),(0,l.jsx)("div",{className:f().white,children:(0,l.jsxs)("a",{className:f().whitename,children:["白",x,"個"]})}),(0,l.jsx)("div",{className:f().board,children:s.map((e,t)=>e.map((e,a)=>(0,l.jsx)("div",{className:f().cell,onClick:()=>B(a,t),children:0!==e&&(0,l.jsx)("div",{className:f().stone,style:{background:1===e?"#000":3===e?"#ccff00":"#fff",width:3===e?"20%":"90%",height:3===e?"20%":"90%"}})},"".concat(a,"-").concat(t))))})]})]}):(0,l.jsx)(c.g,{visible:!0})};t.default=w},7251:function(e,t,a){"use strict";a.d(t,{_:function(){return n},k:function(){return i}});var l=a(7908),s=a(328),o=a(3377);let n=async()=>{let e=new l.GH;e.addScope("read:user"),await (0,l.rh)((0,s.l)(),e).catch(o.F)},i=async()=>{await (0,s.l)().signOut()}},2038:function(e){e.exports={container:"BasicHeader_container__5rTZS",main:"BasicHeader_main__yd6De",userBtn:"BasicHeader_userBtn__B7CLf",userIcon:"BasicHeader_userIcon__fjiOn",userName:"BasicHeader_userName__vjAjN"}},2108:function(e){e.exports={container:"othello_container__f2XDH",main:"othello_main__zF5jw",footer:"othello_footer__0WJ2N",title:"othello_title__P_LWE",description:"othello_description__m97ud",code:"othello_code__OTpYz",grid:"othello_grid__8wRBL",card:"othello_card__kS0YF",logo:"othello_logo__KuYnA",board:"othello_board__w_zl9",cell:"othello_cell__IHagl",stone:"othello_stone__Cq1qK",black:"othello_black__I44uy",blackname:"othello_blackname__FSejd",white:"othello_white__U9PC3",whitename:"othello_whitename__JyC8O",pass:"othello_pass__V4pJw",turn:"othello_turn__W_wyi",newgame:"othello_newgame__n6uJn",youColor:"othello_youColor__tZ5Vg"}}},function(e){e.O(0,[596,774,888,179],function(){return e(e.s=8691)}),_N_E=e.O()}]);