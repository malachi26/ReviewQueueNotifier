// ==UserScript==
// @name         Review Queue Notification
// @namespace    https://github.com/malachi26/SE-Scripts
// @version      2.0
// @description  Shows a desktop notification when there review items in the queue without opening the review queue page.
// @author       Malachi
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_notification
// @match http*
// ==/UserScript==
	var sites = ["http://codereview.stackexchange.com", "http://stackoverflow.com"];
    var DELAY = 30 * 1000; //30,000 milliseconds
    setTimeout(function(){
		for (var i = 0; i < sites.length; i++) {
			CountReviews(sites[i] + '/review');
		}
    }, DELAY);

	function CountReviews(siteUrl) {
		var reviewCount = 0;
		$.get(siteUrl, function(reviewDoc) {
			var reviewItems = reviewDoc.getElementsByClassName('dashboard-num')[0];
			for (var i = 0; i < reviewItems.length; i++) {
				reviewCount += parseInt((reviewItems[i].getAttribute("title")).replace(',', ''), 10);
				console.log(reviewItems[i]);
			}
			console.log(reviewCount);
			
			if (reviewCount > 0) {
				var details = {
					title: siteUrl,
					text: reviewCount + ' Review Items',
					timeout: 15000,
					onclick: window.open(siteUrl, '_blank')
				}
				GM_notification(details, null);
			}
		}, 'html');
	}
    
