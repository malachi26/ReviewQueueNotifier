# Review Queue Notifier 
- Current Development [![Code Review](http://www.zomis.net/codereview/shield/?qid=105615)](http://codereview.stackexchange.com/q/105615/18427)
- Early Version [![Code Review](http://www.zomis.net/codereview/shield/?qid=98619)](http://codereview.stackexchange.com/q/98619/18427)

# Chrome Extension

This is a version that is in the works and will give the user more freedom over the notifications that they receive

If you are interested in helping out with this project please feel free to take a look at the Issues list and Submit a Pull Request when you have resolved an issue.

All Issues for the Chrome Extension have been tagged [Chrome Extension](https://github.com/malachi26/ReviewQueueNotifier/issues?q=is%3Aopen+is%3Aissue+label%3A%22Chrome+Extension%22)

Thank you

# User Script

##This is a script for the Stack Exchange Network

This script will make it so that you are notified on the Desktop whenever new reviews are available, as long as you have a review tab open.

##How to use
- Install [Greasemonkey](http://www.greasespot.net/) (Firefox) or [Tampermonkey](http://tampermonkey.net/) (Chrome). These are userscript managers and allow the script to make use of `GM_*` functions
- Install the script: <kbd>[install](https://github.com/malachi26/ReviewQueueNotifier/raw/master/ReviewQueueNotification.user.js)</kbd> or <kbd>[view source](https://github.com/malachi26/ReviewQueueNotifier/blob/master/ReviewQueueNotification.user.js)</kbd>
- Any time you have a review queue window open, the script will run and alert you anytime there are reviews to be performed.

##Notes
- I will continue to make advancements with the code, so please keep an eye on this project by starring!
- Feel free to post issues to the GitHub repository, contributors actively watch for issues and will work on solving them ASAP!

I altered a [zomis][2] script to create this version, [check out his Moderator version][3].

##Updates

###Version 2.1.1

- Fixes issue where no notification would show up when using GreaseMonkey on Firefox-derived browsers.

###Version 3.0.1 Next

- Review Queue Page opens when the notification is clicked and the notification disappears
- ??

### Future Enhancements 

- Possibly showing seperate notification for each queue on the review page, so that the user knows which one has reviews in it
- Turning off specific queues
- ??


<sub>[Donate to future development!][1]</sub>
  [1]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7PTJ7V3ERTYWQ
  [2]: https://github.com/Zomis
  [3]: http://codereview.stackexchange.com/q/97268/18427
