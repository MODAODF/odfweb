$(document).ready(function() {
    // let hasNews = $('.notifications').children(' .hasNotifications');
    let hasNews = $('div[object_type="announcement"]')
    if (hasNews.length > 0) {
        let image = $('li[data-id="announcementcenter"] image');
        let newHref = image.attr("xlink:href").replace(/announcementcenter.svg/gi, 'announcementcenter-new-dark.svg');
        image.attr("xlink:href", newHref).css('filter', 'unset');
    }
});
