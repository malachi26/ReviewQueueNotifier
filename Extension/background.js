 	var sites;
	$.getJSON("http://api.stackexchange.com/2.2/sites", function (data){
		sites = data;
	});
	 
	 // var sites = $.ajax({
		// url:'http://api.stackexchange.com/2.2/sites',
		// dataType: 'json',
		// data: {},
		// success: function(data, status, xhr) {
			// return data;
		// },
		// error: function(xhr,status, error) {
			// console.log(status.toString);
		// }
	// });	
	console.dir(sites);
	chrome.tabs.onUpdated.addListener(function(tab) {
		for (var i = 0; i < sites.length; i++){
			if (tab.url = sites.site_url[i] + '/review'){
				chrome.pageAction.show(tab.id);
			}
		}
	});
