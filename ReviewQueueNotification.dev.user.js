/** @preserve
// ==UserScript==
// @name Review Queue Notification
// @author Malachi 
// @description Shows a desktop notification when there review items in the queue. 
// @namespace https://github.com/malachi26/ReviewQueueNotifier
// @version 3.0.1 Next
// @Authors
//     -- Malachi26
//     -- The Quill
//     -- Zomis
//
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_notification
// @grant Notifications
// @match *://*.stackexchange.com/review
// @match *://*.stackoverflow.com/review
// @match *://*.mathoverflow.net/review
// @match *://*.serverfault.com/review
// @match *://*.askubuntu.com/review
// @match *://*.stackapps.com/review    
// @match *://*.superuser.com/review
// @icon https://github.com/malachi26/ReviewQueueNotifier/raw/master/Resources/Icon2.jpg
// ==/UserScript==
*/

    Notification.requestPermission();

	var reviewURLList = ['*://*.stackexchange.com/review'
		, '*://*.stackoverflow.com/review'
		, '*://*.mathoverflow.net/review'
		, '*://*.serverfault.com/review'
		, '*://*.askubuntu.com/review'
		, '*://*.stackapps.com/review'
		, '*://*.superuser.com/review']
	
    var KEY_NEXT = 'NextReload';
    var DELAY =  12 * 1000; //120,000 milliseconds = 2 Minutes
    var currentTime = Date.now ? Date.now() : new Date().getTime();
    var lastTime = GM_getValue(KEY_NEXT, 0);
    var nextTime = currentTime + DELAY;
    GM_setValue(KEY_NEXT, nextTime);

	for (var i = 0; i < reviewURLList.length; i++)
	{
		if (windows.location.href.match(reviewURLList[i]))
		{
			
		}
		
	}
	
	var options = function(){
		var optionsElement = document.CreateElement('div');
		var label = document.CreateElement('label').setAttribute("text", "time between reloads in seconds: ");
		var input = document.CreateElement('input').setAttribute("onblur","getReloadTime");
		input.setAttribute("id", "reloadTime");
		input.setAttribute("text", DELAY);
		optionsElement.appendChild(label)
		optionsElement.appendChild(input);
		
		document.body.insertBefore(optionsElement, document.body.childNodes[0]);
	}
	var getReloadTime = function(){
		var timeInput = document.getElementById("reloadTime");
		DELAY = timeInput.text * 1000
	}
	
    var timeDiff = Math.abs(lastTime - currentTime);
    setTimeout(function(){
        window.location.reload(); 
    }, DELAY);

    var notificationTitle = (document.title.split(' - ')[1] + ' Review Queue').replace(' Stack Exchange', '.SE');

    // a way to detect that the script is being executed because of an automatic script reload, not by the user.
    if (timeDiff <= DELAY * 2) {
        var reviewMessages = new Array();
	    
		var dashBoardItems = document.getElementsByClassName('dashboard-item')
		for (var i = 0; i < dashBoardItems.length; i++) {
			if (dashBoardItems[i].getElementsByClassName('dashboard-count dashboard-faded')) {
				continue;
			}
			var reviewCount = parseInt((dashBoardItems[i].getElementsByClassName('dashboard-num')[0].getAttribute('title')).replace(',',''),10);
			if (reviewCount > 0) {
				var reviewType = dashBoardItems[i].getElementsByClassName('dashboard-title')[0].firstChild.nodeValue;
				var message = reviewType + ': ' + reviewCount + ' Reviews';
				reviewMessages.push(message);
			}
		}
		
		if (reviewMessages.length > 0) {
			for (var i = 0; i < reviewMessages.Length; i++) {
				var details = {
					body: reviewMessages[i],
					icon: 'https://github.com/malachi26/ReviewQueueNotifier/raw/master/Resources/Icon2.jpg'
				};
				
				var n = new Notification(notificationTitle, details)
				n.onclick = function() {
					window.focus();
					this.cancel();
				}
				setTimeout(n.close.bind(n), 10000);
				
				//postNotification(reviewMessages[i], notificationTitle, 10000); //timeout after 100 seconds
			}
		}
    }
	
	function postNotification(message, title, timeout){
		var details = {
			body: message,
			icon: 'https://github.com/malachi26/ReviewQueueNotifier/raw/master/Resources/Icon2.jpg'
		}
		var n = new Notification(title, details);
		n.onclick = function() {
			window.focus();
			this.cancel();
		}
		setTimeout(n.close.bind(n), timeout);
	}
