(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[835],{8691:function(e,l,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/othello/[RoomId]",function(){return a(3702)}])},1292:function(e,l,a){"use strict";a.d(l,{v:function(){return r}});var t=a(5893);let s=e=>(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:e.size,height:e.size,fill:e.fill,children:(0,t.jsx)("path",{d:"M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"})});var o=a(1733),i=a(7251),n=a(2038),c=a.n(n);let r=e=>{let{user:l}=e,a=async()=>{confirm("Logout?")&&await (0,i.k)()};return(0,t.jsx)("div",{className:c().container,children:(0,t.jsxs)("div",{className:c().main,children:[(0,t.jsx)("img",{src:o.D.frourio_svg,height:36,alt:"frourio logo"}),(0,t.jsxs)("div",{className:c().userBtn,onClick:a,children:[l.photoURL?(0,t.jsx)("img",{className:c().userIcon,src:l.photoURL,height:24,alt:l.displayName}):(0,t.jsx)(s,{size:18,fill:"#555"}),(0,t.jsx)("span",{className:c().userName,children:l.displayName})]})]})})}},3702:function(e,l,a){"use strict";a.r(l);var t=a(5893),s=a(7596),o=a.n(s),i=a(24),n=a(1163),c=a(7294),r=a(8239),_=a(1292),d=a(1290),h=a(3377),u=a(5371),m=a(2108),w=a.n(m);let g=()=>{let e=(0,n.useRouter)(),{RoomId:l}=e.query,[a]=(0,i.KO)(u.L),[s,m]=(0,c.useState)(),[g,y]=(0,c.useState)(0),[x,f]=(0,c.useState)(0),[j,N]=(0,c.useState)(1),[b,p]=(0,c.useState)("-"),[v,k]=(0,c.useState)("-"),[S,T]=(0,c.useState)("-"),[C,B]=(0,c.useState)("-"),[H,I]=(0,c.useState)("waiting"),z=async()=>{let e=await d.x.rooms.$get().catch(h.F);o()(e,"クリック出来てるんだからRoomが無いわけがない");let a=e.find(e=>e.id===l);if(!a){z();return}N(a.turn),m(a.board);let t=a.board.flat().filter(e=>1===e).length,s=a.board.flat().filter(e=>2===e).length;y(t),f(s),p(String(a.black)),k(String(a.white)),T(String(a.blackname)),B(String(a.whitename)),I(a.status),await d.x.rooms.board.$post({body:{x:10,y:10,RoomId:l}})},O=async()=>{await d.x.rooms.board.$post({body:{x:11,y:10,RoomId:l}})},E=async()=>{await d.x.rooms.board.$post({body:{x:12,y:10,RoomId:l}})},F=async(e,t)=>{(null==a?void 0:a.id)&&(b!==(null==a?void 0:a.id)||2!==j)&&(v!==(null==a?void 0:a.id)||1!==j)&&(await d.x.rooms.board.$post({body:{x:e,y:t,RoomId:l}}),z())};return((0,c.useEffect)(()=>{let e=setInterval(z,100);return()=>clearInterval(e)},[z]),s&&a)?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(_.v,{user:a}),(0,t.jsxs)("div",{className:w().playerTag,children:[(0,t.jsxs)("div",{className:w().blackTag,children:[(0,t.jsxs)("a",{className:w().blackplayer,children:[" ",S," "]}),(0,t.jsx)("a",{className:w().blackname,children:g||2})]}),(0,t.jsxs)("div",{className:w().midTag,children:["playing"===H?(0,t.jsxs)("a",{className:w().turn,children:["現在 ",1===j?"黒":"白"," のターン"]}):null,"waiting"===H?(0,t.jsx)("a",{className:w().turn,children:"プレイヤー待機中"}):null,"ended"===H?(0,t.jsx)("a",{className:w().turn,children:"ゲーム終了"}):null]}),(0,t.jsxs)("div",{className:w().whiteTag,children:[(0,t.jsx)("a",{className:w().whitename,children:x||2}),(0,t.jsxs)("a",{className:w().whiteplayer,children:[" ",C," "]})]})]}),(0,t.jsxs)("div",{className:w().you,children:[b===a.id?(0,t.jsx)("div",{className:w().blackyou,children:" you "}):null,v===a.id?(0,t.jsx)("div",{className:w().whiteyou,children:" you "}):null]}),(0,t.jsxs)("div",{className:w().container,children:[(0,t.jsx)("div",{className:w().youColor,children:(0,t.jsxs)("a",{children:["あなた:",String(a.id)===b?"黒":String(a.id)===v?"白":"観戦者"]})}),"waiting"!==H?null:(0,t.jsx)("div",{onClick:O,className:w().customblack,children:"黒に入る"}),"waiting"!==H?null:(0,t.jsx)("div",{onClick:E,className:w().customwhite,children:"白に入る"}),(0,t.jsx)("div",{className:w().board,children:s.map((e,l)=>e.map((e,a)=>(0,t.jsx)("div",{className:w().cell,onClick:()=>F(a,l),children:0!==e&&(0,t.jsx)("div",{className:w().stone,style:{background:1===e?"#000":3===e?"#ccff00":"#fff",width:3===e?"20%":"90%",height:3===e?"20%":"90%"}})},"".concat(a,"-").concat(l))))})]})]}):(0,t.jsx)(r.g,{visible:!0})};l.default=g},7251:function(e,l,a){"use strict";a.d(l,{_:function(){return i},k:function(){return n}});var t=a(7908),s=a(328),o=a(3377);let i=async()=>{let e=new t.GH;e.addScope("read:user"),await (0,t.rh)((0,s.l)(),e).catch(o.F)},n=async()=>{await (0,s.l)().signOut()}},2038:function(e){e.exports={container:"BasicHeader_container__5rTZS",main:"BasicHeader_main__yd6De",userBtn:"BasicHeader_userBtn__B7CLf",userIcon:"BasicHeader_userIcon__fjiOn",userName:"BasicHeader_userName__vjAjN"}},2108:function(e){e.exports={container:"othello_container__f2XDH",main:"othello_main__zF5jw",footer:"othello_footer__0WJ2N",title:"othello_title__P_LWE",description:"othello_description__m97ud",code:"othello_code__OTpYz",grid:"othello_grid__8wRBL",card:"othello_card__kS0YF",logo:"othello_logo__KuYnA",board:"othello_board__w_zl9",cell:"othello_cell__IHagl",stone:"othello_stone__Cq1qK",black:"othello_black__I44uy",blackname:"othello_blackname__FSejd",white:"othello_white__U9PC3",whitename:"othello_whitename__JyC8O",pass:"othello_pass__V4pJw",turn:"othello_turn__W_wyi",newgame:"othello_newgame__n6uJn",youColor:"othello_youColor__tZ5Vg",customblack:"othello_customblack__oe_sI",customwhite:"othello_customwhite__digTU",playerTag:"othello_playerTag__teRvV",blackTag:"othello_blackTag__uH_qB",midTag:"othello_midTag__X3WN8",whiteTag:"othello_whiteTag__Q2yFb",blackplayer:"othello_blackplayer__hCtJO",whiteplayer:"othello_whiteplayer__s2GfW",you:"othello_you__Jn9wT",blackyou:"othello_blackyou__1tQeB",whiteyou:"othello_whiteyou__fCQ5m"}}},function(e){e.O(0,[596,774,888,179],function(){return e(e.s=8691)}),_N_E=e.O()}]);