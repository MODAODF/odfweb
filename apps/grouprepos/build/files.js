!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var i=t();for(var n in i)("object"==typeof exports?exports:e)[n]=i[n]}}(window,(function(){return function(e){function t(t){for(var i,r,o=t[0],s=t[1],a=0,l=[];a<o.length;a++)r=o[a],Object.prototype.hasOwnProperty.call(n,r)&&n[r]&&l.push(n[r][0]),n[r]=0;for(i in s)Object.prototype.hasOwnProperty.call(s,i)&&(e[i]=s[i]);for(p&&p(t);l.length;)l.shift()()}var i={},n={0:0};function r(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.e=function(e){var t=[],i=n[e];if(0!==i)if(i)t.push(i[2]);else{var o=new Promise((function(t,r){i=n[e]=[t,r]}));t.push(i[2]=o);var s,a=document.createElement("script");a.charset="utf-8",a.timeout=120,r.nc&&a.setAttribute("nonce",r.nc),a.src=function(e){return r.p+""+({2:"sharing",3:"vendors~sharing"}[e]||e)+".js"}(e);var p=new Error;s=function(t){a.onerror=a.onload=null,clearTimeout(l);var i=n[e];if(0!==i){if(i){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;p.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",p.name="ChunkLoadError",p.type=r,p.request=o,i[1](p)}n[e]=void 0}};var l=setTimeout((function(){s({type:"timeout",target:a})}),12e4);a.onerror=a.onload=s,document.head.appendChild(a)}return Promise.all(t)},r.m=e,r.c=i,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(i,n,function(t){return e[t]}.bind(null,n));return i},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r.oe=function(e){throw console.error(e),e};var o=window.webpackJsonpGroupRepos=window.webpackJsonpGroupRepos||[],s=o.push.bind(o);o.push=t,o=o.slice();for(var a=0;a<o.length;a++)t(o[a]);var p=s;return r(r.s=31)}({1:function(e,t,i){"use strict";
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
 */var n={PROPERTY_ACL_LIST:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-list",PROPERTY_ACL_ENTRY:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl",PROPERTY_ACL_MAPPING_TYPE:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-mapping-type",PROPERTY_ACL_MAPPING_ID:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-mapping-id",PROPERTY_ACL_MASK:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-mask",PROPERTY_ACL_PERMISSIONS:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-permissions",PROPERTY_ACL_ENABLED:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-enabled",PROPERTY_ACL_CAN_MANAGE:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-can-manage",PROPERTY_INHERITED_ACL_LIST:"{"+OC.Files.Client.NS_NEXTCLOUD+"}inherited-acl-list",GROUP_FOLDER_ID:"{"+OC.Files.Client.NS_NEXTCLOUD+"}group-folder-id"};t.a=n},12:function(e,t,i){"use strict";var n,r=i(1),o=i(7);function s(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}
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
 */var p=function(e){for(var t=[],i=0;i<e.length;i++){var n={mask:0,permissions:0};for(var r in e[i].children){var o=e[i].children[r];if(o.nodeName)switch(o.nodeName.split(":")[1]||""){case"acl-mapping-id":n.mappingId=o.textContent||o.text;break;case"acl-mapping-type":n.mappingType=o.textContent||o.text;break;case"acl-mapping-display-name":n.mappingDisplayName=o.textContent||o.text;break;case"acl-mask":n.mask=parseInt(o.textContent||o.text,10);break;case"acl-permissions":n.permissions=parseInt(o.textContent||o.text,10)}}t.push(n)}return t},l={attach:function(e){(n=e.filesClient).addFileInfoParser((function(e){var t={},i=e.propStat[0].properties,n=i[r.a.GROUP_FOLDER_ID];void 0!==n&&(t.groupRepoId=n);var o=i[r.a.PROPERTY_ACL_ENABLED];void 0!==o&&(t.aclEnabled=!!o);var s=i[r.a.PROPERTY_ACL_CAN_MANAGE];void 0!==s&&(t.aclCanManage=!!s);var a=i[r.a.PROPERTY_ACL_LIST]||[],l=i[r.a.PROPERTY_INHERITED_ACL_LIST]||[];return t.acl=p(a),t.inheritedAcls=p(l),t.acl.map((function(e){var i=t.inheritedAcls.find((function(t){return t.mappingType===e.mappingType&&t.mappingId===e.mappingId}));return i&&(e.permissions=e.permissions&e.mask|i.permissions&~e.mask),e})),t})),function(e){e._client.getPropertyBody=function(e,t){var i,n=this.parseClarkNotation(e);if(i=this.xmlNamespaces[n.namespace]?this.xmlNamespaces[n.namespace]+":"+n.name:"x:"+n.name+' xmlns:x="'+n.namespace+'"',Array.isArray(t)){var r="";for(var o in t)t[o].hasOwnProperty("type")&&t[o].hasOwnProperty("data")?r+=this.getPropertyBody(t[o].type,t[o].data):r+=this.getPropertyBody(o,t[o]);return"      <"+i+">"+r+"</"+i+">"}if("object"===a(t)){var s="";if(t.hasOwnProperty("type")&&t.hasOwnProperty("data"))return this.getPropertyBody(t.type,t.data);for(var p in t)s+=this.getPropertyBody(p,t[p]);return"      <"+i+">"+s+"</"+i+">"}return"d:resourcetype"!==i&&(t=dav._escapeXml(""+t)),"      <"+i+">"+t+"</"+i+">"},e._client._renderPropSet=function(e){var t="  <d:set>\n   <d:prop>\n";for(var i in e)e.hasOwnProperty(i)&&(t+=this.getPropertyBody(i,e[i]));return t+="    </d:prop>\n",t+="  </d:set>\n"}}(n)}};!function(e){_.extend(e.Files.Client,r.a)}(window.OC),OC.Plugins.register("OCA.Files.FileList",l);var u=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,i,a;return t=e,(i=[{key:"propFind",value:function(e){return n.getFileInfo(e.path+"/"+e.name,{properties:[r.a.PROPERTY_ACL_LIST,r.a.PROPERTY_INHERITED_ACL_LIST,r.a.GROUP_FOLDER_ID,r.a.PROPERTY_ACL_ENABLED,r.a.PROPERTY_ACL_CAN_MANAGE]}).then((function(e,t){if(t){var i={},n={};for(var r in t.acl){var s=new o.a;s.fromValues(t.acl[r].mappingType,t.acl[r].mappingId,t.acl[r].mappingDisplayName,t.acl[r].mask,t.acl[r].permissions),i[s.getUniqueMappingIdentifier()]=s}for(var a in t.inheritedAcls){var p=new o.a;p.fromValues(t.inheritedAcls[a].mappingType,t.inheritedAcls[a].mappingId,t.inheritedAcls[a].mappingDisplayName,t.inheritedAcls[a].mask,t.inheritedAcls[a].permissions,!0);var l=p.getUniqueMappingIdentifier();n[l]=p,null==i[l]&&(i[l]=p)}return{acls:Object.values(i),inheritedAclsById:n,aclEnabled:t.aclEnabled,aclCanManage:t.aclCanManage,groupRepoId:t.groupRepoId}}return null}))}},{key:"propPatch",value:function(e,t){var i=[];for(var o in t)i.push({type:r.a.PROPERTY_ACL_ENTRY,data:t[o].getProperties()});var s={};return s[r.a.PROPERTY_ACL_LIST]=i,n._client.propPatch(n._client.baseUrl+e.path+"/"+e.name,s)}}])&&s(t.prototype,i),a&&s(t,a),e}();t.a=new u},31:function(e,t,i){i(32),i(33),e.exports=i(34)},32:function(e,t,i){"use strict";i.r(t);i(12);
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
 */i.nc=btoa(OC.requestToken),i.p=OC.linkTo("grouprepos","build/"),function(e,t){e.Plugins.register("OCA.Files.App",{attach:function(){t.Theming?e.MimeType._mimeTypeIcons["dir-grouprepos"]=e.generateUrl("/apps/theming/img/grouprepos/folder-group.svg?v="+t.Theming.cacheBuster):e.MimeType._mimeTypeIcons["dir-grouprepos"]=e.imagePath("grouprepos","folder-group")}})}(OC,OCA),window.addEventListener("DOMContentLoaded",(function(){Promise.all([i.e(3),i.e(2)]).then(i.bind(null,36)).then((function(e){OCA.Sharing.ShareTabSections.registerSection((function(t,i){if("group"===i.mountType)return e.default}))}))}))},33:function(e,i){$(document).ready((function(){!function(e){if(e.Files.FileList){var i=function(e,t){this.initialize(e,t)};i.prototype=_.extend({},e.Files.FileList.prototype,{id:"groupreposslist",appName:t("files","GroupRepos"),_clientSideSort:!0,_allowSelection:!1,initialize:function(t,i){e.Files.FileList.prototype.initialize.apply(this,arguments),this.initialized||OC.Plugins.attach("OCA.Files.GroupRepossFileList",this)},updateEmptyContent:function(){var i=this.getCurrentDirectory();"/"===i?(this.$el.find("#emptycontent").toggleClass("hidden",!this.isEmpty),this.$el.find("#filestable thead th").toggleClass("hidden",this.isEmpty),this.$el.find("#emptycontent").html('<div class="nav-icon-grouprepos"></div><h2>'+t("grouprepos","No Group Repo")+"</h2>")):e.Files.FileList.prototype.updateEmptyContent.apply(this,arguments)},getDirectoryPermissions:function(){return OC.PERMISSION_READ|OC.PERMISSION_DELETE},updateStorageStatistics:function(){},reload:function(){this.showMask(),this._reloadCall&&this._reloadCall.abort(),this._setCurrentDir("/",!1),this._reloadCall=$.ajax({url:OC.generateUrl("/apps/grouprepos/folderlist"),type:"GET",dataType:"json"});var e=this.reloadCallback.bind(this);return this._reloadCall.then(e,e)},reloadCallback:function(e){return delete this._reloadCall,this.hideMask(),!!e.files&&(this.setFiles(e.files.sort(this._sortComparator)),!0)}}),e.Files.GroupRepossFileList=i}}(OCA)}))},34:function(e,t){!function(e){e.Files.GroupRepossPlugin={name:"GroupRepos",grouprepossFileList:null,attach:function(){var e=this;$("#app-content-groupreposslist").on("show.plugin-grouprepos",(function(t){e.showFileList($(t.target))})),$("#app-content-groupreposslist").on("hide.plugin-grouprepos",(function(){e.hideFileList()}))},detach:function(){this.grouprepossFileList&&(this.grouprepossFileList.destroy(),e.Files.fileActions.off("setDefault.plugin-grouprepos",this._onActionsUpdated),e.Files.fileActions.off("registerAction.plugin-grouprepos",this._onActionsUpdated),$("#app-content-groupreposslist").off(".plugin-grouprepos"),this.grouprepossFileList=null)},showFileList:function(e){return this.grouprepossFileList||(this.grouprepossFileList=this._createGroupRepossFileList(e)),this.grouprepossFileList},hideFileList:function(){this.grouprepossFileList&&this.grouprepossFileList.$fileList.empty()},_createGroupRepossFileList:function(t){var i=this._createFileActions();return new e.Files.GroupRepossFileList(t,{fileActions:i,shown:!0})},_createFileActions:function(){var t=new e.Files.FileActions;return t.registerDefaultActions(),t.merge(e.Files.fileActions),this._globalActionsInitialized||(this._onActionsUpdated=_.bind(this._onActionsUpdated,this),e.Files.fileActions.on("setDefault.plugin-grouprepos",this._onActionsUpdated),e.Files.fileActions.on("registerAction.plugin-grouprepos",this._onActionsUpdated),this._globalActionsInitialized=!0),t.register("dir","Open",OC.PERMISSION_READ,"",(function(t,i){e.Files.App.setActiveView("files",{silent:!0}),e.Files.App.fileList.changeDirectory(OC.joinPaths(i.$file.attr("data-path"),t),!0,!0)})),t.setDefault("dir","Open"),t},_onActionsUpdated:function(e){e.action?this.grouprepossFileList.fileActions.registerAction(e.action):e.defaultAction&&this.grouprepossFileList.fileActions.setDefault(e.defaultAction.mime,e.defaultAction.name)}}}(OCA),OC.Plugins.register("OCA.Files.App",OCA.Files.GroupRepossPlugin)},7:function(e,t,i){"use strict";i.d(t,"a",(function(){return o}));var n=i(1);function r(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}
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
var o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,i,o;return t=e,(i=[{key:"fromProperties",value:function(e){this.mappingType=e[n.a.PROPERTY_ACL_MAPPING_TYPE],this.mappingId=e[n.a.PROPERTY_ACL_MAPPING_ID],this.mask=e[n.a.PROPERTY_ACL_MASK],this.permissions=e[n.a.PROPERTY_ACL_PERMISSIONS]}},{key:"fromValues",value:function(e,t,i){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:31,o=arguments.length>5&&void 0!==arguments[5]&&arguments[5];this.mappingType=e,this.mappingId=t,this.mappingDisplayName=i,this.mask=n,this.permissions=r,this.inherited=o}},{key:"getProperties",value:function(){var e={};return e[n.a.PROPERTY_ACL_MAPPING_TYPE]=this.mappingType,e[n.a.PROPERTY_ACL_MAPPING_ID]=this.mappingId,e[n.a.PROPERTY_ACL_MASK]=this.mask,e[n.a.PROPERTY_ACL_PERMISSIONS]=this.permissions,e}},{key:"getUniqueMappingIdentifier",value:function(){return this.mappingType+":"+this.mappingId}},{key:"clone",value:function(){var t=this,i=new e;return Object.getOwnPropertyNames(this).forEach((function(e){i[e]=t[e]})),i}}])&&r(t.prototype,i),o&&r(t,o),e}()}})}));
//# sourceMappingURL=files.js.map