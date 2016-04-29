//Public Key
var publicKey = '?key=hyEwZ8*W*OF7tQ3KYgNjzg((';

chrome.tabs.onUpdated.addListener(isStackReviewPage);

function isStackReviewPage (tabId, changeInfo, tab) {
	$.getJSON('http://api.stackexchange.com/2.2/sites' + publicKey + '&pagesize=100', function(data) {
		var sites = data.items;
		for (var site in sites.items) {
			if (tab.url == site.site_url + '/review'){
				chrome.pageaction.show(tabId);
				return;
			}
		}
	});
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		if (request === "getUrl") {
			sendResponse({url: sender.tab.url});
		}
	});