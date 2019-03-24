!function(e){var t={};function i(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=e,i.c=t,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(r,s,function(t){return e[t]}.bind(null,s));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=2)}([function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isNode=function(){return"[object process]"===Object.prototype.toString.call("undefined"!=typeof process?process:0)}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.constantTree=function e(t,i=""){for(let r in t){const s=`${i}${""!==i?".":""}${r}`;"string"==typeof t[r]&&0===t[r].length?t[r]=s:"object"==typeof t[r]&&e(t[r],s)}return t}},function(e,t,i){"use strict";var r=this&&this.__awaiter||function(e,t,i,r){return new(i||(i=Promise))(function(s,n){function o(e){try{a(r.next(e))}catch(e){n(e)}}function c(e){try{a(r.throw(e))}catch(e){n(e)}}function a(e){e.done?s(e.value):new i(function(t){t(e.value)}).then(o,c)}a((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const s=i(3),n=i(0),o=i(4);t.startNucleus=function(e){return r(this,void 0,void 0,function*(){const t=new s.EventBus(".",3),i=new o.Api(t);i.require=e;let c=null;(c=n.isNode()?global:window)._nucleus_api=i,c._nucleus=(e=>r(this,void 0,void 0,function*(){const r=e;yield(new r).entryPoint(i),t.emit("API.MODULE.MODULE_LOADED",{mod:r})}))})}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.EventBus=class{constructor(e=".",t=3){this._Emitter_={oncePool:{},onPool:{},parent:void 0,Ids:0},""===e.trim()&&(e="."),t<1&&(t=1),this._separator=e,this._depthLevel=t}get _errors(){const e=this;return{get eventNameBadFormat(){return`The event name is not in the correct format :\nShould be in '${e._depthLevel}' part${e._depthLevel>1?"s":""}\n${e._depthLevel>1?"separated by '"+e._separator+"'":""}`}}}checkEventNameFormat(e){return e&&e.trim().length>0&&e.split(this._separator).length<=this._depthLevel||!1}get pools(){return[this._Emitter_.onPool,this._Emitter_.oncePool]}get separator(){return this._separator}set separator(e){""===e.trim()&&(e="."),this._separator=e}get parent(){return this._Emitter_.parent}set parent(e){this._Emitter_.parent=e}get depthLevel(){return this._depthLevel}set depthLevel(e){e<1&&(e=1),this._depthLevel=e}on(e,t){if(!this.checkEventNameFormat(e))throw Error(this._errors.eventNameBadFormat);this._Emitter_.onPool[e]||(this._Emitter_.onPool[e]=[]);let i={id:this._Emitter_.Ids++,callback:t};return this._Emitter_.onPool[e].push(i),this.emit("registerEvent",{eventName:e,callback:t}),{off:()=>this.off(i.id),id:i.id}}once(e,t){if(!this.checkEventNameFormat(e))throw Error(this._errors.eventNameBadFormat);this._Emitter_.oncePool[e]||(this._Emitter_.oncePool[e]=[]);let i={id:this._Emitter_.Ids++,callback:e=>{this.off(i.id),t(e)},originalCallback:t};return this._Emitter_.oncePool[e].push(i),this.emit("registerEvent",{eventName:e,callback:i.callback}),{off:()=>this.off(i.id),id:i.id}}off(...e){let t=void 0,i=void 0,r=void 0;if(0===e.length||!e)return this._Emitter_.oncePool={},void(this._Emitter_.onPool={});if(1===e.length)switch(typeof e[0]){case"string":t=e[0];break;case"number":r=e[0];break;default:i=e[0]}else t=e[0],i=e[1],r=e[2]||void 0;if(t&&"string"==typeof t){const e=t;this.pools.forEach(t=>{let r=t[e]||[];i&&(r=r.filter(e=>e.originalCallback?e.originalCallback===i:e.callback===i)),r.forEach(i=>{t[e]=t[e].filter(e=>e.id!==i.id)})})}else[this._Emitter_.onPool,this._Emitter_.oncePool].forEach(e=>{for(let t in e){let s=e[t];r&&(s=s.filter(e=>e.id===r)),i&&(s=s.filter(e=>e.originalCallback?e.originalCallback===i:e.callback===i)),s.forEach(i=>{e[t]=e[t].filter(e=>e.id!==i.id)})}})}emit(e,t){return"allEvents"!==e&&this.emit("allEvents",{eventName:e,data:t}),this.pools.forEach(i=>{for(const r in i){const s=r.split(this._separator),n=e.split(this._separator);for(;n.length>0&&s.length<n.length;)n.pop();"string"==typeof r&&s.join()===n.join()&&i[r].forEach(e=>e.callback(t))}}),this._Emitter_.parent&&this._Emitter_.parent.emit(e,t),!0}emitAsync(e,t){return setTimeout(()=>{this.pools.forEach(i=>{for(const r in i){const s=r.split(this._separator),n=e.split(this._separator);for(;n.length>0&&s.length<n.length;)n.pop();"string"==typeof r&&s.join()===n.join()&&i[r].forEach(e=>e.callback(t))}}),this._Emitter_.parent&&this._Emitter_.parent.emitAsync(e,t),"allEvents"!==e&&this.emitAsync("allEvents",{eventName:e,data:t})},0),!0}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=i(5),s=i(7);t.Api=class{constructor(e){this._evtBus=e,this._service=new r.Service(e),this._module=new s.Module(e,this)}set require(e){this._require=e}get Service(){return this._service}get Module(){return this._module}}},function(e,t,i){"use strict";var r=this&&this.__awaiter||function(e,t,i,r){return new(i||(i=Promise))(function(s,n){function o(e){try{a(r.next(e))}catch(e){n(e)}}function c(e){try{a(r.throw(e))}catch(e){n(e)}}function a(e){e.done?s(e.value):new i(function(t){t(e.value)}).then(o,c)}a((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const s=i(6);t.Service=class{constructor(e){this._evtBus=e,this._serviceMap={},this.initEvents()}initEvents(){this._evtBus.on(s.Acts.API.SERVICE.REGISTER_SERVICE,e=>{this._registerService(e)}),this._evtBus.on(s.Acts.API.SERVICE.GET_SERVICE,e=>{this._getService(e)})}_registerService(e){this._serviceMap[`${e.serviceId}.${e.serviceName}`]?this._evtBus.emitAsync(s.Evts.API.SERVICE.SERVICE_REGISTERED,Object.assign({},e,{success:!1,reason:Error(`The service ${e.serviceId}.${e.serviceName} is already registered`)})):(this._serviceMap[`${e.serviceId}.${e.serviceName}`]=e,this._evtBus.emitAsync(s.Evts.API.SERVICE.SERVICE_REGISTERED,Object.assign({},e,{success:!0})),this._getService({serviceId:e.serviceId,serviceName:e.serviceName}))}registerService(e,t){return r(this,void 0,void 0,function*(){return new Promise((i,r)=>{const n=this._evtBus.on(s.Evts.API.SERVICE.SERVICE_REGISTERED,t=>{t.serviceName===e.serviceName&&t.serviceId===e.serviceId&&(n.off(),t.success?i():r(t.reason))});this._evtBus.emitAsync(s.Acts.API.SERVICE.REGISTER_SERVICE,{serviceName:e.serviceName,serviceId:e.serviceId,payload:t})})})}_getService(e){this._serviceMap[`${e.serviceId}.${e.serviceName}`]&&this._evtBus.emitAsync(s.Evts.API.SERVICE.SERVICE_RETURNED,Object.assign({},this._serviceMap[`${e.serviceId}.${e.serviceName}`],{success:!0}))}getService(e){return r(this,void 0,void 0,function*(){return new Promise((t,i)=>{const r=this._evtBus.on(s.Evts.API.SERVICE.SERVICE_RETURNED,s=>{s.serviceName===e.serviceName&&s.serviceId===e.serviceId&&(r.off(),s.success?t(s.payload.serviceDefinition?s.payload.serviceDefinition:s.payload.serviceInstance):i(s.reason))});this._evtBus.emitAsync(s.Acts.API.SERVICE.GET_SERVICE,{serviceName:e.serviceName,serviceId:e.serviceId})})})}resolve(e){return r(this,void 0,void 0,function*(){const t=new e(...[]);return t._NC_TYPE_&&(t._EvtBus=this._evtBus,t.getService=((e,t)=>r(this,void 0,void 0,function*(){return yield this.getService({serviceName:e,serviceId:t})})),t.initialize()),t})}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=i(1);let s=r.constantTree({API:{SERVICE:{SERVICE_REGISTERED:"",SERVICE_RETURNED:""}}});t.Evts=s;let n=r.constantTree({API:{SERVICE:{REGISTER_SERVICE:"",GET_SERVICE:""}}});t.Acts=n},function(e,t,i){"use strict";var r=this&&this.__awaiter||function(e,t,i,r){return new(i||(i=Promise))(function(s,n){function o(e){try{a(r.next(e))}catch(e){n(e)}}function c(e){try{a(r.throw(e))}catch(e){n(e)}}function a(e){e.done?s(e.value):new i(function(t){t(e.value)}).then(o,c)}a((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const s=i(0),n=i(8);t.Module=class{constructor(e,t){this._evtBus=e,this._moduleMap={},this._api=t}loadModule(e){return r(this,void 0,void 0,function*(){return new Promise((t,i)=>{if(this._evtBus.once(n.Evts.API.MODULE.MODULE_LOADED,()=>{t()}),s.isNode())this._evtBus.emit(n.Acts.API.MODULE.LOAD_MODULE,{path:e}),this._api._require(e);else{this._evtBus.emit(n.Acts.API.MODULE.LOAD_MODULE,{path:e});const t=document.createElement("script");t.type="text/javascript",t.src=e,window.document.body.appendChild(t)}})})}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=i(1);let s=r.constantTree({API:{MODULE:{MODULE_LOADED:""}}});t.Evts=s;let n=r.constantTree({API:{MODULE:{LOAD_MODULE:""}}});t.Acts=n}]);