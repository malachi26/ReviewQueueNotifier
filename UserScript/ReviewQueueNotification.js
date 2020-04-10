/** @preserve
// ==UserScript==
// @name Review Queue Notification
// @author Malachi with help from Simon Forsberg
// @description Shows a desktop notification when there review items in the queue. 
// @namespace https://github.com/malachi26/ReviewQueueNotifier
// @version 2.1.3
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
// @icon https://github.com/malachi26/ReviewQueueNotifier/raw/master/Resources/Icon2.png
// ==/UserScript==
*/

    Notification.requestPermission();

    const KEY_NEXT = 'NextReload';
    const DELAY =  120 * 1000; //120,000 milliseconds = 2 minutes
    const currentTime = Date.now ? Date.now() : new Date().getTime();
    const lastTime = GM_getValue(KEY_NEXT, 0);
    const nextTime = currentTime + DELAY;
    GM_setValue(KEY_NEXT, nextTime);

    var timeDiff = Math.abs(lastTime - currentTime);
    setTimeout(window.location.reload, DELAY);

    document.title = document.title.split(' - ')[1] + ' Review Queue'; // keep the site name

    // a way to detect that the script is being executed because of an automatic script reload, not by the user.
    if (timeDiff <= DELAY * 2) {
        let reviewCount = 0;
        const reviewItems = document.querySelectorAll(':not(.o30) > .fs-subheading[title]');
        for (const reviewItem of reviewItems) {
            reviewCount += parseInt(reviewItem.title, 10);
        }
        console.log('reviewCount: ', reviewCount);

        if (reviewCount > 0) {
            const details = {
                body: reviewCount + ' Review Items',
                icon: 'https://github.com/malachi26/ReviewQueueNotifier/raw/master/Resources/Icon2.png'
            }
            const n = new Notification(document.title.replace(' Stack Exchange', '.SE'), details );
            setTimeout(n.close.bind(n), 15000);
        }
    }
