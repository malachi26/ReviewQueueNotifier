 	var sites;
	$.getJSON("http://api.stackexchange.com/2.2/sites", function (data){
		sites = data;
	});

	console.dir(sites);
	chrome.tabs.onUpdated.addListener(function(tab) {

		for (var i = 0; i < Object.keys(sites).length; i++){
			if (tab.url == sites[i].site_url + '/review'){
				chrome.pageaction.show(tab.id);
			}
		}
	});
