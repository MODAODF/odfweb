!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var i=t();for(var n in i)("object"==typeof exports?exports:e)[n]=i[n]}}(window,(function(){return function(e){function t(t){for(var i,o,l=t[0],r=t[1],s=0,p=[];s<l.length;s++)o=l[s],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&p.push(n[o][0]),n[o]=0;for(i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i]);for(a&&a(t);p.length;)p.shift()()}var i={},n={0:0};function o(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.e=function(e){var t=[],i=n[e];if(0!==i)if(i)t.push(i[2]);else{var l=new Promise((function(t,o){i=n[e]=[t,o]}));t.push(i[2]=l);var r,s=document.createElement("script");s.charset="utf-8",s.timeout=120,o.nc&&s.setAttribute("nonce",o.nc),s.src=function(e){return o.p+""+({2:"sharing",3:"vendors~sharing"}[e]||e)+".js"}(e);var a=new Error;r=function(t){s.onerror=s.onload=null,clearTimeout(p);var i=n[e];if(0!==i){if(i){var o=t&&("load"===t.type?"missing":t.type),l=t&&t.target&&t.target.src;a.message="Loading chunk "+e+" failed.\n("+o+": "+l+")",a.name="ChunkLoadError",a.type=o,a.request=l,i[1](a)}n[e]=void 0}};var p=setTimeout((function(){r({type:"timeout",target:s})}),12e4);s.onerror=s.onload=r,document.head.appendChild(s)}return Promise.all(t)},o.m=e,o.c=i,o.d=function(e,t,i){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(i,n,function(t){return e[t]}.bind(null,n));return i},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/",o.oe=function(e){throw console.error(e),e};var l=window.webpackJsonpTemplateRepo=window.webpackJsonpTemplateRepo||[],r=l.push.bind(l);l.push=t,l=l.slice();for(var s=0;s<l.length;s++)t(l[s]);var a=r;return o(o.s=28)}({28:function(e,t,i){i(29),i(30),e.exports=i(31)},29:function(e,t,i){
/*
 * @copyright Copyright (c) 2018 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
!function(e,t){e.Plugins.register("OCA.Files.App",{attach:function(){t.Theming?e.MimeType._mimeTypeIcons["dir-templaterepo"]=e.generateUrl("/apps/theming/img/templaterepo/folder-group.svg?v="+t.Theming.cacheBuster):e.MimeType._mimeTypeIcons["dir-templaterepo"]=e.imagePath("templaterepo","folder-group")}}),i.nc=btoa(e.requestToken),i.p=e.linkTo("templaterepo","build/");var n={attach:function(e){e.on("rendered",(function(){var t=this;if(this.model&&"templaterepo"===this.model.get("mountType")){var n=document.createElement("div"),o=e.$el.find(".dialogContainer")[0];o.parentNode.insertBefore(n,o.nextSibling),n.id="templaterepo-sharing",Promise.all([i.e(3),i.e(2)]).then(i.bind(null,33)).then((function(e){new(0,e.default)({propsData:{fileModel:t.model}}).$mount(n)}))}}))}};e.Plugins.register("OCA.Sharing.ShareTabView",n)}(OC,OCA)},30:function(e,t){!function(e){e.Files.TemplateRepoPlugin={name:"TemplateRepo",templaterepoFileList:null,attach:function(){var e=this;$("#app-content-templaterepolist").on("show.plugin-templaterepo",(function(t){e.showFileList($(t.target))})),$("#app-content-templaterepolist").on("hide.plugin-templaterepo",(function(){e.hideFileList()}))},detach:function(){this.templaterepoFileList&&(this.templaterepoFileList.destroy(),e.Files.fileActions.off("setDefault.plugin-templaterepo",this._onActionsUpdated),e.Files.fileActions.off("registerAction.plugin-templaterepo",this._onActionsUpdated),$("#app-content-templaterepolist").off(".plugin-templaterepo"),this.templaterepoFileList=null)},showFileList:function(e){return this.templaterepoFileList||(this.templaterepoFileList=this._createTemplateRepoFileList(e)),this.templaterepoFileList},hideFileList:function(){this.templaterepoFileList&&this.templaterepoFileList.$fileList.empty()},_createTemplateRepoFileList:function(t){var i=this._createFileActions();return new e.Files.TemplateRepoFileList(t,{fileActions:i,shown:!0})},_createFileActions:function(){var t=new e.Files.FileActions;return t.registerDefaultActions(),t.merge(e.Files.fileActions),this._globalActionsInitialized||(this._onActionsUpdated=_.bind(this._onActionsUpdated,this),e.Files.fileActions.on("setDefault.plugin-templaterepo",this._onActionsUpdated),e.Files.fileActions.on("registerAction.plugin-templaterepo",this._onActionsUpdated),this._globalActionsInitialized=!0),t.register("dir","Open",OC.PERMISSION_READ,"",(function(t,i){e.Files.App.setActiveView("files",{silent:!0}),e.Files.App.fileList.changeDirectory(OC.joinPaths(i.$file.attr("data-path"),t),!0,!0)})),t.setDefault("dir","Open"),t},_onActionsUpdated:function(e){e.action?this.templaterepoFileList.fileActions.registerAction(e.action):e.defaultAction&&this.templaterepoFileList.fileActions.setDefault(e.defaultAction.mime,e.defaultAction.name)}}}(OCA),OC.Plugins.register("OCA.Files.App",OCA.Files.TemplateRepoPlugin)},31:function(e,i){$(document).ready((function(){!function(e){if(e.Files.FileList){var i=function(e,t){this.initialize(e,t)};i.prototype=_.extend({},e.Files.FileList.prototype,{id:"templaterepolist",appName:t("files","TemplateRepo"),_clientSideSort:!0,_allowSelection:!1,initialize:function(t,i){e.Files.FileList.prototype.initialize.apply(this,arguments),this.initialized||(OC.Plugins.attach("OCA.Files.TemplateRepoFileList",this),$.ajax({url:OC.generateUrl("/apps/templaterepo/folderlist"),type:"GET",dataType:"json"}).done((function(){console.log("ffffff")})))},updateEmptyContent:function(){var i=this.getCurrentDirectory();"/"===i?(this.$el.find("#emptycontent").toggleClass("hidden",!this.isEmpty),this.$el.find("#filestable thead th").toggleClass("hidden",this.isEmpty),this.$el.find("#emptycontent").html('<div class="nav-icon-templaterepo"></div><h2>'+t("templaterepo","No Template Repo")+"</h2>")):e.Files.FileList.prototype.updateEmptyContent.apply(this,arguments)},getDirectoryPermissions:function(){return OC.PERMISSION_READ|OC.PERMISSION_DELETE},updateStorageStatistics:function(){},reload:function(){this.showMask(),this._reloadCall&&this._reloadCall.abort(),this._setCurrentDir("/",!1),this._reloadCall=$.ajax({url:OC.generateUrl("/apps/templaterepo/folderlist"),type:"GET",dataType:"json"});var e=this.reloadCallback.bind(this);return this._reloadCall.then(e,e)},reloadCallback:function(e){return delete this._reloadCall,this.hideMask(),!!e.files&&(this.setFiles(e.files.sort(this._sortComparator)),!0)}}),e.Files.TemplateRepoFileList=i}}(OCA)}))}})}));
//# sourceMappingURL=files.js.map