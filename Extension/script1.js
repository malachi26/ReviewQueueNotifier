    Notification.requestPermission();
    var DELAY =  120 * 1000; //120,000 milliseconds = 2 Minutes

    setTimeout(function(){
        window.location.reload(); 
    }, DELAY);

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
