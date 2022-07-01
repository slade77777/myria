(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6975],{28397:function(e,t,r){"use strict";var s=r(95235),a=r(20406),n=r(28526),i=r.n(n),c=r(73336),o=r(87751),l=r(2784),d=r(19207),m=r(32788),u=r(63955),x=r(30621),p=r(24511),h=r(50043),g=r(32558),f=r(52322);function j(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,s)}return r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?j(Object(r),!0).forEach((function(t){(0,s.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var v=p.Ry({name:p.Z_().trim().required(o.ag._("Name is required!")),fromEmail:p.Z_().email(o.ag._("Invalid email!")).required(o.ag._("Email is required!")),subject:p.Z_().trim().required(o.ag._("Subject is required!")),message:p.Z_().trim().required(o.ag._("Message is required!"))}).required();t.Z=function(){var e,t,r,s,n=(0,l.useState)(""),p=n[0],j=n[1],y=(0,l.useState)(!1),N=y[0],w=y[1],O=(0,u.cI)({resolver:(0,x.X)(v)}),_=O.register,Z=O.handleSubmit,P=O.reset,k=O.formState,E=k.errors,C=k.isSubmitting,S=function(){var e=(0,a.Z)(i().mark((function e(t){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,j(""),w(!1),e.next=5,h.ge.post("/contact-us",t).then((function(){return w(!0)})).catch((function(e){j(e.message),w(!1)}));case 5:P(),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),j(null===e.t0||void 0===e.t0?void 0:e.t0.message),w(!1);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}();return(0,f.jsxs)("div",{className:"w-full rounded-[20px] bg-[url('/images/get-in-touch/panel_op.png')] bg-cover bg-center p-[32px] md:py-[64px] md:px-[100px] lg:px-[216px]",children:[(0,f.jsx)("h2",{className:"heading-sm text-center md:heading-md",children:"Get in touch"}),(0,f.jsxs)("form",{onSubmit:Z(S),noValidate:!0,children:[(0,f.jsxs)("div",{className:"mt-[48px] grid gap-[32px] gap-x-[28px] md:grid-cols-2",children:[(0,f.jsx)(d.Z,b(b({placeholder:o.ag._("Name")},_("name")),{},{error:!!E.name,errorText:null===(e=E.name)||void 0===e?void 0:e.message})),(0,f.jsx)(d.Z,b(b({placeholder:o.ag._("Email"),type:"email"},_("fromEmail")),{},{error:!!E.fromEmail,errorText:null===(t=E.fromEmail)||void 0===t?void 0:t.message})),(0,f.jsx)(d.Z,b(b({placeholder:o.ag._("Subject"),containerClassName:"md:col-span-2"},_("subject")),{},{error:!!E.subject,errorText:null===(r=E.subject)||void 0===r?void 0:r.message})),(0,f.jsx)(m.Z,b(b({placeholder:o.ag._("Message"),containerClassName:"md:col-span-2",className:"h-[180px]"},_("message")),{},{error:!!E.message,errorText:null===(s=E.message)||void 0===s?void 0:s.message})),N&&(0,f.jsxs)("p",{className:"flex items-center text-xs leading-[15px] text-white",children:[(0,f.jsx)(g.Z,{}),(0,f.jsx)("span",{className:"ml-1",children:(0,f.jsx)(c.cC,{id:"Thank you for message. We will be in touch within 24-48 hours!"})})]}),p&&(0,f.jsx)("p",{className:"text-xs leading-[15px] text-[#F37272]",children:p})]}),(0,f.jsx)("div",{className:"mt-6 flex justify-end",children:(0,f.jsx)("button",{disabled:C,className:"btn-lg btn-primary",children:C?o.ag._("Submitting..."):o.ag._("Submit")})})]})]})}},32788:function(e,t,r){"use strict";var s=r(95235),a=r(82269),n=r(2784),i=r(6277),c=r(52322),o=["className","errorText","error","containerClassName"];function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,s)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){(0,s.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m=n.forwardRef((function(e,t){var r=e.className,s=e.errorText,n=e.error,l=e.containerClassName,m=(0,a.Z)(e,o);return(0,c.jsxs)("div",{className:l,children:[(0,c.jsx)("textarea",d(d({className:(0,i.Z)(r,"input block w-full",{"border-[#F37272]":n})},m),{},{ref:t})),n&&(0,c.jsx)("p",{className:(0,i.Z)("text-[14px] leading-[1.5] mt-[7px]",{"text-[#F37272]":n}),children:s})]})}));m.displayName="Textarea",t.Z=m},6164:function(e,t,r){"use strict";r.r(t);var s=r(73336),a=r(6277),n=r(96577),i=(r(2784),r(87531)),c=r(28397),o=r(15942),l=r(78320),d=r(301),m=r(90432),u=r(50794),x=r(19616),p=r(52322),h=[{icon:(0,p.jsx)("div",{className:"w-[64px]",children:(0,p.jsx)(l.Z,{})}),title:(0,p.jsx)(s.cC,{id:"Blockchain platform for game studios"}),description:(0,p.jsx)(s.cC,{id:"We provide a full suite of blockchain infrastructure on the Myria chain, our Ethereum L2 built for gaming."})},{icon:(0,p.jsx)("div",{className:"w-[64px]",children:(0,p.jsx)(m.Z,{})}),title:(0,p.jsx)(s.cC,{id:"Myria ecosystem fund"}),description:(0,p.jsx)(s.cC,{id:"Got an innovative gaming idea? Apply for a grant to manifest your vision on the Myria chain."})},{icon:(0,p.jsx)("div",{className:"w-[64px]",children:(0,p.jsx)(d.Z,{})}),title:(0,p.jsx)(s.cC,{id:"Education and support"}),description:(0,p.jsx)(s.cC,{id:"Access ongoing education and technical support to ensure a successful onboarding onto the blockchain."})}];t.default=function(){return(0,p.jsx)(u.Z,{children:(0,p.jsxs)("div",{children:[(0,p.jsxs)("section",{style:{paddingTop:o.J,backgroundPositionY:o.J},className:(0,a.Z)(x.ek,"relative isolate md:min-h-screen "),children:[(0,p.jsx)("div",{style:{top:o.J},className:"absolute left-0 z-[-1] h-[783px] w-full",children:(0,p.jsx)("div",{className:"relative h-full w-full ",children:(0,p.jsx)(n.default,{src:"/images/header-bg_op.png",alt:"",layout:"fill",objectFit:"cover"})})}),(0,p.jsxs)("div",{className:"mx-auto w-full max-w-content ",children:[(0,p.jsx)("h1",{className:"heading-lg mx-auto mt-[50px] max-w-[756px] text-center text-brand-white md:heading-massive md:mt-[120px]",children:(0,p.jsx)(s.cC,{id:"Blockchain infrastructure for Game Studios"})}),(0,p.jsx)("p",{className:"heading-sm mx-auto mt-[32px] max-w-[672px] text-center",children:(0,p.jsx)(s.cC,{id:"An end-to-end solution for token-based game economies and NFTs that benefits the community"})})]}),(0,p.jsx)("h2",{className:"heading-md mt-[252px] text-center",children:"What we do"}),(0,p.jsx)("div",{className:"mx-auto mt-[92px] grid  max-w-content gap-y-[78px] gap-x-[32px] md:grid-cols-4 xl:grid-cols-3",children:h.map((function(e,t){return(0,p.jsxs)(i.Z,{icon:e.icon,className:(0,a.Z)("md:col-span-2 xl:col-span-1",{"md:col-start-2":2===t}),children:[(0,p.jsx)("h3",{className:"heading-sm mx-auto max-w-[314px] md:heading-md",children:e.title}),(0,p.jsx)("p",{className:"body-sm mt-6 mb-[62px] md:body",children:e.description})]},t)}))})]}),(0,p.jsx)("section",{className:(0,a.Z)(x.ek,"mt-[120px] mb-[200px]"),children:(0,p.jsx)("div",{className:"mx-auto max-w-content",children:(0,p.jsx)(c.Z,{})})})]})})}},50980:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/for-studios",function(){return r(6164)}])}},function(e){e.O(0,[6577,7822,794,8592,9774,2888,179],(function(){return t=50980,e(e.s=t);var t}));var t=e.O();_N_E=t}]);
//# sourceMappingURL=for-studios-86098f705c99dd6b.js.map