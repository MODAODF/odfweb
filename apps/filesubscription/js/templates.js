(function() {
  var template = Handlebars.template, templates = OCA.FileSubscription.Templates = OCA.FileSubscription.Templates || {};
templates['sharedfile-header'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"subscription-icon\" class=\"icon-mail\"></div>\n\n<div id=\"subscription-content\" class=\"popovermenu hidden\">\n    <div class=\"content\">\n        <h3>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":5,"column":12},"end":{"line":5,"column":21}}}) : helper)))
    + "</h3>\n        <em>"
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":6,"column":12},"end":{"line":6,"column":27}}}) : helper)))
    + "</em>\n        <form id=\"subscription-mail\">\n            <input id=\"submit-mail\" type=\"submit\" class=\"hidden\">\n            <input type=\"email\" name=\"email\" placeholder=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"placeholder") || (depth0 != null ? lookupProperty(depth0,"placeholder") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"placeholder","hash":{},"data":data,"loc":{"start":{"line":9,"column":58},"end":{"line":9,"column":73}}}) : helper)))
    + "\">\n            <label for=\"submit-mail\" class=\"icon-confirm\"></label>\n        </form>\n        <div><a id=\"unsubscr\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"unsubscribe") || (depth0 != null ? lookupProperty(depth0,"unsubscribe") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"unsubscribe","hash":{},"data":data,"loc":{"start":{"line":12,"column":30},"end":{"line":12,"column":45}}}) : helper)))
    + "</a></div>\n        <div><span class=\"msg hidden\"></span></div>\n    </div>\n</div>\n";
},"useData":true});
templates['sidebar-invaildItem'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                (<span>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"labelName") || (depth0 != null ? lookupProperty(depth0,"labelName") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"labelName","hash":{},"data":data,"loc":{"start":{"line":8,"column":23},"end":{"line":8,"column":36}}}) : helper)))
    + "</span>)\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <button class=\"downloadLog\" type=\"button\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"strBtnLog") || (depth0 != null ? lookupProperty(depth0,"strBtnLog") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"strBtnLog","hash":{},"data":data,"loc":{"start":{"line":21,"column":58},"end":{"line":21,"column":71}}}) : helper)))
    + "</button>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"strNoLog") || (depth0 != null ? lookupProperty(depth0,"strNoLog") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"strNoLog","hash":{},"data":data,"loc":{"start":{"line":23,"column":21},"end":{"line":23,"column":33}}}) : helper)))
    + "</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n    <div class=\"itemEntry\">\n        <div class=\"entryAvatar entryAvatarInvaild icon icon-public-white\"></div>\n        <div class=\"entryDesc\">\n            <h5><b>"
    + alias4(((helper = (helper = lookupProperty(helpers,"strEntryTitle") || (depth0 != null ? lookupProperty(depth0,"strEntryTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"strEntryTitle","hash":{},"data":data,"loc":{"start":{"line":6,"column":19},"end":{"line":6,"column":36}}}) : helper)))
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"labelName") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":16},"end":{"line":9,"column":23}}})) != null ? stack1 : "")
    + "            </b></h5>\n            <div>"
    + alias4(((helper = (helper = lookupProperty(helpers,"strEntryDeleted") || (depth0 != null ? lookupProperty(depth0,"strEntryDeleted") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"strEntryDeleted","hash":{},"data":data,"loc":{"start":{"line":11,"column":17},"end":{"line":11,"column":36}}}) : helper)))
    + "</div>\n        </div>\n        <button class=\"entryEdit icon icon-caret-dark rotate\"></button>\n    </div>\n\n    <ul>\n        <li>\n            <div><span class=\"msg hidden\"></span></div>\n            <div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasLog") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":20,"column":16},"end":{"line":24,"column":23}}})) != null ? stack1 : "")
    + "            </div>\n            <div><button class=\"deleteLog\" type=\"button\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"strBtnDelete") || (depth0 != null ? lookupProperty(depth0,"strBtnDelete") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"strBtnDelete","hash":{},"data":data,"loc":{"start":{"line":26,"column":57},"end":{"line":26,"column":73}}}) : helper)))
    + "</button></div>\n        </li>\n    </ul>\n";
},"useData":true});
templates['sidebar-vaildItem'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                (<span>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"labelName") || (depth0 != null ? lookupProperty(depth0,"labelName") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"labelName","hash":{},"data":data,"loc":{"start":{"line":8,"column":23},"end":{"line":8,"column":36}}}) : helper)))
    + "</span>)\n";
},"3":function(container,depth0,helpers,partials,data) {
    return " checked ";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <em class=\"lasttime\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"strLastUpdateOn") || (depth0 != null ? lookupProperty(depth0,"strLastUpdateOn") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"strLastUpdateOn","hash":{},"data":data,"loc":{"start":{"line":32,"column":37},"end":{"line":32,"column":56}}}) : helper)))
    + " "
    + alias4(((helper = (helper = lookupProperty(helpers,"lastMessageTime") || (depth0 != null ? lookupProperty(depth0,"lastMessageTime") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastMessageTime","hash":{},"data":data,"loc":{"start":{"line":32,"column":57},"end":{"line":32,"column":76}}}) : helper)))
    + "</em>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <em>"
    + alias4(((helper = (helper = lookupProperty(helpers,"strLastEmailOn") || (depth0 != null ? lookupProperty(depth0,"strLastEmailOn") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"strLastEmailOn","hash":{},"data":data,"loc":{"start":{"line":47,"column":20},"end":{"line":47,"column":38}}}) : helper)))
    + " <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"lastEmailTime") || (depth0 != null ? lookupProperty(depth0,"lastEmailTime") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastEmailTime","hash":{},"data":data,"loc":{"start":{"line":47,"column":45},"end":{"line":47,"column":62}}}) : helper)))
    + "</span></em>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"lasttime\"><em>"
    + alias4(((helper = (helper = lookupProperty(helpers,"strLastCancelOn") || (depth0 != null ? lookupProperty(depth0,"strLastCancelOn") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"strLastCancelOn","hash":{},"data":data,"loc":{"start":{"line":60,"column":38},"end":{"line":60,"column":57}}}) : helper)))
    + alias4(((helper = (helper = lookupProperty(helpers,"lastCancelTime") || (depth0 != null ? lookupProperty(depth0,"lastCancelTime") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastCancelTime","hash":{},"data":data,"loc":{"start":{"line":60,"column":57},"end":{"line":60,"column":75}}}) : helper)))
    + "</em></div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n    <div class=\"itemEntry\">\n        <div class=\"entryAvatar "
    + alias4(((helper = (helper = lookupProperty(helpers,"entryAvatarCssClass") || (depth0 != null ? lookupProperty(depth0,"entryAvatarCssClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"entryAvatarCssClass","hash":{},"data":data,"loc":{"start":{"line":4,"column":32},"end":{"line":4,"column":55}}}) : helper)))
    + " icon icon-public-white\"></div>\n        <div class=\"entryDesc\">\n            <h5><b>"
    + alias4(((helper = (helper = lookupProperty(helpers,"strEntryTitle") || (depth0 != null ? lookupProperty(depth0,"strEntryTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"strEntryTitle","hash":{},"data":data,"loc":{"start":{"line":6,"column":19},"end":{"line":6,"column":36}}}) : helper)))
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"labelName") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":16},"end":{"line":9,"column":23}}})) != null ? stack1 : "")
    + "            </b></h5>\n            <div><span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"strEntryEnable") || (depth0 != null ? lookupProperty(depth0,"strEntryEnable") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"strEntryEnable","hash":{},"data":data,"loc":{"start":{"line":11,"column":23},"end":{"line":11,"column":41}}}) : helper)))
    + "</span> | <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"strEntrySubscriberNum") || (depth0 != null ? lookupProperty(depth0,"strEntrySubscriberNum") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"strEntrySubscriberNum","hash":{},"data":data,"loc":{"start":{"line":11,"column":57},"end":{"line":11,"column":82}}}) : helper)))
    + "("
    + alias4(((helper = (helper = lookupProperty(helpers,"subscriberNum") || (depth0 != null ? lookupProperty(depth0,"subscriberNum") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subscriberNum","hash":{},"data":data,"loc":{"start":{"line":11,"column":83},"end":{"line":11,"column":100}}}) : helper)))
    + ")</span></div>\n        </div>\n        <button class=\"entryEdit icon icon-caret-dark rotate\"></button>\n    </div>\n\n    <ul>\n        <li>\n            <input type=\"checkbox\" class=\"checkbox\" name=\"subscribable\" id=\"subscribable"
    + alias4(((helper = (helper = lookupProperty(helpers,"shareId") || (depth0 != null ? lookupProperty(depth0,"shareId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shareId","hash":{},"data":data,"loc":{"start":{"line":18,"column":88},"end":{"line":18,"column":99}}}) : helper)))
    + "\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":101},"end":{"line":18,"column":134}}})) != null ? stack1 : "")
    + ">\n            <label for=\"subscribable"
    + alias4(((helper = (helper = lookupProperty(helpers,"shareId") || (depth0 != null ? lookupProperty(depth0,"shareId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shareId","hash":{},"data":data,"loc":{"start":{"line":19,"column":36},"end":{"line":19,"column":47}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"strEntryEnable") || (depth0 != null ? lookupProperty(depth0,"strEntryEnable") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"strEntryEnable","hash":{},"data":data,"loc":{"start":{"line":19,"column":49},"end":{"line":19,"column":67}}}) : helper)))
    + "</label>\n            <span class=\"msg hidden\"></span>\n        </li>\n\n        <li>\n            <div>\n                <div class=\"icon icon-edit\"></div>\n                <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"strLiTitleEdit") || (depth0 != null ? lookupProperty(depth0,"strLiTitleEdit") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"strLiTitleEdit","hash":{},"data":data,"loc":{"start":{"line":26,"column":22},"end":{"line":26,"column":40}}}) : helper)))
    + "</span>\n                <span class=\"msg hidden\"></span>\n            </div>\n            <textarea name=\"versionDescr\" id=\"versionDescr"
    + alias4(((helper = (helper = lookupProperty(helpers,"shareId") || (depth0 != null ? lookupProperty(depth0,"shareId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shareId","hash":{},"data":data,"loc":{"start":{"line":29,"column":58},"end":{"line":29,"column":69}}}) : helper)))
    + "\" rows=\"5\" wrap=\"hard\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"message") || (depth0 != null ? lookupProperty(depth0,"message") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"message","hash":{},"data":data,"loc":{"start":{"line":29,"column":92},"end":{"line":29,"column":103}}}) : helper)))
    + "</textarea>\n            <div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"lastMessageTime") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":16},"end":{"line":33,"column":23}}})) != null ? stack1 : "")
    + "                <button class=\"setDescr\" type=\"button\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"strSave") || (depth0 != null ? lookupProperty(depth0,"strSave") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"strSave","hash":{},"data":data,"loc":{"start":{"line":34,"column":55},"end":{"line":34,"column":66}}}) : helper)))
    + "</button>\n            </div>\n        </li>\n\n        <li>\n            <div>\n                <div class=\"icon icon-mail\"></div>\n                <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"strLiTitleMail") || (depth0 != null ? lookupProperty(depth0,"strLiTitleMail") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"strLiTitleMail","hash":{},"data":data,"loc":{"start":{"line":41,"column":22},"end":{"line":41,"column":40}}}) : helper)))
    + "</span>\n                <span class=\"msg hidden\"></span>\n            </div>\n            <button class=\"sendSubscrMail\" type=\"button\" "
    + alias4(((helper = (helper = lookupProperty(helpers,"buttonDisable") || (depth0 != null ? lookupProperty(depth0,"buttonDisable") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"buttonDisable","hash":{},"data":data,"loc":{"start":{"line":44,"column":57},"end":{"line":44,"column":74}}}) : helper)))
    + ">"
    + alias4(((helper = (helper = lookupProperty(helpers,"strSend") || (depth0 != null ? lookupProperty(depth0,"strSend") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"strSend","hash":{},"data":data,"loc":{"start":{"line":44,"column":75},"end":{"line":44,"column":86}}}) : helper)))
    + "("
    + alias4(((helper = (helper = lookupProperty(helpers,"subscriberNum") || (depth0 != null ? lookupProperty(depth0,"subscriberNum") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subscriberNum","hash":{},"data":data,"loc":{"start":{"line":44,"column":87},"end":{"line":44,"column":104}}}) : helper)))
    + ")</button>\n            <div class=\"lasttime\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"lastEmailTime") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":46,"column":16},"end":{"line":48,"column":23}}})) != null ? stack1 : "")
    + "            </div>\n        </li>\n\n        <li>\n            <div>\n                <div class=\"icon icon-delete\"></div>\n                <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"strLiTitleCancel") || (depth0 != null ? lookupProperty(depth0,"strLiTitleCancel") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"strLiTitleCancel","hash":{},"data":data,"loc":{"start":{"line":55,"column":22},"end":{"line":55,"column":42}}}) : helper)))
    + "</span>\n                <span class=\"msg hidden\"></span>\n            </div>\n            <button class=\"cancelSubscr\" type=\"button\" "
    + alias4(((helper = (helper = lookupProperty(helpers,"buttonDisable") || (depth0 != null ? lookupProperty(depth0,"buttonDisable") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"buttonDisable","hash":{},"data":data,"loc":{"start":{"line":58,"column":55},"end":{"line":58,"column":72}}}) : helper)))
    + ">"
    + alias4(((helper = (helper = lookupProperty(helpers,"strCancel") || (depth0 != null ? lookupProperty(depth0,"strCancel") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"strCancel","hash":{},"data":data,"loc":{"start":{"line":58,"column":73},"end":{"line":58,"column":86}}}) : helper)))
    + "("
    + alias4(((helper = (helper = lookupProperty(helpers,"subscriberNum") || (depth0 != null ? lookupProperty(depth0,"subscriberNum") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subscriberNum","hash":{},"data":data,"loc":{"start":{"line":58,"column":87},"end":{"line":58,"column":104}}}) : helper)))
    + ")</button>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"lastCancelTime") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":59,"column":12},"end":{"line":61,"column":19}}})) != null ? stack1 : "")
    + "        </li>\n    </ul>\n";
},"useData":true});
})();