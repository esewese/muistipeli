(this.webpackJsonpmuistipeli=this.webpackJsonpmuistipeli||[]).push([[0],[,,,,function(e,t,n){e.exports=n(11)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a,r=n(0),c=n.n(r),u=n(3),l=n.n(u),o=(n(9),n(1));n(10);!function(e){e[e.Setup=0]="Setup",e[e.ShowNumbers=1]="ShowNumbers",e[e.UserInput=2]="UserInput",e[e.Score=3]="Score"}(a||(a={}));var s=function(e){var t=Object(r.useState)(""),n=Object(o.a)(t,2),a=n[0],u=n[1];return Object(r.useEffect)((function(){!function t(n){n<e.flash.length?(u(e.flash[n]),setTimeout((function(){t(n+1)}),1e3*e.secPerFlash)):e.onDoneF()}(0)}),[e.flash.length]),c.a.createElement("div",{className:"currentNumber"},a)},i=function(){var e=Object(r.useState)(a.Setup),t=Object(o.a)(e,2),n=t[0],u=t[1],l=Object(r.useState)(5),i=Object(o.a)(l,2),m=i[0],p=i[1],h=Object(r.useState)(2),f=Object(o.a)(h,2),v=f[0],E=f[1],d=Object(r.useState)(2),b=Object(o.a)(d,2),N=b[0],S=b[1],k=Object(r.useState)(new Array),w=Object(o.a)(k,2),g=w[0],y=w[1],O=Object(r.useState)(""),j=Object(o.a)(O,2),A=j[0],C=j[1],x=function(e,t){t(e.target.value)},F=c.a.createElement("p",null,"Error: Unknown State");switch(n){case a.Setup:F=c.a.createElement("div",null,c.a.createElement("p",null,"Numerosettien m\xe4\xe4r\xe4:"),c.a.createElement("input",{value:m,type:"number",onChange:function(e){return x(e,p)}}),c.a.createElement("p",null,"Numerosetin pituus:"),c.a.createElement("input",{disabled:!0,value:v,type:"number",onChange:function(e){return x(e,E)}}),c.a.createElement("p",null,"V\xe4l\xe4hdyksen pituus sekunneissa:"),c.a.createElement("input",{value:N,type:"number",onChange:function(e){return x(e,S)}}),c.a.createElement("button",{onClick:function(){y(function(e,t){for(var n=new Array,a=0;a<e;a++){for(var r="",c=0;c<t;c++)r+=Math.floor(10*Math.random());n.push(r)}return n}(m,v)),u(a.ShowNumbers)}},"Aloita"));break;case a.ShowNumbers:F=c.a.createElement(s,{flash:g,secPerFlash:N,onDoneF:function(){u(a.UserInput)}});break;case a.UserInput:F=c.a.createElement("div",null,c.a.createElement("p",null,"Kirjoita numero:"),c.a.createElement("input",{type:"text",onChange:function(e){return x(e,C)}}),c.a.createElement("button",{onClick:function(){u(a.Score)}},"Tarkista"));break;case a.Score:var I=function(e,t){for(var n=new Array,a=0,r=0,c=0;c<e.length;c++){for(var u=e[c],l=new Array,o=0;o<u.length;o++){var s=c*u.length+o,i={correct:e[c][o],user:t[s]};l.push(i)}a++,l.every((function(e){return e.correct===e.user}))&&r++,n.push(l)}return{resultArray:n,totalN:a,correctN:r}}(g,A),U=[c.a.createElement("div",{className:"col"},"Setti"),c.a.createElement("div",{className:"col"},"Oikea"),c.a.createElement("div",{className:"col"},"Vastaus")],T=c.a.createElement("div",{key:"-Header",className:"flex-grid-thirds grid-header"},U),M=I.resultArray.map((function(e,t){var n=[];n.push(c.a.createElement("div",{className:"col"},t+1)),n.push(c.a.createElement("div",{className:"col"},e.map((function(e){return e.correct}))));var a=e.every((function(e){return e.correct===e.user}))?"correctResponse":"failedResponse";return n.push(c.a.createElement("div",{className:"col"},e.map((function(e){return c.a.createElement("span",{className:a},e.user)})))),c.a.createElement("div",{key:"-"+t,className:"flex-grid-thirds"},n)}));F=c.a.createElement("div",null,c.a.createElement("div",null,c.a.createElement("p",null,"Tulokset:"),T,M,c.a.createElement("p",{className:"resultText"},"Oikein: ",I.correctN,"/",I.totalN," -"," ",(I.correctN/I.totalN*100).toFixed(2),"%")),c.a.createElement("button",{onClick:function(){u(a.Setup)}},"Aloita Alusta"))}return c.a.createElement("div",{className:"App"},c.a.createElement("h2",null,"Muistipeli"),F)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(c.a.createElement(i,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[4,1,2]]]);
//# sourceMappingURL=main.3fdd5b34.chunk.js.map