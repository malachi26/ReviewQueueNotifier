//(function () {
$( document ).ready(function() {
	//Public Key
	var publicKey = '?key=hyEwZ8*W*OF7tQ3KYgNjzg((';
	var sites;
	var ACTIVESITES;// = chrome.storage.sync.get(activeSites);

	GetSelectedSites();
	getAllTehSitez();
	
	function getAllTehSitez() {
		$.getJSON('http://api.stackexchange.com/2.2/sites' + publicKey, function(data) {
			sites = data.items;
			isActiveSite();
		});
	}

	function isActiveSite() {
		var tabUrl = getUrl();
		for (var site in sites) {
			if (tabUrl == sites[site].site_url + '/review') {
				console.log(tabUrl);
				console.log(sites[site].name);
				if (ACTIVESITES.indexOf(sites[site].name.toLowerCase()) > -1) {
					runRQN();
					console.log("runRQN called");
				}
			}
		}		
	}
	
	function GetSelectedSites () {
		chrome.storage.sync.get({
			activeSites: "Code Review"
		}, function(item) {
			ACTIVESITES = item.activeSites;
		});
	}
	
	function getUrl () {
		var returnString;
		chrome.runtime.sendMessage({getUrl: ""}, function(response) {
			returnString = response.url;
		});
		return returnString;
	}
	
	function runRQN () {
		Notification.requestPermission();
		console.log("RQN running");
		var DELAY =  300 * 1000; //120,000 milliseconds = 2 Minutes
		function getDelayAmount() { 
			chrome.storage.sync.get({
				refreshRate: 300000
			}, function(item){
				DELAY = item.refreshRate;
			});
		}
		getDelayAmount();
		
		setTimeout(function(){
			window.location.reload(); 
		}, DELAY);
		
		
		
		console.log(DELAY);
		var notificationTitle = (document.title.split(' - ')[1] + ' Review Queue').replace(' Stack Exchange', '.SE');
		var reviewCount = 0;
		var reviewItems = document.getElementsByClassName('dashboard-num');
		
		for (var i = 0; i < reviewItems.length; i++){
			if (reviewItems[i].parentNode.className != 'dashboard-count dashboard-faded'){
				reviewCount += parseInt((reviewItems[i].getAttribute("title")).replace(',', ''), 10);
				console.log(reviewItems[i]);
			}
		}
		console.log(reviewCount);
		var image = chrome.extension.getURL('Icon2.jpg');
		if (reviewCount > 0) {
			var details = {
				body: reviewCount + ' Review Items',
				icon: image
			} 
			var n = new Notification(notificationTitle, details );
			setTimeout(n.close.bind(n), 100000); // Magic number is time to notification disappear      
		}
	}
});	

//})();