(window.webpackJsonpMergeODF=window.webpackJsonpMergeODF||[]).push([[2],{35:function(e,i,a){"use strict";a.r(i);var o=a(38),r=a(52),s=a.n(r),l=a(50),c={INHERIT_DENY:0,INHERIT_ALLOW:1,SELF_DENY:2,SELF_ALLOW:3},d={name:"AclStateButton",components:{PopoverMenu:l.PopoverMenu},props:{inherited:{type:Boolean,default:!1},state:{type:Number,default:c.INHERIT_DENY},readOnly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},methods:{popoverClose:function(){this.open=!1}},computed:{isAllowed:function(){return 1&this.state}},data:function(){var e=this;return{STATES:c,open:!1,menu:[{icon:"icon-history",text:t("mergeodf","Inherit permission"),active:this.state===c.INHERIT_ALLOW||this.state===c.INHERIT_DENY,action:function(){e.$emit("update",c.INHERIT_ALLOW),e.popoverClose()}},{icon:"icon-close",text:t("mergeodf","Deny"),active:this.state===c.SELF_DENY,action:function(){e.$emit("update",c.SELF_DENY),e.popoverClose()}},{icon:"icon-history",text:t("mergeodf","Allow"),active:this.state===c.SELF_ALLOW,action:function(){e.$emit("update",c.SELF_ALLOW),e.popoverClose()}}]}}},p=(a(72),a(51)),u=Object(p.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.readOnly?n("div",[t.isAllowed?n("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("mergeodf","Allowed"),expression:"t('mergeodf', 'Allowed')"}],staticClass:"icon-checkmark"}):n("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("mergeodf","Denied"),expression:"t('mergeodf', 'Denied')"}],staticClass:"icon-deny"})]):n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.popoverClose,expression:"popoverClose"}],staticStyle:{position:"relative"}},[t.state===t.STATES.INHERIT_DENY?n("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("mergeodf","Denied (Inherited permission)"),expression:"t('mergeodf', 'Denied (Inherited permission)')"}],staticClass:"icon-deny inherited",attrs:{disabled:t.disabled},on:{click:function(e){t.open=!0}}}):t.state===t.STATES.INHERIT_ALLOW?n("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("mergeodf","Allowed (Inherited permission)"),expression:"t('mergeodf', 'Allowed (Inherited permission)')"}],staticClass:"icon-checkmark inherited",attrs:{disabled:t.disabled},on:{click:function(e){t.open=!0}}}):t.state===t.STATES.SELF_DENY?n("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("mergeodf","Denied"),expression:"t('mergeodf', 'Denied')"}],class:"icon-deny"+(t.inherited?" inherited":""),attrs:{disabled:t.disabled},on:{click:function(e){t.open=!0}}}):t.state===t.STATES.SELF_ALLOW?n("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("mergeodf","Allowed"),expression:"t('mergeodf', 'Allowed')"}],class:"icon-checkmark"+(t.inherited?" inherited":""),attrs:{disabled:t.disabled},on:{click:function(e){t.open=!0}}}):t._e(),t._v(" "),n("div",{staticClass:"popovermenu",class:{open:t.open}},[n("PopoverMenu",{attrs:{menu:t.menu}})],1)])}),[],!1,null,"3eca1ce3",null).exports,m={PROPERTY_ACL_LIST:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-list",PROPERTY_ACL_ENTRY:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl",PROPERTY_ACL_MAPPING_TYPE:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-mapping-type",PROPERTY_ACL_MAPPING_ID:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-mapping-id",PROPERTY_ACL_MASK:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-mask",PROPERTY_ACL_PERMISSIONS:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-permissions",PROPERTY_ACL_ENABLED:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-enabled",PROPERTY_ACL_CAN_MANAGE:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-can-manage",PROPERTY_INHERITED_ACL_LIST:"{"+OC.Files.Client.NS_NEXTCLOUD+"}inherited-acl-list",GROUP_FOLDER_ID:"{"+OC.Files.Client.NS_NEXTCLOUD+"}template-repo-id"};function g(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}
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
var I=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n,i;return e=t,(n=[{key:"fromProperties",value:function(t){this.mappingType=t[m.PROPERTY_ACL_MAPPING_TYPE],this.mappingId=t[m.PROPERTY_ACL_MAPPING_ID],this.mask=t[m.PROPERTY_ACL_MASK],this.permissions=t[m.PROPERTY_ACL_PERMISSIONS]}},{key:"fromValues",value:function(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:31,o=arguments.length>5&&void 0!==arguments[5]&&arguments[5];this.mappingType=t,this.mappingId=e,this.mappingDisplayName=n,this.mask=i,this.permissions=a,this.inherited=o}},{key:"getProperties",value:function(){var t={};return t[m.PROPERTY_ACL_MAPPING_TYPE]=this.mappingType,t[m.PROPERTY_ACL_MAPPING_ID]=this.mappingId,t[m.PROPERTY_ACL_MASK]=this.mask,t[m.PROPERTY_ACL_PERMISSIONS]=this.permissions,t}},{key:"getUniqueMappingIdentifier",value:function(){return this.mappingType+":"+this.mappingId}},{key:"clone",value:function(){var e=this,n=new t;return Object.getOwnPropertyNames(this).forEach((function(t){n[t]=e[t]})),n}}])&&g(e.prototype,n),i&&g(e,i),t}(),v={toString:function(t){return(t>>>0).toString(2).padStart(8,"0")},firstHigh:function(t){for(var e=0;0!==t;){if(!0&t)return e;e++,t>>=1}return 0},test:function(t,e){return(t>>e)%2!=0},set:function(t,e){return t|1<<e},clear:function(t,e){return t&~(1<<e)},toggle:function(t,e){return this.test(t,e)?this.clear(t,e):this.set(t,e)}};
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
 */function C(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function h(t){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}
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
 */_.extend(OC.Files.Client,m);var f=function(t){for(var e=[],n=0;n<t.length;n++){var i={mask:0,permissions:0};for(var a in t[n].children){var o=t[n].children[a];if(o.nodeName)switch(o.nodeName.split(":")[1]||""){case"acl-mapping-id":i.mappingId=o.textContent||o.text;break;case"acl-mapping-type":i.mappingType=o.textContent||o.text;break;case"acl-mapping-display-name":i.mappingDisplayName=o.textContent||o.text;break;case"acl-mask":i.mask=parseInt(o.textContent||o.text,10);break;case"acl-permissions":i.permissions=parseInt(o.textContent||o.text,10)}}e.push(i)}return e},A=OCA.Files.App.fileList.filesClient;A.addFileInfoParser((function(t){var e={},n=t.propStat[0].properties,i=n[m.GROUP_FOLDER_ID];void 0!==i&&(e.mergeODFId=i);var a=n[m.PROPERTY_ACL_ENABLED];void 0!==a&&(e.aclEnabled=!!a);var o=n[m.PROPERTY_ACL_CAN_MANAGE];void 0!==o&&(e.aclCanManage=!!o);var r=n[m.PROPERTY_ACL_LIST],s=n[m.PROPERTY_INHERITED_ACL_LIST];return _.isUndefined(r)||(e.acl=f(r),e.inheritedAcls=f(s),e.acl.map((function(t){var n=e.inheritedAcls.find((function(e){return e.mappingType===t.mappingType&&e.mappingId===t.mappingId}));return n&&(t.permissions=t.permissions&t.mask|n.permissions&~t.mask),t}))),e})),function(t){t._client.getPropertyBody=function(t,e){var n,i=this.parseClarkNotation(t);if(n=this.xmlNamespaces[i.namespace]?this.xmlNamespaces[i.namespace]+":"+i.name:"x:"+i.name+' xmlns:x="'+i.namespace+'"',Array.isArray(e)){var a="";for(var o in e)e[o].hasOwnProperty("type")&&e[o].hasOwnProperty("data")?a+=this.getPropertyBody(e[o].type,e[o].data):a+=this.getPropertyBody(o,e[o]);return"      <"+n+">"+a+"</"+n+">"}if("object"===h(e)){a="";if(e.hasOwnProperty("type")&&e.hasOwnProperty("data"))return this.getPropertyBody(e.type,e.data);for(var o in e)a+=this.getPropertyBody(o,e[o]);return"      <"+n+">"+a+"</"+n+">"}return"d:resourcetype"!==n&&(e=dav._escapeXml(""+e)),"      <"+n+">"+e+"</"+n+">"},t._client._renderPropSet=function(t){var e="  <d:set>\n   <d:prop>\n";for(var n in t)t.hasOwnProperty(n)&&(e+=this.getPropertyBody(n,t[n]));return e+="    </d:prop>\n",e+="  </d:set>\n"}}(A);var b=new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n,i;return e=t,(n=[{key:"propFind",value:function(t){return A.getFileInfo(t.path+"/"+t.name,{properties:[m.PROPERTY_ACL_LIST,m.PROPERTY_INHERITED_ACL_LIST,m.GROUP_FOLDER_ID,m.PROPERTY_ACL_ENABLED,m.PROPERTY_ACL_CAN_MANAGE]}).then((function(t,e){if(e){var n={},i={};for(var a in e.acl){var o=new I;o.fromValues(e.acl[a].mappingType,e.acl[a].mappingId,e.acl[a].mappingDisplayName,e.acl[a].mask,e.acl[a].permissions),n[o.getUniqueMappingIdentifier()]=o}for(var r in e.inheritedAcls){var s=new I;s.fromValues(e.inheritedAcls[r].mappingType,e.inheritedAcls[r].mappingId,e.inheritedAcls[r].mappingDisplayName,e.inheritedAcls[r].mask,e.inheritedAcls[r].permissions,!0);var l=s.getUniqueMappingIdentifier();i[l]=s,null==n[l]&&(n[l]=s)}return{acls:Object.values(n),inheritedAclsById:i,aclEnabled:e.aclEnabled,aclCanManage:e.aclCanManage,mergeODFId:e.mergeODFId}}return null}))}},{key:"propPatch",value:function(t,e){var n=[];for(var i in e)n.push({type:m.PROPERTY_ACL_ENTRY,data:e[i].getProperties()});var a={};return a[OC.Files.Client.PROPERTY_ACL_LIST]=n,A._client.propPatch(A._client.baseUrl+t.path+"/"+t.name,a)}}])&&C(e.prototype,n),i&&C(e,i),t}());function y(t){return function(t){if(Array.isArray(t))return O(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return O(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return O(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function O(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}var N={name:"SharingSidebarView",props:["fileModel"],components:{Avatar:l.Avatar,Multiselect:l.Multiselect,AclStateButton:u},beforeMount:function(){var t=this;this.loading=!0,this.model=JSON.parse(JSON.stringify(this.fileModel)),b.propFind(this.model).then((function(e){e.acls&&(t.list=e.acls),t.inheritedAclsById=e.inheritedAclsById,t.aclEnabled=e.aclEnabled,t.aclCanManage=e.aclCanManage,t.mergeODFId=e.mergeODFId,t.loading=!1,t.searchMappings("")}))},data:function(){return{aclEnabled:!1,aclCanManage:!1,showAclCreate:!1,mergeODFId:null,loading:!1,options:[],value:null,model:null,list:[]}},computed:{isAdmin:function(){return this.aclCanManage},isInherited:function(){return function(t,e,n){return 0==(t&~n)}},isAllowed:function(){return function(t,e){return(t&e)>0}},getState:function(){var t=this;return function(e,n,i){return t.isInherited(e,n,i)<<1|t.isAllowed(e,n)}}},methods:{searchMappings:function(t){var e=this;s.a.get(OC.generateUrl("apps/mergeodf/folders/".concat(this.mergeODFId,"/search"))+"?format=json&search="+t).then((function(t){var n=t.data.ocs.data.groups.map((function(t){return{unique:"group:"+t.gid,type:"group",id:t.gid,displayname:t.displayname}})),i=Object.values(t.data.ocs.data.users).map((function(t){return{unique:"user:"+t.uid,type:"user",id:t.uid,displayname:t.displayname}}));e.options=[].concat(y(n),y(i)).filter((function(t){return!e.list.find((function(e){return t.unique===e.getUniqueMappingIdentifier()}))}))}))},toggleAclCreate:function(){var t=this;this.showAclCreate=!this.showAclCreate,o.default.nextTick((function(){t.$refs.select.$el.focus()}))},createAcl:function(t){var e=this,n=new I;n.fromValues(t.type,t.id,t.displayname,0,31),this.list.push(n),b.propPatch(this.model,this.list).then((function(){e.showAclCreate=!1}))},removeAcl:function(t){var e=this,n=this.list.indexOf(t),i=this.list.concat([]);n>-1&&i.splice(n,1),b.propPatch(this.model,i).then((function(){e.list.splice(n,1);var i=e.inheritedAclsById[t.getUniqueMappingIdentifier()];null!=i&&e.list.splice(n,0,i)}))},changePermission:function(t,e,n){var i=this.list.indexOf(t),a=n<2,r=1==(1&n),s=v.firstHigh(e);t=t.clone(),a?t.mask=v.clear(t.mask,s):(t.mask=v.set(t.mask,s),t.permissions=r?v.set(t.permissions,s):v.clear(t.permissions,s)),t.inherited=!1,o.default.set(this.list,i,t),b.propPatch(this.model,this.list).then((function(){}))}}},S=(a(75),Object(p.a)(N,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.aclEnabled&&!t.loading?n("div",{attrs:{id:"mergeodf-acl-container"}},[t._m(0),t._v(" "),n("table",[n("thead",[n("tr",[n("th"),t._v(" "),n("th",[t._v(t._s(t.t("mergeodf","MergeODF")))]),t._v(" "),n("th",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("mergeodf","Read"),expression:"t('mergeodf', 'Read')"}],staticClass:"state-column"},[t._v(t._s(t.t("mergeodf","Read")))]),t._v(" "),n("th",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("mergeodf","Write"),expression:"t('mergeodf', 'Write')"}],staticClass:"state-column"},[t._v(t._s(t.t("mergeodf","Write")))]),t._v(" "),"dir"===t.model.type?n("th",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("mergeodf","Create"),expression:"t('mergeodf', 'Create')"}],staticClass:"state-column"},[t._v(t._s(t.t("mergeodf","Create"))+"\n\t\t\t")]):t._e(),t._v(" "),n("th",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("mergeodf","Delete"),expression:"t('mergeodf', 'Delete')"}],staticClass:"state-column"},[t._v(t._s(t.t("mergeodf","Delete")))]),t._v(" "),n("th",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("mergeodf","Share"),expression:"t('mergeodf', 'Share')"}],staticClass:"state-column"},[t._v(t._s(t.t("mergeodf","Share")))]),t._v(" "),n("th",{staticClass:"state-column"})])]),t._v(" "),n("tbody",[t.isAdmin?t._e():n("tr",[n("td",[n("avatar",{attrs:{user:"admin",size:24}})],1),t._v(" "),n("td",{staticClass:"username"},[t._v(t._s(t.t("mergeodf","You")))]),t._v(" "),n("td",{staticClass:"state-column"},[n("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_READ,t.model.permissions,1),"read-only":!0}})],1),t._v(" "),n("td",{staticClass:"state-column"},[n("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_UPDATE,t.model.permissions,1),"read-only":!0}})],1),t._v(" "),"dir"===t.model.type?n("td",{staticClass:"state-column"},[n("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_CREATE,t.model.permissions,1),"read-only":!0}})],1):t._e(),t._v(" "),n("td",{staticClass:"state-column"},[n("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_DELETE,t.model.permissions,1),"read-only":!0}})],1),t._v(" "),n("td",{staticClass:"state-column"},[n("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_SHARE,t.model.permissions,1),"read-only":!0}})],1)]),t._v(" "),t._l(t.list,(function(e){return t.isAdmin?n("tr",[n("td",[n("avatar",{attrs:{user:e.mappingId,size:24}})],1),t._v(" "),n("td",{staticClass:"username"},[t._v("\n\t\t\t\t"+t._s(e.mappingDisplayName)+"\n\t\t\t\t"),"group"===e.mappingType?n("span",[t._v(" "+t._s(t.t("mergeodf","(Group)")))]):t._e()]),t._v(" "),n("td",{staticClass:"state-column"},[n("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_READ,e.permissions,e.mask),inherited:e.inherited,disabled:t.loading},on:{update:function(n){return t.changePermission(e,t.OC.PERMISSION_READ,n)}}})],1),t._v(" "),n("td",{staticClass:"state-column"},[n("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_UPDATE,e.permissions,e.mask),inherited:e.inherited,disabled:t.loading},on:{update:function(n){return t.changePermission(e,t.OC.PERMISSION_UPDATE,n)}}})],1),t._v(" "),"dir"===t.model.type?n("td",{staticClass:"state-column"},[n("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_CREATE,e.permissions,e.mask),inherited:e.inherited,disabled:t.loading},on:{update:function(n){return t.changePermission(e,t.OC.PERMISSION_CREATE,n)}}})],1):t._e(),t._v(" "),n("td",{staticClass:"state-column"},[n("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_DELETE,e.permissions,e.mask),inherited:e.inherited,disabled:t.loading},on:{update:function(n){return t.changePermission(e,t.OC.PERMISSION_DELETE,n)}}})],1),t._v(" "),n("td",{staticClass:"state-column"},[n("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_SHARE,e.permissions,e.mask),inherited:e.inherited,disabled:t.loading},on:{update:function(n){return t.changePermission(e,t.OC.PERMISSION_SHARE,n)}}})],1),t._v(" "),n("td",{staticClass:"state-column"},[!1===e.inherited?n("a",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("mergeodf","Remove access rule"),expression:"t('mergeodf', 'Remove access rule')"}],staticClass:"icon-close",on:{click:function(n){return t.removeAcl(e)}}}):t._e()])]):t._e()}))],2)]),t._v(" "),!t.isAdmin||t.loading||t.showAclCreate?t._e():n("button",{on:{click:t.toggleAclCreate}},[n("span",{staticClass:"icon-add"}),t._v(" "+t._s(t.t("mergeodf","Add advanced permission rule"))+"\n\t")]),t._v(" "),t.isAdmin&&!t.loading?n("multiselect",{directives:[{name:"show",rawName:"v-show",value:t.showAclCreate,expression:"showAclCreate"}],ref:"select",attrs:{options:t.options,"reset-after":!0,"internal-search":!1,placeholder:t.t("mergeodf","Select a user or group"),"track-by":"unique"},on:{select:t.createAcl,"search-change":t.searchMappings},scopedSlots:t._u([{key:"singleLabel",fn:function(e){return[n("avatar",{attrs:{user:e.option.id,isNoUser:"user"!==e.option.type}}),t._v("\n\t\t\t"+t._s(e.option.displayname)+"\n\t\t\t"),"group"===e.option.type?n("span",[t._v(t._s(t.t("mergeodf","(Group)")))]):t._e()]}},{key:"option",fn:function(e){return[n("avatar",{attrs:{user:e.option.id,isNoUser:"user"!==e.option.type}}),t._v("\n\t\t\t"+t._s(e.option.displayname)+"\n\t\t\t"),"group"===e.option.type?n("span",[t._v(t._s(t.t("mergeodf","(Group)")))]):t._e()]}}],null,!1,3677846614),model:{value:t.value,callback:function(e){t.value=e},expression:"value"}}):t._e()],1):t._e()}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"mergeodf-entry"},[e("div",{staticClass:"avatar icon-group-white"}),this._v(" "),e("span",{staticClass:"username"})])}],!1,null,"2b698680",null).exports),E=a(77),P=a(80),R=a.n(P);
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
o.default.prototype.t=t,o.default.prototype.n=n,o.default.prototype.OC=OC,o.default.prototype.OCA=OCA,o.default.use(E.a),o.default.directive("ClickOutside",R.a);var T=o.default.extend(S);i.default=T},39:function(t,e,n){var i=n(73);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(4).default)("1ba25cf2",i,!0,{})},40:function(t,e,n){var i=n(76);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(4).default)("8ff1aeaa",i,!0,{})},72:function(t,e,n){"use strict";var i=n(39);n.n(i).a},73:function(t,e,n){var i=n(3),a=n(9),o=n(74);e=i(!1);var r=a(o);e.push([t.i,"\n.popovermenu[data-v-3eca1ce3] {\n\ttop: 38px;\n\tright: -5px;\n}\nbutton[data-v-3eca1ce3] {\n\theight: 24px;\n\tborder-color: transparent;\n}\nbutton[data-v-3eca1ce3]:hover {\n\theight: 24px;\n\tborder-color: #0082c9;\n\tborder-color: var(--color-primary, #0082c9);\n}\n.icon-deny[data-v-3eca1ce3] {\n\tbackground-image: url("+r+");\n}\n.inherited[data-v-3eca1ce3] {\n\topacity: 0.5;\n}\n",""]),t.exports=e},74:function(t,e,n){"use strict";n.r(e),e.default="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Ym94PSIwIDAgMTYgMTYiCiAgIHdpZHRoPSIxNiIKICAgaGVpZ2h0PSIxNiIKICAgaWQ9InN2ZzM3OTEiCiAgIHNvZGlwb2RpOmRvY25hbWU9ImRlbnkuc3ZnIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjQgNWRhNjg5YzMxMywgMjAxOS0wMS0xNCI+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMzc5NyI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGRlZnMKICAgICBpZD0iZGVmczM3OTUiIC8+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxIgogICAgIG9iamVjdHRvbGVyYW5jZT0iMTAiCiAgICAgZ3JpZHRvbGVyYW5jZT0iMTAiCiAgICAgZ3VpZGV0b2xlcmFuY2U9IjEwIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMTciCiAgICAgaWQ9Im5hbWVkdmlldzM3OTMiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOnpvb209IjE4LjI5NjM4OCIKICAgICBpbmtzY2FwZTpjeD0iLTEzLjE1NDI2NSIKICAgICBpbmtzY2FwZTpjeT0iMS45NTA1NzI1IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIyNiIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImczNzg5IiAvPgogIDxnCiAgICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgIHN0cm9rZT0iIzAwMCIKICAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgICAgZmlsbD0ibm9uZSIKICAgICBpZD0iZzM3ODkiPgogICAgPHBhdGgKICAgICAgIGQ9Ik0gMTEuNjc4MDgyLDQuNTI4MDY3OSA0LjU5MjQ1MDksMTEuNjEzNjk5IgogICAgICAgaWQ9InBhdGgzNzg3IgogICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgIHN0eWxlPSJzdHJva2Utd2lkdGg6MjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIgLz4KICAgIDxlbGxpcHNlCiAgICAgICBpZD0icGF0aDM5OTMiCiAgICAgICBjeD0iNy45OTk5OTk1IgogICAgICAgY3k9IjgiCiAgICAgICByeD0iNS45MDk2MzQ2IgogICAgICAgcnk9IjUuOTA5NjM1MSIKICAgICAgIHN0eWxlPSJzdHJva2Utd2lkdGg6MjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIgLz4KICA8L2c+Cjwvc3ZnPgo="},75:function(t,e,n){"use strict";var i=n(40);n.n(i).a},76:function(t,e,n){(e=n(3)(!1)).push([t.i,"\n#mergeodf-acl-container[data-v-2b698680] {\n\tmargin-bottom: 20px;\n}\n.mergeodf-entry[data-v-2b698680] {\n\theight: 44px;\n\twhite-space: normal;\n\tdisplay: -webkit-inline-box;\n\tdisplay: inline-flex;\n\t-webkit-box-align: center;\n\t        align-items: center;\n\tposition: relative;\n}\n.avatar.icon-group-white[data-v-2b698680] {\n\tdisplay: inline-block;\n\tbackground-color: #0082c9;\n\tbackground-color: var(--color-primary, #0082c9);\n\tpadding: 16px;\n}\n.mergeodf-entry .username[data-v-2b698680] {\n\tpadding: 0 8px;\n\toverflow: hidden;\n\twhite-space: nowrap;\n\ttext-overflow: ellipsis;\n}\ntable[data-v-2b698680] {\n\twidth: 100%;\n\tmargin-top: -44px;\n\tmargin-bottom: 5px;\n}\ntable td[data-v-2b698680], table th[data-v-2b698680] {\n\tpadding: 0\n}\nthead th[data-v-2b698680] {\n\theight: 44px;\n}\nthead th[data-v-2b698680]:first-child,\ntbody tr td[data-v-2b698680]:first-child {\n\twidth: 24px;\n\tpadding: 0;\n\tpadding-left: 4px;\n}\ntable .avatardiv[data-v-2b698680] {\n\tmargin-top: 6px;\n}\ntable thead th[data-v-2b698680]:nth-child(2),\ntable .username[data-v-2b698680] {\n\tpadding-left: 13px;\n\ttext-overflow: ellipsis;\n\toverflow: hidden;\n\tmax-width: 0;\n\tmin-width: 50px;\n}\n.state-column[data-v-2b698680] {\n\ttext-align: center;\n\twidth: 44px !important;\n\tpadding: 3px;\n}\nthead .state-column[data-v-2b698680] {\n\ttext-overflow: ellipsis;\n\toverflow: hidden;\n}\ntable button[data-v-2b698680] {\n\theight: 26px;\n\twidth: 24px !important;\n\tdisplay: block;\n\tborder-radius: 50%;\n\tmargin: auto;\n}\na.icon-close[data-v-2b698680] {\n\tdisplay: inline-block;\n\theight: 24px;\n\twidth: 100%;\n\tvertical-align: middle;\n\tbackground-size: 12px;\n\topacity: .7;\n\tfloat: right;\n}\na.icon-close[data-v-2b698680]:hover {\n\topacity: 1;\n}\n.multiselect[data-v-2b698680] {\n\tmargin-left: 44px;\n\twidth: calc(100% - 44px);\n}\n",""]),t.exports=e}}]);
//# sourceMappingURL=sharing.js.map