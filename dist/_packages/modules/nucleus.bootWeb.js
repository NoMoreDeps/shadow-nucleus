!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.isNode=function(){return"[object process]"===Object.prototype.toString.call(void 0!==e?e:0)}}).call(this,n(7))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.constantTree=function e(t,n=""){for(let i in t){const r=`${n}${""!==n?".":""}${i}`;"string"==typeof t[i]&&0===t[i].length?t[i]=r:"object"==typeof t[i]&&e(t[i],r)}return t}},function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))(function(r,o){function s(e){try{u(i.next(e))}catch(e){o(e)}}function c(e){try{u(i.throw(e))}catch(e){o(e)}}function u(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(s,c)}u((i=i.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const r=n(3);!function(){i(this,void 0,void 0,function*(){yield r.start()})}()},function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))(function(r,o){function s(e){try{u(i.next(e))}catch(e){o(e)}}function c(e){try{u(i.throw(e))}catch(e){o(e)}}function u(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(s,c)}u((i=i.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const r=n(4);t.start=function(){return i(this,void 0,void 0,function*(){const e=document.currentScript.getAttribute("data-path")||"";yield r.startNucleus();try{yield _nucleus_api.Module.loadModule(`${e}/nucleus.web.js`)}catch(e){}try{const t=yield(yield fetch(`${e}/modules.conf.web.json`)).json();for(let n=0;n<t.modules.length;n++)yield _nucleus_api.Module.loadModule(`${e}/${t.modules[n].path}`)}catch(e){console.log("modules.conf.web.json file was not found. Nucleus loading aborted.")}})}},function(e,t,n){"use strict";(function(e){var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))(function(r,o){function s(e){try{u(i.next(e))}catch(e){o(e)}}function c(e){try{u(i.throw(e))}catch(e){o(e)}}function u(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(s,c)}u((i=i.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const r=n(6),o=n(0),s=n(8);t.startNucleus=function(t){return i(this,void 0,void 0,function*(){const n=new r.EventBus(".",3),c=new s.Api(n);c.require=t;let u=null;(u=o.isNode()?e:window)._nucleus_api=c,u._nucleus=(e=>i(this,void 0,void 0,function*(){const t=e;yield(new t).entryPoint(c),n.emit("API.MODULE.MODULE_LOADED",{mod:t})}))})}}).call(this,n(5))},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.EventBus=class{constructor(e=".",t=3){this._Emitter_={oncePool:{},onPool:{},parent:void 0,Ids:0},""===e.trim()&&(e="."),t<1&&(t=1),this._separator=e,this._depthLevel=t}get _errors(){const e=this;return{get eventNameBadFormat(){return`The event name is not in the correct format :\nShould be in '${e._depthLevel}' part${e._depthLevel>1?"s":""}\n${e._depthLevel>1?"separated by '"+e._separator+"'":""}`}}}checkEventNameFormat(e){return e&&e.trim().length>0&&e.split(this._separator).length<=this._depthLevel||!1}get pools(){return[this._Emitter_.onPool,this._Emitter_.oncePool]}get separator(){return this._separator}set separator(e){""===e.trim()&&(e="."),this._separator=e}get parent(){return this._Emitter_.parent}set parent(e){this._Emitter_.parent=e}get depthLevel(){return this._depthLevel}set depthLevel(e){e<1&&(e=1),this._depthLevel=e}on(e,t){if(!this.checkEventNameFormat(e))throw Error(this._errors.eventNameBadFormat);this._Emitter_.onPool[e]||(this._Emitter_.onPool[e]=[]);let n={id:this._Emitter_.Ids++,callback:t};return this._Emitter_.onPool[e].push(n),this.emit("registerEvent",{eventName:e,callback:t}),{off:()=>this.off(n.id),id:n.id}}once(e,t){if(!this.checkEventNameFormat(e))throw Error(this._errors.eventNameBadFormat);this._Emitter_.oncePool[e]||(this._Emitter_.oncePool[e]=[]);let n={id:this._Emitter_.Ids++,callback:e=>{this.off(n.id),t(e)},originalCallback:t};return this._Emitter_.oncePool[e].push(n),this.emit("registerEvent",{eventName:e,callback:n.callback}),{off:()=>this.off(n.id),id:n.id}}off(...e){let t=void 0,n=void 0,i=void 0;if(0===e.length||!e)return this._Emitter_.oncePool={},void(this._Emitter_.onPool={});if(1===e.length)switch(typeof e[0]){case"string":t=e[0];break;case"number":i=e[0];break;default:n=e[0]}else t=e[0],n=e[1],i=e[2]||void 0;if(t&&"string"==typeof t){const e=t;this.pools.forEach(t=>{let i=t[e]||[];n&&(i=i.filter(e=>e.originalCallback?e.originalCallback===n:e.callback===n)),i.forEach(n=>{t[e]=t[e].filter(e=>e.id!==n.id)})})}else[this._Emitter_.onPool,this._Emitter_.oncePool].forEach(e=>{for(let t in e){let r=e[t];i&&(r=r.filter(e=>e.id===i)),n&&(r=r.filter(e=>e.originalCallback?e.originalCallback===n:e.callback===n)),r.forEach(n=>{e[t]=e[t].filter(e=>e.id!==n.id)})}})}emit(e,t){return"allEvents"!==e&&this.emit("allEvents",{eventName:e,data:t}),this.pools.forEach(n=>{for(const i in n){const r=i.split(this._separator),o=e.split(this._separator);for(;o.length>0&&r.length<o.length;)o.pop();"string"==typeof i&&r.join()===o.join()&&n[i].forEach(e=>e.callback(t))}}),this._Emitter_.parent&&this._Emitter_.parent.emit(e,t),!0}emitAsync(e,t){return setTimeout(()=>{this.pools.forEach(n=>{for(const i in n){const r=i.split(this._separator),o=e.split(this._separator);for(;o.length>0&&r.length<o.length;)o.pop();"string"==typeof i&&r.join()===o.join()&&n[i].forEach(e=>e.callback(t))}}),this._Emitter_.parent&&this._Emitter_.parent.emitAsync(e,t),"allEvents"!==e&&this.emitAsync("allEvents",{eventName:e,data:t})},0),!0}}},function(e,t){var n,i,r=e.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function c(e){if(n===setTimeout)return setTimeout(e,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:o}catch(e){n=o}try{i="function"==typeof clearTimeout?clearTimeout:s}catch(e){i=s}}();var u,a=[],l=!1,h=-1;function f(){l&&u&&(l=!1,u.length?a=u.concat(a):h=-1,a.length&&d())}function d(){if(!l){var e=c(f);l=!0;for(var t=a.length;t;){for(u=a,a=[];++h<t;)u&&u[h].run();h=-1,t=a.length}u=null,l=!1,function(e){if(i===clearTimeout)return clearTimeout(e);if((i===s||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(e);try{i(e)}catch(t){try{return i.call(null,e)}catch(t){return i.call(this,e)}}}(e)}}function v(e,t){this.fun=e,this.array=t}function _(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];a.push(new v(e,t)),1!==a.length||l||c(d)},v.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=_,r.addListener=_,r.once=_,r.off=_,r.removeListener=_,r.removeAllListeners=_,r.emit=_,r.prependListener=_,r.prependOnceListener=_,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(9),r=n(11);t.Api=class{constructor(e){this._evtBus=e,this._service=new i.Service(e),this._module=new r.Module(e,this)}set require(e){this._require=e}get Service(){return this._service}get Module(){return this._module}}},function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))(function(r,o){function s(e){try{u(i.next(e))}catch(e){o(e)}}function c(e){try{u(i.throw(e))}catch(e){o(e)}}function u(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(s,c)}u((i=i.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const r=n(10);t.Service=class{constructor(e){this._evtBus=e,this._serviceMap={},this.initEvents()}initEvents(){this._evtBus.on(r.Acts.API.SERVICE.REGISTER_SERVICE,e=>{this._registerService(e)}),this._evtBus.on(r.Acts.API.SERVICE.GET_SERVICE,e=>{this._getService(e)})}_registerService(e){this._serviceMap[`${e.serviceId}.${e.serviceName}`]?this._evtBus.emitAsync(r.Evts.API.SERVICE.SERVICE_REGISTERED,Object.assign({},e,{success:!1,reason:Error(`The service ${e.serviceId}.${e.serviceName} is already registered`)})):(this._serviceMap[`${e.serviceId}.${e.serviceName}`]=e,this._evtBus.emitAsync(r.Evts.API.SERVICE.SERVICE_REGISTERED,Object.assign({},e,{success:!0})),this._getService({serviceId:e.serviceId,serviceName:e.serviceName}))}registerService(e,t,n){return i(this,void 0,void 0,function*(){return new Promise((i,o)=>{const s=this._evtBus.on(r.Evts.API.SERVICE.SERVICE_REGISTERED,n=>{n.serviceName===e&&n.serviceId===t&&(s.off(),n.success?i():o(n.reason))});this._evtBus.emitAsync(r.Acts.API.SERVICE.REGISTER_SERVICE,{serviceName:e,serviceId:t,payload:n})})})}_getService(e){this._serviceMap[`${e.serviceId}.${e.serviceName}`]&&this._evtBus.emitAsync(r.Evts.API.SERVICE.SERVICE_RETURNED,Object.assign({},this._serviceMap[`${e.serviceId}.${e.serviceName}`],{success:!0}))}getService(e,t){return i(this,void 0,void 0,function*(){return new Promise((n,i)=>{const o=this._evtBus.on(r.Evts.API.SERVICE.SERVICE_RETURNED,r=>{r.serviceName===e&&r.serviceId===t&&(o.off(),r.success?n(r.payload.serviceDefinition?r.payload.serviceDefinition:r.payload.serviceInstance):i(r.reason))});this._evtBus.emitAsync(r.Acts.API.SERVICE.GET_SERVICE,{serviceName:e,serviceId:t})})})}resolve(e){return i(this,void 0,void 0,function*(){let t=[];if("__nc__Services"in e.prototype)for(let n of e.prototype.__nc__Services){const e=yield this.getService(...n);t.push(e)}const n=new e(...t);return n._NC_TYPE_&&(n._EvtBus=this._evtBus,n.getService=((e,t)=>i(this,void 0,void 0,function*(){return yield this.getService(e,t)})),n.initialize()),n})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(1);let r=i.constantTree({API:{SERVICE:{SERVICE_REGISTERED:"",SERVICE_RETURNED:""}}});t.Evts=r;let o=i.constantTree({API:{SERVICE:{REGISTER_SERVICE:"",GET_SERVICE:""}}});t.Acts=o},function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))(function(r,o){function s(e){try{u(i.next(e))}catch(e){o(e)}}function c(e){try{u(i.throw(e))}catch(e){o(e)}}function u(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(s,c)}u((i=i.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(12);t.Module=class{constructor(e,t){this._evtBus=e,this._moduleMap={},this._api=t}loadModule(e){return i(this,void 0,void 0,function*(){return new Promise((t,n)=>{if(this._evtBus.once(o.Evts.API.MODULE.MODULE_LOADED,()=>{t()}),r.isNode())this._evtBus.emit(o.Acts.API.MODULE.LOAD_MODULE,{path:e}),this._api._require(e);else{this._evtBus.emit(o.Acts.API.MODULE.LOAD_MODULE,{path:e});const t=document.createElement("script");t.type="text/javascript",t.src=e,window.document.body.appendChild(t)}})})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(1);let r=i.constantTree({API:{MODULE:{MODULE_LOADED:""}}});t.Evts=r;let o=i.constantTree({API:{MODULE:{LOAD_MODULE:""}}});t.Acts=o}]);