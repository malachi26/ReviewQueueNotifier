$(function() {
	//Public Key
	var publicKey = '?key=hyEwZ8*W*OF7tQ3KYgNjzg((';
	var refreshRate;
	var sites;
	var activeSites = new Array();
	function getRefreshRate () {
		var time = document.getElementById('refresh').value;
		refreshRate = time * 1000; //in milliseconds
	}
	function setSiteList() {
		$.getJSON('http://api.stackexchange.com/2.2/sites' + publicKey, function(data) {
			sites = data.items;
			for (var site in sites) {
				$("#site").append("<option value='" + sites[site].site_url + "'>" + sites[site].name + "</option>");
			}
		});
	}
	setSiteList();
	
	function getSites(){
		//var input = $("#sites").value;
		var input = document.getElementById('sites').value;
		console.log(input);
		activeSites = input.toLowerCase().split(',');
		console.log(activeSites);
	}
	
	// Saves options to chrome.storage
	function save_options() {
		getRefreshRate();
		getSites();
		chrome.storage.sync.set({
			refreshRate: refreshRate,
			activeSites: activeSites
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
			refreshRate: 300000,
			activeSites: 'Code Review'
		//	favoriteColor: 'red',
		//	likesColor: true
		}, function(items) {
			$("#refresh").value = items.refreshRate;
			$("#sites").value = items.sites;
		//	document.getElementById('color').value = items.favoriteColor;
		//	document.getElementById('like').checked = items.likesColor;
		});
	}
	document.addEventListener('DOMContentLoaded', restore_options);
	document.getElementById('save').addEventListener('click',
		save_options);
});