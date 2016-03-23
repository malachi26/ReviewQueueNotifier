/** @preserve
// ==UserScript==
// @name Review Queue Notification
// @author Malachi 
// @description Shows a desktop notification when there review items in the queue. 
// @namespace https://github.com/malachi26/ReviewQueueNotifier
// @version 3.1.1 Next
// @Authors
//     -- Malachi26
//     -- The Quill
//     -- Zomis
//
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_notification
// @grant Notifications
// @grant GM_log
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

/*
//Thanks @Joseph the Dreamer
//
*/


    Notification.requestPermission();

    var KEY_NEXT = 'NextReload';
    var RELOAD =  120 * 1000; //120,000 milliseconds = 2 Minutes
    
	
	var setReload = function(){
		var timeInput = document.getElementById("reloadTime");
		RELOAD = timeInput.text * 1000
	};
	
	var options = function(){
		var optionsElement = document.createElement('div');
		var label = document.createElement('label');
		label.innerHTML = "Time between reloads in seconds";
		label.setAttribute("text", "time between reloads in seconds: ");
		var input = document.createElement('input');
		input.setAttribute("id", "reloadTime");
		input.setAttribute("text", RELOAD);
		label.appendChild(input);
		optionsElement.appendChild(label)
		
		var submitTime = document.createElement("button");
		submitTime.setAttribute("text", "Submit Reload");
		submitTime.setAttribute("onclick","setReload()");
		optionsElement.appendChild(submitTime);
		
		document.body.insertBefore(optionsElement, document.body.childNodes[0]);
	};
    options();
	
	
	
	var AUTO_DISMISS = 100 * 1000; 
    var currentTime = Date.now;
    var lastTime = GM_getValue(KEY_NEXT, 0);
    var nextTime = currentTime + RELOAD;
    GM_setValue(KEY_NEXT, nextTime);
    var timeDiff = currentTime - lastTime;
    setTimeout(function(){window.location.reload();}, RELOAD);

    // a way to detect that the script is being executed because of an automatic script reload, not by the user.
    if (timeDiff > RELOAD * 2) return;
    var notificationTitle = (document.title.split(' - ')[1] + ' Review Queue').replace(' Stack Exchange', '.SE');
    
    var reviewCount = 0;
    var reviewItems = document.getElementsByClassName('dashboard-num');
    
   var reviewItemsArray = Array.prototype.slice.call(reviewItems);
   var reviewCount = reviewItemsArray.reduce(function(count, reviewItem){
       if (reviewItem.parentNode.className == 'dashboard-count dashboard-faded') {
           return 0 + count;
       }
       return +reviewItem.getAttribute('title').replace(',', '') + count;
       
    }, 0);
    
    if (reviewCount <= 0) return; 
    var n = new Notification(notificationTitle, {
        body: reviewCount + ' Review Items',
        icon: 'https://github.com/malachi26/ReviewQueueNotifier/raw/master/Resources/Icon2.jpg'
    });
    n.onclick = function(){
        window.focus();
        this.cancel();
    }
    setTimeout(n.close.bind(n), AUTO_DISMISS); // Magic number is time to notification disappear      

