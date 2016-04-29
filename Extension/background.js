//Public Key
var publicKey = '?key=hyEwZ8*W*OF7tQ3KYgNjzg((';

chrome.tabs.onUpdated.addListener(isStackReviewPage);

 chrome.tabs.onUpdated.addListener(function(tab) {
	 $.getJSON('http://api.stackexchange.com/2.2/sites' + publicKey, function(data) {
		 var sites = data.items;
		 for (var site in sites.items) {
			 if (tab.url == site.site_url + '/review'){
				 chrome.pageaction.show(tab);
				 return;
			 }
		 }
	 });
 });

function isStackReviewPage (tabId, changeInfo, tab) {
	$.getJSON('http://api.stackexchange.com/2.2/sites' + publicKey, function(data) {
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
		sendResponse({url: sender.tab.url});
		return true;
	})