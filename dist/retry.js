!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports["tiny-retry"]=e():t["tiny-retry"]=e()}(this,(function(){return t={868:(t,e,o)=>{const r=o(572);t.exports=async function(t,e=10,o=1e3,n=0){return new Promise((async s=>{await r(n);let i=1;await async function n(){try{const e=await t();s({success:!0,retryCount:i,data:e})}catch(t){i>=e?s({success:!1,retryCount:i}):(i+=1,await r(o),await n())}}()}))}},572:t=>{t.exports=t=>new Promise((e=>setTimeout(e,t)))}},e={},function o(r){var n=e[r];if(void 0!==n)return n.exports;var s=e[r]={exports:{}};return t[r](s,s.exports,o),s.exports}(868);var t,e}));