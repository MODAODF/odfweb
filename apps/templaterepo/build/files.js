!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var i=t();for(var n in i)("object"==typeof exports?exports:e)[n]=i[n]}}(window,(function(){return function(e){function t(t){for(var i,a,r=t[0],o=t[1],s=0,p=[];s<r.length;s++)a=r[s],Object.prototype.hasOwnProperty.call(n,a)&&n[a]&&p.push(n[a][0]),n[a]=0;for(i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i]);for(l&&l(t);p.length;)p.shift()()}var i={},n={0:0};function a(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.e=function(e){var t=[],i=n[e];if(0!==i)if(i)t.push(i[2]);else{var r=new Promise((function(t,a){i=n[e]=[t,a]}));t.push(i[2]=r);var o,s=document.createElement("script");s.charset="utf-8",s.timeout=120,a.nc&&s.setAttribute("nonce",a.nc),s.src=function(e){return a.p+""+({2:"sharing",3:"vendors~sharing"}[e]||e)+".js"}(e);var l=new Error;o=function(t){s.onerror=s.onload=null,clearTimeout(p);var i=n[e];if(0!==i){if(i){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",l.name="ChunkLoadError",l.type=a,l.request=r,i[1](l)}n[e]=void 0}};var p=setTimeout((function(){o({type:"timeout",target:s})}),12e4);s.onerror=s.onload=o,document.head.appendChild(s)}return Promise.all(t)},a.m=e,a.c=i,a.d=function(e,t,i){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(i,n,function(t){return e[t]}.bind(null,n));return i},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/",a.oe=function(e){throw console.error(e),e};var r=window.webpackJsonpTemplateRepo=window.webpackJsonpTemplateRepo||[],o=r.push.bind(r);r.push=t,r=r.slice();for(var s=0;s<r.length;s++)t(r[s]);var l=o;return a(a.s=31)}({1:function(e,t,i){"use strict";
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
 */var n={PROPERTY_ACL_LIST:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-list",PROPERTY_ACL_ENTRY:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl",PROPERTY_ACL_MAPPING_TYPE:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-mapping-type",PROPERTY_ACL_MAPPING_ID:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-mapping-id",PROPERTY_ACL_MASK:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-mask",PROPERTY_ACL_PERMISSIONS:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-permissions",PROPERTY_ACL_ENABLED:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-enabled",PROPERTY_ACL_CAN_MANAGE:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-can-manage",PROPERTY_INHERITED_ACL_LIST:"{"+OC.Files.Client.NS_NEXTCLOUD+"}inherited-acl-list",GROUP_FOLDER_ID:"{"+OC.Files.Client.NS_NEXTCLOUD+"}template-repo-id"};t.a=n},12:function(e,t,i){"use strict";var n,a=i(1),r=i(7);function o(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}
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
 */var l=function(e){for(var t=[],i=0;i<e.length;i++){var n={mask:0,permissions:0};for(var a in e[i].children){var r=e[i].children[a];if(r.nodeName)switch(r.nodeName.split(":")[1]||""){case"acl-mapping-id":n.mappingId=r.textContent||r.text;break;case"acl-mapping-type":n.mappingType=r.textContent||r.text;break;case"acl-mapping-display-name":n.mappingDisplayName=r.textContent||r.text;break;case"acl-mask":n.mask=parseInt(r.textContent||r.text,10);break;case"acl-permissions":n.permissions=parseInt(r.textContent||r.text,10)}}t.push(n)}return t},p={attach:function(e){(n=e.filesClient).addFileInfoParser((function(e){var t={},i=e.propStat[0].properties,n=i[a.a.GROUP_FOLDER_ID];void 0!==n&&(t.groupFolderId=n);var r=i[a.a.PROPERTY_ACL_ENABLED];void 0!==r&&(t.aclEnabled=!!r);var o=i[a.a.PROPERTY_ACL_CAN_MANAGE];void 0!==o&&(t.aclCanManage=!!o);var s=i[a.a.PROPERTY_ACL_LIST]||[],p=i[a.a.PROPERTY_INHERITED_ACL_LIST]||[];return t.acl=l(s),t.inheritedAcls=l(p),t.acl.map((function(e){var i=t.inheritedAcls.find((function(t){return t.mappingType===e.mappingType&&t.mappingId===e.mappingId}));return i&&(e.permissions=e.permissions&e.mask|i.permissions&~e.mask),e})),t})),function(e){e._client.getPropertyBody=function(e,t){var i,n=this.parseClarkNotation(e);if(i=this.xmlNamespaces[n.namespace]?this.xmlNamespaces[n.namespace]+":"+n.name:"x:"+n.name+' xmlns:x="'+n.namespace+'"',Array.isArray(t)){var a="";for(var r in t)t[r].hasOwnProperty("type")&&t[r].hasOwnProperty("data")?a+=this.getPropertyBody(t[r].type,t[r].data):a+=this.getPropertyBody(r,t[r]);return"      <"+i+">"+a+"</"+i+">"}if("object"===s(t)){var o="";if(t.hasOwnProperty("type")&&t.hasOwnProperty("data"))return this.getPropertyBody(t.type,t.data);for(var l in t)o+=this.getPropertyBody(l,t[l]);return"      <"+i+">"+o+"</"+i+">"}return"d:resourcetype"!==i&&(t=dav._escapeXml(""+t)),"      <"+i+">"+t+"</"+i+">"},e._client._renderPropSet=function(e){var t="  <d:set>\n   <d:prop>\n";for(var i in e)e.hasOwnProperty(i)&&(t+=this.getPropertyBody(i,e[i]));return t+="    </d:prop>\n",t+="  </d:set>\n"}}(n)}};!function(e){_.extend(e.Files.Client,a.a)}(window.OC),OC.Plugins.register("OCA.Files.FileList",p);var c=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,i,s;return t=e,(i=[{key:"propFind",value:function(e){return n.getFileInfo(e.path+"/"+e.name,{properties:[a.a.PROPERTY_ACL_LIST,a.a.PROPERTY_INHERITED_ACL_LIST,a.a.GROUP_FOLDER_ID,a.a.PROPERTY_ACL_ENABLED,a.a.PROPERTY_ACL_CAN_MANAGE]}).then((function(e,t){if(t){var i={},n={};for(var a in t.acl){var o=new r.a;o.fromValues(t.acl[a].mappingType,t.acl[a].mappingId,t.acl[a].mappingDisplayName,t.acl[a].mask,t.acl[a].permissions),i[o.getUniqueMappingIdentifier()]=o}for(var s in t.inheritedAcls){var l=new r.a;l.fromValues(t.inheritedAcls[s].mappingType,t.inheritedAcls[s].mappingId,t.inheritedAcls[s].mappingDisplayName,t.inheritedAcls[s].mask,t.inheritedAcls[s].permissions,!0);var p=l.getUniqueMappingIdentifier();n[p]=l,null==i[p]&&(i[p]=l)}return{acls:Object.values(i),inheritedAclsById:n,aclEnabled:t.aclEnabled,aclCanManage:t.aclCanManage,groupFolderId:t.groupFolderId}}return null}))}},{key:"propPatch",value:function(e,t){var i=[];for(var r in t)i.push({type:a.a.PROPERTY_ACL_ENTRY,data:t[r].getProperties()});var o={};return o[a.a.PROPERTY_ACL_LIST]=i,n._client.propPatch(n._client.baseUrl+e.path+"/"+e.name,o)}}])&&o(t.prototype,i),s&&o(t,s),e}();t.a=new c},31:function(e,t,i){i(32),i(33),e.exports=i(34)},32:function(e,t,i){"use strict";i.r(t);i(12);
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
 */i.nc=btoa(OC.requestToken),i.p=OC.linkTo("templaterepo","build/"),function(e,t){e.Plugins.register("OCA.Files.App",{attach:function(){t.Theming?e.MimeType._mimeTypeIcons["dir-templaterepo"]=e.generateUrl("/apps/theming/img/templaterepo/folder-group.svg?v="+t.Theming.cacheBuster):e.MimeType._mimeTypeIcons["dir-templaterepo"]=e.imagePath("templaterepo","folder-group")}})}(OC,OCA),window.addEventListener("DOMContentLoaded",(function(){Promise.all([i.e(3),i.e(2)]).then(i.bind(null,36)).then((function(e){OCA.Sharing.ShareTabSections.registerSection((function(t,i){if("templaterepo"===i.mountType)return e.default}))}))}))},33:function(e,t){!function(e){e.Files.TemplateRepoPlugin={name:"TemplateRepo",templaterepoFileList:null,attach:function(){var e=this;$("#app-content-templaterepolist").on("show.plugin-templaterepo",(function(t){e.showFileList($(t.target))})),$("#app-content-templaterepolist").on("hide.plugin-templaterepo",(function(){e.hideFileList()}))},detach:function(){this.templaterepoFileList&&(this.templaterepoFileList.destroy(),e.Files.fileActions.off("setDefault.plugin-templaterepo",this._onActionsUpdated),e.Files.fileActions.off("registerAction.plugin-templaterepo",this._onActionsUpdated),$("#app-content-templaterepolist").off(".plugin-templaterepo"),this.templaterepoFileList=null)},showFileList:function(e){return this.templaterepoFileList||(this.templaterepoFileList=this._createTemplateRepoFileList(e)),this.templaterepoFileList},hideFileList:function(){this.templaterepoFileList&&this.templaterepoFileList.$fileList.empty()},_createTemplateRepoFileList:function(t){var i=this._createFileActions();return new e.Files.TemplateRepoFileList(t,{fileActions:i,shown:!0})},_createFileActions:function(){var t=new e.Files.FileActions;return t.registerDefaultActions(),t.merge(e.Files.fileActions),this._globalActionsInitialized||(this._onActionsUpdated=_.bind(this._onActionsUpdated,this),e.Files.fileActions.on("setDefault.plugin-templaterepo",this._onActionsUpdated),e.Files.fileActions.on("registerAction.plugin-templaterepo",this._onActionsUpdated),this._globalActionsInitialized=!0),t.register("dir","Open",OC.PERMISSION_READ,"",(function(t,i){e.Files.App.setActiveView("files",{silent:!0}),e.Files.App.fileList.changeDirectory(OC.joinPaths(i.$file.attr("data-path"),t),!0,!0)})),t.setDefault("dir","Open"),t},_onActionsUpdated:function(e){e.action?this.templaterepoFileList.fileActions.registerAction(e.action):e.defaultAction&&this.templaterepoFileList.fileActions.setDefault(e.defaultAction.mime,e.defaultAction.name)}}}(OCA),OC.Plugins.register("OCA.Files.App",OCA.Files.TemplateRepoPlugin)},34:function(e,i){$(document).ready((function(){!function(e){if(e.Files.FileList){var i=function(e,t){this.initialize(e,t)};i.prototype=_.extend({},e.Files.FileList.prototype,{id:"templaterepolist",appName:t("files","TemplateRepo"),_clientSideSort:!0,_allowSelection:!1,initialize:function(t,i){e.Files.FileList.prototype.initialize.apply(this,arguments),this.initialized||(OC.Plugins.attach("OCA.Files.TemplateRepoFileList",this),$.ajax({url:OC.generateUrl("/apps/templaterepo/folderlist"),type:"GET",dataType:"json"}).done((function(){console.log("ffffff")})))},updateEmptyContent:function(){var i=this.getCurrentDirectory();"/"===i?(this.$el.find("#emptycontent").toggleClass("hidden",!this.isEmpty),this.$el.find("#filestable thead th").toggleClass("hidden",this.isEmpty),this.$el.find("#emptycontent").html('<div class="nav-icon-templaterepo"></div><h2>'+t("templaterepo","No Template Repo")+"</h2>")):e.Files.FileList.prototype.updateEmptyContent.apply(this,arguments)},getDirectoryPermissions:function(){return OC.PERMISSION_READ|OC.PERMISSION_DELETE},updateStorageStatistics:function(){},reload:function(){this.showMask(),this._reloadCall&&this._reloadCall.abort(),this._setCurrentDir("/",!1),this._reloadCall=$.ajax({url:OC.generateUrl("/apps/templaterepo/folderlist"),type:"GET",dataType:"json"});var e=this.reloadCallback.bind(this);return this._reloadCall.then(e,e)},reloadCallback:function(e){return delete this._reloadCall,this.hideMask(),!!e.files&&(this.setFiles(e.files.sort(this._sortComparator)),!0)}}),e.Files.TemplateRepoFileList=i}}(OCA)}))},7:function(e,t,i){"use strict";i.d(t,"a",(function(){return r}));var n=i(1);function a(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}
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
var r=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,i,r;return t=e,(i=[{key:"fromProperties",value:function(e){this.mappingType=e[n.a.PROPERTY_ACL_MAPPING_TYPE],this.mappingId=e[n.a.PROPERTY_ACL_MAPPING_ID],this.mask=e[n.a.PROPERTY_ACL_MASK],this.permissions=e[n.a.PROPERTY_ACL_PERMISSIONS]}},{key:"fromValues",value:function(e,t,i){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:31,r=arguments.length>5&&void 0!==arguments[5]&&arguments[5];this.mappingType=e,this.mappingId=t,this.mappingDisplayName=i,this.mask=n,this.permissions=a,this.inherited=r}},{key:"getProperties",value:function(){var e={};return e[n.a.PROPERTY_ACL_MAPPING_TYPE]=this.mappingType,e[n.a.PROPERTY_ACL_MAPPING_ID]=this.mappingId,e[n.a.PROPERTY_ACL_MASK]=this.mask,e[n.a.PROPERTY_ACL_PERMISSIONS]=this.permissions,e}},{key:"getUniqueMappingIdentifier",value:function(){return this.mappingType+":"+this.mappingId}},{key:"clone",value:function(){var t=this,i=new e;return Object.getOwnPropertyNames(this).forEach((function(e){i[e]=t[e]})),i}}])&&a(t.prototype,i),r&&a(t,r),e}()}})}));
//# sourceMappingURL=files.js.map