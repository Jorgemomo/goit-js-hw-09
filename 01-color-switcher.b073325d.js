!function(){"use strict";var t={startButton:document.querySelector("button[data-start]"),stopButton:document.querySelector("button[data-stop]"),bgBody:document.querySelector("body")},o=null;function n(){t.bgBody.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}t.startButton.addEventListener("click",(function(){t.startButton.disabled=!0,t.stopButton.disabled=!1,o=setInterval(n,1e3)})),t.stopButton.addEventListener("click",(function(){t.startButton.disabled=!1,t.stopButton.disabled=!0,clearInterval(o)}))}();
//# sourceMappingURL=01-color-switcher.b073325d.js.map
