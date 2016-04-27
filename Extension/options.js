$(function() {
	//Public Key
	var publicKey = '?key=hyEwZ8*W*OF7tQ3KYgNjzg((';
	
	function getRefreshTime () {
		var time = document.getElementById('refresh').value;
		return time * 1000; //to get milliseconds
	}
	function setSiteList() {
		$.getJSON('http://api.stackexchange.com/2.2/sites' + publicKey, function(data) {
			var sites = data.items;
			for (var site in sites) {
				$("#site").append("<option value='" + sites[site].site_url + "'>" + sites[site].name + "</option>");
			}
		});
	}
	setSiteList();
	
	function getSites(){
		//get sites from input element
		var input = $('#sites');
		
	}
	
	// Saves options to chrome.storage
	function save_options() {
	//var color = document.getElementById('color').value;
	//var likesColor = document.getElementById('like').checked;
	
	chrome.storage.sync.set({
		refreshRate: getRefreshTime(),
		site: getSite()
	}, function() {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
	});
	}
	
	// Restores select box and checkbox state using the preferences
	// stored in chrome.storage.
	function restore_options() {
		// Use default value color = 'red' and likesColor = true.
		chrome.storage.sync.get({
		//	favoriteColor: 'red',
		//	likesColor: true
		}, function(items) {
		//	document.getElementById('color').value = items.favoriteColor;
		//	document.getElementById('like').checked = items.likesColor;
		});
	}
	document.addEventListener('DOMContentLoaded', restore_options);
	document.getElementById('save').addEventListener('click',
		save_options);
	});