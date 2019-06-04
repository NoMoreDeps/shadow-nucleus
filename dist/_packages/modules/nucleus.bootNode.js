!function(e){var t={};function i(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=2)}([function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isNode=function(){return"[object process]"===Object.prototype.toString.call("undefined"!=typeof process?process:0)}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.constantTree=function e(t,i=""){for(const n in t){const r=`${i}${""!==i?".":""}${n}`;"string"==typeof t[n]&&0===t[n].length?t[n]=r:"object"==typeof t[n]&&e(t[n],r)}return t}},function(e,t,i){"use strict";var n=this&&this.__awaiter||function(e,t,i,n){return new(i||(i=Promise))(function(r,s){function o(e){try{a(n.next(e))}catch(e){s(e)}}function c(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){e.done?r(e.value):new i(function(t){t(e.value)}).then(o,c)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const r=i(3);!function(){n(this,void 0,void 0,function*(){yield r.start()})}()},function(e,t,i){"use strict";var n=this&&this.__awaiter||function(e,t,i,n){return new(i||(i=Promise))(function(r,s){function o(e){try{a(n.next(e))}catch(e){s(e)}}function c(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){e.done?r(e.value):new i(function(t){t(e.value)}).then(o,c)}a((n=n.apply(e,t||[])).next())})},r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const s=i(4),o=r(i(11)),c=r(i(12));t.start=function(){return n(this,void 0,void 0,function*(){if(yield s.startNucleus(require),c.existsSync(o.resolve("nucleus.node.js"))&&(yield _nucleus_api.Module.loadModule(o.resolve("nucleus.node.js"))),c.existsSync(o.resolve("modules.conf.node.json"))){const e=JSON.parse(c.readFileSync(o.resolve("modules.conf.node.json"),"utf8"));for(let t=0;t<e.modules.length;t++)yield _nucleus_api.Module.loadModule(o.resolve(e.modules[t].path))}else console.log(`${o.resolve("modules.conf.node.json")} file was not found. Nucleus loading aborted.`)})}},function(e,t,i){"use strict";var n=this&&this.__awaiter||function(e,t,i,n){return new(i||(i=Promise))(function(r,s){function o(e){try{a(n.next(e))}catch(e){s(e)}}function c(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){e.done?r(e.value):new i(function(t){t(e.value)}).then(o,c)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const r=i(5),s=i(0),o=i(6);t.startNucleus=function(e){return n(this,void 0,void 0,function*(){const t=new r.EventBus(".",3),i=new o.Api(t);i.require=e;let c=null;(c=s.isNode()?global:window)._nucleus_api=i,c._nucleus=(e=>n(this,void 0,void 0,function*(){const n=e;yield(new n).entryPoint(i),t.emit("API.MODULE.MODULE_LOADED",{mod:n})}))})}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.EventBus=class{constructor(e=".",t=3){this._Emitter_={oncePool:{},onPool:{},parent:void 0,Ids:0},""===e.trim()&&(e="."),t<1&&(t=1),this._separator=e,this._depthLevel=t}get _errors(){const e=this;return{get eventNameBadFormat(){return`The event name is not in the correct format :\nShould be in '${e._depthLevel}' part${e._depthLevel>1?"s":""}\n${e._depthLevel>1?"separated by '"+e._separator+"'":""}`}}}checkEventNameFormat(e){return e&&e.trim().length>0&&e.split(this._separator).length<=this._depthLevel||!1}get pools(){return[this._Emitter_.onPool,this._Emitter_.oncePool]}get separator(){return this._separator}set separator(e){""===e.trim()&&(e="."),this._separator=e}get parent(){return this._Emitter_.parent}set parent(e){this._Emitter_.parent=e}get depthLevel(){return this._depthLevel}set depthLevel(e){e<1&&(e=1),this._depthLevel=e}on(e,t){if(!this.checkEventNameFormat(e))throw Error(this._errors.eventNameBadFormat);this._Emitter_.onPool[e]||(this._Emitter_.onPool[e]=[]);let i={id:this._Emitter_.Ids++,callback:t};return this._Emitter_.onPool[e].push(i),this.emit("registerEvent",{eventName:e,callback:t}),{off:()=>this.off(i.id),id:i.id}}once(e,t){if(!this.checkEventNameFormat(e))throw Error(this._errors.eventNameBadFormat);this._Emitter_.oncePool[e]||(this._Emitter_.oncePool[e]=[]);let i={id:this._Emitter_.Ids++,callback:e=>{this.off(i.id),t(e)},originalCallback:t};return this._Emitter_.oncePool[e].push(i),this.emit("registerEvent",{eventName:e,callback:i.callback}),{off:()=>this.off(i.id),id:i.id}}off(...e){let t=void 0,i=void 0,n=void 0;if(0===e.length||!e)return this._Emitter_.oncePool={},void(this._Emitter_.onPool={});if(1===e.length)switch(typeof e[0]){case"string":t=e[0];break;case"number":n=e[0];break;default:i=e[0]}else t=e[0],i=e[1],n=e[2]||void 0;if(t&&"string"==typeof t){const e=t;this.pools.forEach(t=>{let n=t[e]||[];i&&(n=n.filter(e=>e.originalCallback?e.originalCallback===i:e.callback===i)),n.forEach(i=>{t[e]=t[e].filter(e=>e.id!==i.id)})})}else[this._Emitter_.onPool,this._Emitter_.oncePool].forEach(e=>{for(let t in e){let r=e[t];n&&(r=r.filter(e=>e.id===n)),i&&(r=r.filter(e=>e.originalCallback?e.originalCallback===i:e.callback===i)),r.forEach(i=>{e[t]=e[t].filter(e=>e.id!==i.id)})}})}emit(e,t){return"allEvents"!==e&&this.emit("allEvents",{eventName:e,data:t}),this.pools.forEach(i=>{for(const n in i){const r=n.split(this._separator),s=e.split(this._separator);for(;s.length>0&&r.length<s.length;)s.pop();"string"==typeof n&&r.join()===s.join()&&i[n].forEach(e=>e.callback(t))}}),this._Emitter_.parent&&this._Emitter_.parent.emit(e,t),!0}emitAsync(e,t){return setTimeout(()=>{this.pools.forEach(i=>{for(const n in i){const r=n.split(this._separator),s=e.split(this._separator);for(;s.length>0&&r.length<s.length;)s.pop();"string"==typeof n&&r.join()===s.join()&&i[n].forEach(e=>e.callback(t))}}),this._Emitter_.parent&&this._Emitter_.parent.emitAsync(e,t),"allEvents"!==e&&this.emitAsync("allEvents",{eventName:e,data:t})},0),!0}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=i(7),r=i(9);t.Api=class{constructor(e){this._evtBus=e,this._service=new n.Service(e),this._module=new r.Module(e,this)}set require(e){this._require=e}get Service(){return this._service}get Module(){return this._module}}},function(e,t,i){"use strict";var n=this&&this.__awaiter||function(e,t,i,n){return new(i||(i=Promise))(function(r,s){function o(e){try{a(n.next(e))}catch(e){s(e)}}function c(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){e.done?r(e.value):new i(function(t){t(e.value)}).then(o,c)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const r=i(8);t.Service=class{constructor(e){this._evtBus=e,this._serviceMap={},this.initEvents()}initEvents(){this._evtBus.on(r.Acts.API.SERVICE.REGISTER_SERVICE,e=>{this._registerService(e)}),this._evtBus.on(r.Acts.API.SERVICE.GET_SERVICE,e=>{this._getService(e)})}_registerService(e){this._serviceMap[`${e.serviceId}.${e.serviceName}`]?this._evtBus.emitAsync(r.Evts.API.SERVICE.SERVICE_REGISTERED,Object.assign({},e,{success:!1,reason:Error(`The service ${e.serviceId}.${e.serviceName} is already registered`)})):(this._serviceMap[`${e.serviceId}.${e.serviceName}`]=e,this._evtBus.emitAsync(r.Evts.API.SERVICE.SERVICE_REGISTERED,Object.assign({},e,{success:!0})),this._getService({serviceId:e.serviceId,serviceName:e.serviceName}))}registerService(e,t){return n(this,void 0,void 0,function*(){return new Promise((i,n)=>{const s=this._evtBus.on(r.Evts.API.SERVICE.SERVICE_REGISTERED,t=>{t.serviceName===e.serviceName&&t.serviceId===e.serviceId&&(s.off(),t.success?i():n(t.reason))});this._evtBus.emitAsync(r.Acts.API.SERVICE.REGISTER_SERVICE,{serviceName:e.serviceName,serviceId:e.serviceId,payload:t})})})}_getService(e){this._serviceMap[`${e.serviceId}.${e.serviceName}`]&&this._evtBus.emitAsync(r.Evts.API.SERVICE.SERVICE_RETURNED,Object.assign({},this._serviceMap[`${e.serviceId}.${e.serviceName}`],{success:!0}))}getService(e){return n(this,void 0,void 0,function*(){return new Promise((t,i)=>{const n=this._evtBus.on(r.Evts.API.SERVICE.SERVICE_RETURNED,r=>{r.serviceName===e.serviceName&&r.serviceId===e.serviceId&&(n.off(),r.success?t(r.payload.serviceDefinition?r.payload.serviceDefinition:r.payload.serviceInstance):i(r.reason))});this._evtBus.emitAsync(r.Acts.API.SERVICE.GET_SERVICE,{serviceName:e.serviceName,serviceId:e.serviceId})})})}resolve(e){return n(this,void 0,void 0,function*(){const t=new e(...[]);return t._NC_TYPE_&&(t._EvtBus=this._evtBus,t.getService=((e,t)=>n(this,void 0,void 0,function*(){return yield this.getService({serviceName:e,serviceId:t})})),t.initialize()),t})}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=i(1);let r=n.constantTree({API:{SERVICE:{SERVICE_REGISTERED:"",SERVICE_RETURNED:""}}});t.Evts=r;let s=n.constantTree({API:{SERVICE:{REGISTER_SERVICE:"",GET_SERVICE:""}}});t.Acts=s},function(e,t,i){"use strict";var n=this&&this.__awaiter||function(e,t,i,n){return new(i||(i=Promise))(function(r,s){function o(e){try{a(n.next(e))}catch(e){s(e)}}function c(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){e.done?r(e.value):new i(function(t){t(e.value)}).then(o,c)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const r=i(0),s=i(10);t.Module=class{constructor(e,t){this._evtBus=e,this._moduleMap={},this._api=t}loadModule(e){return n(this,void 0,void 0,function*(){return new Promise((t,i)=>{if(this._evtBus.once(s.Evts.API.MODULE.MODULE_LOADED,()=>{t()}),r.isNode())this._evtBus.emit(s.Acts.API.MODULE.LOAD_MODULE,{path:e}),this._api._require(e);else{this._evtBus.emit(s.Acts.API.MODULE.LOAD_MODULE,{path:e});const t=document.createElement("script");t.type="text/javascript",t.src=e,window.document.body.appendChild(t)}})})}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=i(1);let r=n.constantTree({API:{MODULE:{MODULE_LOADED:""}}});t.Evts=r;let s=n.constantTree({API:{MODULE:{LOAD_MODULE:""}}});t.Acts=s},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("fs")}]);