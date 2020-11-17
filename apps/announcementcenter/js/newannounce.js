$.ajax({
    type: 'GET',
    url: OC.webroot + '/ocs/v2.php/apps/notifications/api/v2/notifications',
    dataType : 'json',
}).done(function(resp) {
    if(resp.ocs.meta.statuscode == 200) {
        var data = resp.ocs.data;
        // count announcement notifications
        var newsNum = 0;
        data.forEach(n => {
            if (n.app === "announcementcenter") newsNum++;
        });

        if (newsNum > 0) {
            // red icon
            let image = $('li[data-id="announcementcenter"] image');
            let newHref = image.attr("xlink:href").replace(/announcementcenter.svg/gi, 'announcementcenter-new-dark.svg');
            image.attr("xlink:href", newHref).css('filter', 'unset');

            // create svg node <text>
            var newText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            newText.setAttributeNS(null, "x", 25);
            newText.setAttributeNS(null, "y", 15);
            newText.setAttributeNS(null, "width", 20);
            newText.setAttributeNS(null, "height", 20);
            var textNode = document.createTextNode(newsNum);
            newText.appendChild(textNode);

            // append <text> into svg
            var svg = $('#appmenu li[data-id="announcementcenter"] a svg');
            svg.append(newText);
            svg.attr('width', 50).removeAttr('viewBox').attr('viewBox', '0 0 50 20')
        }
    }
})
