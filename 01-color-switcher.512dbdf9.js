!function(){var t,e=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]"),o=document.querySelector("body");e.addEventListener("click",(function(){e.disabled=!0,t=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0));o.style.backgroundColor=t}),1e3)})),n.addEventListener("click",(function(){clearInterval(t)}))}();
//# sourceMappingURL=01-color-switcher.512dbdf9.js.map