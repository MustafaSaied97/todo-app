"use strict";(self.webpackChunktodo_app=self.webpackChunktodo_app||[]).push([[788],{6450:(e,t,a)=>{a.r(t),a.d(t,{default:()=>x});var n=a(2791),i=a(1582),o=a(9877),s=a(3356),d=a(2419),c=a(7047),l=a(5243),r=a(2485),m=a(8479),u=a(2426),p=a.n(u);const h=a.p+"static/media/empty-tasks.3562c6733a7e75ad5be9.png";var v=a(184);const f={title:"",description:"",created_at:"",is_archived:!1,archive_at:"",is_checked:!1,finished_at:""};function x(){var e,t,a,u;const[x,g]=(0,n.useState)(!1),[k,y]=(0,n.useState)("add"),[j,w]=(0,n.useState)([]),[_,b]=(0,n.useState)({}),[I,C]=(0,n.useState)({}),[M,Z]=(0,n.useState)(!1),{onOpen:S}=(0,l.o)(),T=e=>{let{modeType:t,taskData:a}=e;t&&Object.keys(a).length&&(b(a),y(t),g(!0))},W=()=>{b(f),g(!1)},A={openAddModal:()=>T({modeType:"add",taskData:f}),openEditModal:e=>{T({modeType:"edit",taskData:e})},openInfoModal:e=>T({modeType:"info",taskData:e}),onAddItem:e=>{const t=[...j],a={...e,id:(0,r.Kr)(),created_at:p()().format("lll")};t.push(a),w(t),W()},onEditItem:e=>{const t=j.map((t=>t.id===e.id?e:t));w(t),W()},onDeleteItem:e=>{const t=j.filter((t=>e.id!==t.id));w(t)},onToggleArchiveItem:e=>{const t=j.map((t=>{if(t.id===e.id){const t=!e.is_archived;return S({type:"success",message:"".concat(e.title," ").concat(t?"archived":"removed from archived")}),{...e,is_archived:t,archive_at:t?p()().format("lll"):""}}return{...t}}));w(t)},onToggleCheckedItem:e=>{const t=j.map((t=>{if(t.id===e.id){const t=!e.is_checked;return{...e,is_checked:t,finished_at:t?p()().format("lll"):""}}return{...t}}));w(t)}};return(0,n.useEffect)((()=>{0!==j.length?(0,r.mM)({type:"set",key:"tasks",value:j}):(0,r.mM)({type:"set",key:"tasks",value:[]})}),[j]),(0,n.useEffect)((()=>{const e=(0,r.mM)({type:"get",key:"tafesks"})||[];w([...e]),(async()=>{let e=await(0,r.vW)();try{Z(!0);let t=await(0,r.t9)({method:r.bV.getCurrentWeather.method,url:"".concat(r.bV.getCurrentWeather.url,"?lat=").concat(null===e||void 0===e?void 0:e.lat,"&lon=").concat(null===e||void 0===e?void 0:e.lon,"&appid=").concat("d34395be56180ced8fb10b6c719e2e0a")});C(t)}catch(t){}finally{Z(!1)}})()}),[]),(0,v.jsxs)("section",{children:[(0,v.jsx)(m.Yr,{open:x,mode:k,handleClose:W,data:_,actions:A}),(0,v.jsx)(i.Z,{sx:{pt:1},spacing:{xs:2,sm:2},direction:"row",useFlexGap:!0,flexWrap:"wrap",justifyContent:"center",alignItems:"center",children:Object.keys(I).length&&!M?(0,v.jsx)(m.xI,{temp:null===I||void 0===I||null===(e=I.main)||void 0===e?void 0:e.temp,main:null===I||void 0===I||null===(t=I.weather[0])||void 0===t?void 0:t.main,location:"".concat(null===I||void 0===I?void 0:I.name,",").concat(null===I||void 0===I||null===(a=I.sys)||void 0===a?void 0:a.country),time:p()().format("lll"),iconId:null===I||void 0===I||null===(u=I.weather[0])||void 0===u?void 0:u.icon}):(0,v.jsx)(c.Z,{animation:"wave",variant:"rectangular",sx:{width:{xs:"80%",sm:"35%"},borderRadius:2},height:150})}),(0,v.jsx)(i.Z,{sx:{mt:4},spacing:{xs:2,sm:2},direction:"row",useFlexGap:!0,flexWrap:"wrap",justifyContent:"flex-end",alignItems:"center",children:(0,v.jsx)(s.Z,{title:"Add task",arrow:!0,children:(0,v.jsx)(o.Z,{color:"primary","aria-label":"add",onClick:A.openAddModal,children:(0,v.jsx)(d.Z,{})})})}),(0,v.jsxs)(i.Z,{spacing:5,sx:{width:"100%",mt:6},justifyContent:"center",children:[j.map(((e,t)=>(0,v.jsx)(m.iQ,{taskItem:e,actions:A},t))),!j.length&&(0,v.jsx)("img",{src:h,style:{marginLeft:"auto",marginRight:"auto",width:"100%",maxWidth:"400px"},alt:""})]})]})}}}]);
//# sourceMappingURL=788.395ef254.chunk.js.map