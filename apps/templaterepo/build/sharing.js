(window.webpackJsonpTemplateRepo=window.webpackJsonpTemplateRepo||[]).push([[2],{36:function(e,a,i){"use strict";i.r(a);var o=i(39),s=i(53),r=i.n(s),l=i(51),c={INHERIT_DENY:0,INHERIT_ALLOW:1,SELF_DENY:2,SELF_ALLOW:3},p={name:"AclStateButton",components:{PopoverMenu:l.PopoverMenu},props:{inherited:{type:Boolean,default:!1},state:{type:Number,default:c.INHERIT_DENY},readOnly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},methods:{popoverClose:function(){this.open=!1}},computed:{isAllowed:function(){return 1&this.state}},data:function(){var e=this;return{STATES:c,open:!1,menu:[{icon:"icon-history",text:t("templaterepo","Inherit permission"),active:this.state===c.INHERIT_ALLOW||this.state===c.INHERIT_DENY,action:function(){e.$emit("update",c.INHERIT_ALLOW),e.popoverClose()}},{icon:"icon-close",text:t("templaterepo","Deny"),active:this.state===c.SELF_DENY,action:function(){e.$emit("update",c.SELF_DENY),e.popoverClose()}},{icon:"icon-history",text:t("templaterepo","Allow"),active:this.state===c.SELF_ALLOW,action:function(){e.$emit("update",c.SELF_ALLOW),e.popoverClose()}}]}}},d=(i(73),i(52)),u=Object(d.a)(p,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.readOnly?a("div",[t.isAllowed?a("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("templaterepo","Allowed"),expression:"t('templaterepo', 'Allowed')"}],staticClass:"icon-checkmark"}):a("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("templaterepo","Denied"),expression:"t('templaterepo', 'Denied')"}],staticClass:"icon-deny"})]):a("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.popoverClose,expression:"popoverClose"}],staticStyle:{position:"relative"}},[t.state===t.STATES.INHERIT_DENY?a("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("templaterepo","Denied (Inherited permission)"),expression:"t('templaterepo', 'Denied (Inherited permission)')"}],staticClass:"icon-deny inherited",attrs:{disabled:t.disabled},on:{click:function(e){t.open=!0}}}):t.state===t.STATES.INHERIT_ALLOW?a("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("templaterepo","Allowed (Inherited permission)"),expression:"t('templaterepo', 'Allowed (Inherited permission)')"}],staticClass:"icon-checkmark inherited",attrs:{disabled:t.disabled},on:{click:function(e){t.open=!0}}}):t.state===t.STATES.SELF_DENY?a("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("templaterepo","Denied"),expression:"t('templaterepo', 'Denied')"}],class:"icon-deny"+(t.inherited?" inherited":""),attrs:{disabled:t.disabled},on:{click:function(e){t.open=!0}}}):t.state===t.STATES.SELF_ALLOW?a("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("templaterepo","Allowed"),expression:"t('templaterepo', 'Allowed')"}],class:"icon-checkmark"+(t.inherited?" inherited":""),attrs:{disabled:t.disabled},on:{click:function(e){t.open=!0}}}):t._e(),t._v(" "),a("div",{staticClass:"popovermenu",class:{open:t.open}},[a("PopoverMenu",{attrs:{menu:t.menu}})],1)])}),[],!1,null,"28dd8ee2",null).exports,m=i(7),g={toString:function(t){return(t>>>0).toString(2).padStart(8,"0")},firstHigh:function(t){for(var e=0;0!==t;){if(!0&t)return e;e++,t>>=1}return 0},test:function(t,e){return(t>>e)%2!=0},set:function(t,e){return t|1<<e},clear:function(t,e){return t&~(1<<e)},toggle:function(t,e){return this.test(t,e)?this.clear(t,e):this.set(t,e)}},I=i(12);function v(t){return function(t){if(Array.isArray(t))return h(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return h(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return h(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}var C={name:"SharingSidebarView",props:["fileInfo"],components:{Avatar:l.Avatar,Multiselect:l.Multiselect,AclStateButton:u},beforeMount:function(){var t=this;this.loading=!0,this.model=JSON.parse(JSON.stringify(this.fileInfo)),I.a.propFind(this.model).then((function(e){e.acls&&(t.list=e.acls),t.inheritedAclsById=e.inheritedAclsById,t.aclEnabled=e.aclEnabled,t.aclCanManage=e.aclCanManage,t.groupFolderId=e.groupFolderId,t.loading=!1,t.searchMappings("")}))},data:function(){return{aclEnabled:!1,aclCanManage:!1,showAclCreate:!1,groupFolderId:null,loading:!1,options:[],value:null,model:null,list:[]}},computed:{isAdmin:function(){return this.aclCanManage},isInherited:function(){return function(t,e,a){return 0==(t&~a)}},isAllowed:function(){return function(t,e){return(t&e)>0}},getState:function(){var t=this;return function(e,a,n){return t.isInherited(e,a,n)<<1|t.isAllowed(e,a)}}},methods:{searchMappings:function(t){var e=this;r.a.get(OC.generateUrl("apps/templaterepo/folders/".concat(this.groupFolderId,"/search"))+"?format=json&search="+t).then((function(t){var a=t.data.ocs.data.groups.map((function(t){return{unique:"group:"+t.gid,type:"group",id:t.gid,displayname:t.displayname}})),n=Object.values(t.data.ocs.data.users).map((function(t){return{unique:"user:"+t.uid,type:"user",id:t.uid,displayname:t.displayname}}));e.options=[].concat(v(a),v(n)).filter((function(t){return!e.list.find((function(e){return t.unique===e.getUniqueMappingIdentifier()}))}))}))},toggleAclCreate:function(){var t=this;this.showAclCreate=!this.showAclCreate,o.default.nextTick((function(){t.$refs.select.$el.focus()}))},createAcl:function(t){var e=this,a=new m.a;a.fromValues(t.type,t.id,t.displayname,0,31),this.list.push(a),I.a.propPatch(this.model,this.list).then((function(){e.showAclCreate=!1}))},removeAcl:function(t){var e=this,a=this.list.indexOf(t),n=this.list.concat([]);a>-1&&n.splice(a,1),I.a.propPatch(this.model,n).then((function(){e.list.splice(a,1);var n=e.inheritedAclsById[t.getUniqueMappingIdentifier()];null!=n&&e.list.splice(a,0,n)}))},changePermission:function(t,e,a){var n=this.list.indexOf(t),i=a<2,s=1==(1&a),r=g.firstHigh(e);t=t.clone(),i?t.mask=g.clear(t.mask,r):(t.mask=g.set(t.mask,r),t.permissions=s?g.set(t.permissions,r):g.clear(t.permissions,r)),t.inherited=!1,o.default.set(this.list,n,t),I.a.propPatch(this.model,this.list).then((function(){}))}}},A=(i(76),Object(d.a)(C,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.aclEnabled&&!t.loading?a("div",{attrs:{id:"templaterepo-acl-container"}},[t._m(0),t._v(" "),a("table",[a("thead",[a("tr",[a("th"),t._v(" "),a("th",[t._v(t._s(t.t("templaterepo","Groupfolder")))]),t._v(" "),a("th",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("templaterepo","Read"),expression:"t('templaterepo', 'Read')"}],staticClass:"state-column"},[t._v(t._s(t.t("templaterepo","Read")))]),t._v(" "),a("th",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("templaterepo","Write"),expression:"t('templaterepo', 'Write')"}],staticClass:"state-column"},[t._v(t._s(t.t("templaterepo","Write")))]),t._v(" "),"dir"===t.model.type?a("th",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("templaterepo","Create"),expression:"t('templaterepo', 'Create')"}],staticClass:"state-column"},[t._v(t._s(t.t("templaterepo","Create"))+"\n\t\t\t")]):t._e(),t._v(" "),a("th",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("templaterepo","Delete"),expression:"t('templaterepo', 'Delete')"}],staticClass:"state-column"},[t._v(t._s(t.t("templaterepo","Delete")))]),t._v(" "),a("th",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("templaterepo","Share"),expression:"t('templaterepo', 'Share')"}],staticClass:"state-column"},[t._v(t._s(t.t("templaterepo","Share")))]),t._v(" "),a("th",{staticClass:"state-column"})])]),t._v(" "),a("tbody",[t.isAdmin?t._e():a("tr",[a("td",[a("avatar",{attrs:{user:"admin",size:24}})],1),t._v(" "),a("td",{staticClass:"username"},[t._v(t._s(t.t("templaterepo","You")))]),t._v(" "),a("td",{staticClass:"state-column"},[a("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_READ,t.model.permissions,1),"read-only":!0}})],1),t._v(" "),a("td",{staticClass:"state-column"},[a("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_UPDATE,t.model.permissions,1),"read-only":!0}})],1),t._v(" "),"dir"===t.model.type?a("td",{staticClass:"state-column"},[a("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_CREATE,t.model.permissions,1),"read-only":!0}})],1):t._e(),t._v(" "),a("td",{staticClass:"state-column"},[a("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_DELETE,t.model.permissions,1),"read-only":!0}})],1),t._v(" "),a("td",{staticClass:"state-column"},[a("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_SHARE,t.model.permissions,1),"read-only":!0}})],1)]),t._v(" "),t._l(t.list,(function(e){return t.isAdmin?a("tr",[a("td",[a("avatar",{attrs:{user:e.mappingId,size:24}})],1),t._v(" "),a("td",{staticClass:"username"},[t._v("\n\t\t\t\t"+t._s(e.mappingDisplayName)+"\n\t\t\t\t"),"group"===e.mappingType?a("span",[t._v(" "+t._s(t.t("templaterepo","(Group)")))]):t._e()]),t._v(" "),a("td",{staticClass:"state-column"},[a("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_READ,e.permissions,e.mask),inherited:e.inherited,disabled:t.loading},on:{update:function(a){return t.changePermission(e,t.OC.PERMISSION_READ,a)}}})],1),t._v(" "),a("td",{staticClass:"state-column"},[a("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_UPDATE,e.permissions,e.mask),inherited:e.inherited,disabled:t.loading},on:{update:function(a){return t.changePermission(e,t.OC.PERMISSION_UPDATE,a)}}})],1),t._v(" "),"dir"===t.model.type?a("td",{staticClass:"state-column"},[a("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_CREATE,e.permissions,e.mask),inherited:e.inherited,disabled:t.loading},on:{update:function(a){return t.changePermission(e,t.OC.PERMISSION_CREATE,a)}}})],1):t._e(),t._v(" "),a("td",{staticClass:"state-column"},[a("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_DELETE,e.permissions,e.mask),inherited:e.inherited,disabled:t.loading},on:{update:function(a){return t.changePermission(e,t.OC.PERMISSION_DELETE,a)}}})],1),t._v(" "),a("td",{staticClass:"state-column"},[a("AclStateButton",{attrs:{state:t.getState(t.OC.PERMISSION_SHARE,e.permissions,e.mask),inherited:e.inherited,disabled:t.loading},on:{update:function(a){return t.changePermission(e,t.OC.PERMISSION_SHARE,a)}}})],1),t._v(" "),a("td",{staticClass:"state-column"},[!1===e.inherited?a("a",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.t("templaterepo","Remove access rule"),expression:"t('templaterepo', 'Remove access rule')"}],staticClass:"icon-close",on:{click:function(a){return t.removeAcl(e)}}}):t._e()])]):t._e()}))],2)]),t._v(" "),!t.isAdmin||t.loading||t.showAclCreate?t._e():a("button",{on:{click:t.toggleAclCreate}},[a("span",{staticClass:"icon-add"}),t._v(" "+t._s(t.t("templaterepo","Add advanced permission rule"))+"\n\t")]),t._v(" "),t.isAdmin&&!t.loading?a("multiselect",{directives:[{name:"show",rawName:"v-show",value:t.showAclCreate,expression:"showAclCreate"}],ref:"select",attrs:{options:t.options,"reset-after":!0,"internal-search":!1,placeholder:t.t("templaterepo","Select a user or group"),"track-by":"unique"},on:{select:t.createAcl,"search-change":t.searchMappings},scopedSlots:t._u([{key:"singleLabel",fn:function(e){return[a("avatar",{attrs:{user:e.option.id,isNoUser:"user"!==e.option.type}}),t._v("\n\t\t\t"+t._s(e.option.displayname)+"\n\t\t\t"),"group"===e.option.type?a("span",[t._v(t._s(t.t("templaterepo","(Group)")))]):t._e()]}},{key:"option",fn:function(e){return[a("avatar",{attrs:{user:e.option.id,isNoUser:"user"!==e.option.type}}),t._v("\n\t\t\t"+t._s(e.option.displayname)+"\n\t\t\t"),"group"===e.option.type?a("span",[t._v(t._s(t.t("templaterepo","(Group)")))]):t._e()]}}],null,!1,2957581142),model:{value:t.value,callback:function(e){t.value=e},expression:"value"}}):t._e()],1):t._e()}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"templaterepo-entry"},[e("div",{staticClass:"avatar icon-group-white"}),this._v(" "),e("span",{staticClass:"username"})])}],!1,null,"3a8721e4",null).exports),b=i(78),f=i(81),S=i.n(f);
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
o.default.prototype.t=t,o.default.prototype.n=n,o.default.prototype.OC=OC,o.default.prototype.OCA=OCA,o.default.use(b.a),o.default.directive("ClickOutside",S.a);var y=o.default.extend(A);a.default=y},40:function(t,e,a){var n=a(74);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,a(5).default)("365a56e2",n,!0,{})},41:function(t,e,a){var n=a(77);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,a(5).default)("2c2b787d",n,!0,{})},73:function(t,e,a){"use strict";var n=a(40);a.n(n).a},74:function(t,e,a){var n=a(4),i=a(11),o=a(75);e=n(!1);var s=i(o);e.push([t.i,"\n.popovermenu[data-v-28dd8ee2] {\n\ttop: 38px;\n\tright: -5px;\n}\nbutton[data-v-28dd8ee2] {\n\theight: 24px;\n\tborder-color: transparent;\n}\nbutton[data-v-28dd8ee2]:hover {\n\theight: 24px;\n\tborder-color: #0082c9;\n\tborder-color: var(--color-primary, #0082c9);\n}\n.icon-deny[data-v-28dd8ee2] {\n\tbackground-image: url("+s+");\n}\n.inherited[data-v-28dd8ee2] {\n\topacity: 0.5;\n}\n",""]),t.exports=e},75:function(t,e,a){"use strict";a.r(e),e.default="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Ym94PSIwIDAgMTYgMTYiCiAgIHdpZHRoPSIxNiIKICAgaGVpZ2h0PSIxNiIKICAgaWQ9InN2ZzM3OTEiCiAgIHNvZGlwb2RpOmRvY25hbWU9ImRlbnkuc3ZnIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjQgNWRhNjg5YzMxMywgMjAxOS0wMS0xNCI+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMzc5NyI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGRlZnMKICAgICBpZD0iZGVmczM3OTUiIC8+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxIgogICAgIG9iamVjdHRvbGVyYW5jZT0iMTAiCiAgICAgZ3JpZHRvbGVyYW5jZT0iMTAiCiAgICAgZ3VpZGV0b2xlcmFuY2U9IjEwIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMTciCiAgICAgaWQ9Im5hbWVkdmlldzM3OTMiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOnpvb209IjE4LjI5NjM4OCIKICAgICBpbmtzY2FwZTpjeD0iLTEzLjE1NDI2NSIKICAgICBpbmtzY2FwZTpjeT0iMS45NTA1NzI1IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIyNiIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImczNzg5IiAvPgogIDxnCiAgICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgIHN0cm9rZT0iIzAwMCIKICAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgICAgZmlsbD0ibm9uZSIKICAgICBpZD0iZzM3ODkiPgogICAgPHBhdGgKICAgICAgIGQ9Ik0gMTEuNjc4MDgyLDQuNTI4MDY3OSA0LjU5MjQ1MDksMTEuNjEzNjk5IgogICAgICAgaWQ9InBhdGgzNzg3IgogICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgIHN0eWxlPSJzdHJva2Utd2lkdGg6MjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIgLz4KICAgIDxlbGxpcHNlCiAgICAgICBpZD0icGF0aDM5OTMiCiAgICAgICBjeD0iNy45OTk5OTk1IgogICAgICAgY3k9IjgiCiAgICAgICByeD0iNS45MDk2MzQ2IgogICAgICAgcnk9IjUuOTA5NjM1MSIKICAgICAgIHN0eWxlPSJzdHJva2Utd2lkdGg6MjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIgLz4KICA8L2c+Cjwvc3ZnPgo="},76:function(t,e,a){"use strict";var n=a(41);a.n(n).a},77:function(t,e,a){(e=a(4)(!1)).push([t.i,"\n#templaterepo-acl-container[data-v-3a8721e4] {\n\tmargin-bottom: 20px;\n}\n.templaterepo-entry[data-v-3a8721e4] {\n\theight: 44px;\n\twhite-space: normal;\n\tdisplay: -webkit-inline-box;\n\tdisplay: inline-flex;\n\t-webkit-box-align: center;\n\t        align-items: center;\n\tposition: relative;\n}\n.avatar.icon-group-white[data-v-3a8721e4] {\n\tdisplay: inline-block;\n\tbackground-color: #0082c9;\n\tbackground-color: var(--color-primary, #0082c9);\n\tpadding: 16px;\n}\n.templaterepo-entry .username[data-v-3a8721e4] {\n\tpadding: 0 8px;\n\toverflow: hidden;\n\twhite-space: nowrap;\n\ttext-overflow: ellipsis;\n}\ntable[data-v-3a8721e4] {\n\twidth: 100%;\n\tmargin-top: -44px;\n\tmargin-bottom: 5px;\n}\ntable td[data-v-3a8721e4], table th[data-v-3a8721e4] {\n\tpadding: 0\n}\nthead th[data-v-3a8721e4] {\n\theight: 44px;\n}\nthead th[data-v-3a8721e4]:first-child,\ntbody tr td[data-v-3a8721e4]:first-child {\n\twidth: 24px;\n\tpadding: 0;\n\tpadding-left: 4px;\n}\ntable .avatardiv[data-v-3a8721e4] {\n\tmargin-top: 6px;\n}\ntable thead th[data-v-3a8721e4]:nth-child(2),\ntable .username[data-v-3a8721e4] {\n\tpadding-left: 13px;\n\ttext-overflow: ellipsis;\n\toverflow: hidden;\n\tmax-width: 0;\n\tmin-width: 50px;\n}\n.state-column[data-v-3a8721e4] {\n\ttext-align: center;\n\twidth: 44px !important;\n\tpadding: 3px;\n}\nthead .state-column[data-v-3a8721e4] {\n\ttext-overflow: ellipsis;\n\toverflow: hidden;\n}\ntable button[data-v-3a8721e4] {\n\theight: 26px;\n\twidth: 24px !important;\n\tdisplay: block;\n\tborder-radius: 50%;\n\tmargin: auto;\n}\na.icon-close[data-v-3a8721e4] {\n\tdisplay: inline-block;\n\theight: 24px;\n\twidth: 100%;\n\tvertical-align: middle;\n\tbackground-size: 12px;\n\topacity: .7;\n\tfloat: right;\n}\na.icon-close[data-v-3a8721e4]:hover {\n\topacity: 1;\n}\n.multiselect[data-v-3a8721e4] {\n\tmargin-left: 44px;\n\twidth: calc(100% - 44px);\n}\n",""]),t.exports=e}}]);
//# sourceMappingURL=sharing.js.map