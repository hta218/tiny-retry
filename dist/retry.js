!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["tiny-retry"]=t():e["tiny-retry"]=t()}(this,(function(){return e={868:(e,t,r)=>{const o=r(572);e.exports=async function(e,t){const{maxTries:r=10,delay:s=1e3,startAfter:n=0,process:a,errorHandler:c,check:i}=t;return new Promise((async t=>{await o(n);let p=0;const f=async()=>{try{p+=1,a?.(p);const r=await e();if(!i?.(r))throw new Error("Unexpected data");t({success:!0,tries:p,data:r})}catch(e){c?.(e),p>=r?t({success:!1,tries:p}):(await o(s),await f())}};await f()}))}},572:e=>{e.exports=e=>new Promise((t=>setTimeout(t,e)))}},t={},function r(o){var s=t[o];if(void 0!==s)return s.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}(868);var e,t}));