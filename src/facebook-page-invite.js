javascript: (function() {
    /**
     * facebook-page-invite.js
     * A Shravya Core project.
     * Like using our stuff? Like our page at fb.me/shravyacore to keep
     * up-to-date with our latest releases and thoughts.
     *
     * We do not use slash-slash comments here so that the code can work when
     * converted to a bookmarklet.
     */

    /*
     * Isolate the selectors so that we can change them easily
     * if Facebook updates the layout
     */
    var inviteProfileClass = 'uiProfileBlockContent';
    var inviteClass = '_42ef';
    var chatWholeElement = '_42fz';
    var elementId = 'uiButton _1sm';
    var buttonText = 'uiButtonText';
    var isOnlineButton = '_568-';
    var text = 'text';

    var debug = false;

    /*
     * Limit the maximum number of invites sent so as to
     * prevent Facebook from blocking you from inviting people.
     */ 
    var max_invites = 500;

    /**
     * Recursively traverses through an element's child
     * nodes, looking for the specified subclass.
     */
    function findSubClass(element, className) {
        "use strict";
        if (!element) {
            return null;
        }
        var foundElement = null,
            found;

        function recurse(element, className, found) {
            for (var i = 0; i < element.childNodes.length && !found; i++) {
                var el = element.childNodes[i];
                var classes = el.className != undefined ? el.className.split(" ") : [];
                for (var j = 0, jl = classes.length; j < jl; j++) {
                    if (classes[j] == className) {
                        found = true;
                        foundElement = element.childNodes[i];
                        break;
                    }
                }
                if (found)
                    break;
                recurse(element.childNodes[i], className, found);
            }
        }
        recurse(element, className, false);
        return foundElement;
    }

    /**
     * Sleeps for a given length of time.
     */
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Generates a random number between the min and the max.
     */
    function getRandomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    /**
     * A smart invite function that only invites people if
     * they are currently online. This increases engagement
     * as more people will see the invite notification and
     * it will not be buried by other notifications when they
     * come back online.
     */
    async function smartInvite() {
        var inviteBlocks = document.getElementsByClassName(inviteClass);
        var inputs = document.getElementsByClassName(elementId);

        var invite_count = 0;
        for (var i = 0; i < inviteBlocks.length; i++) {
            var inviteElement = inviteBlocks[i];
            var profileElement = findSubClass(inviteElement, inviteProfileClass);
            var textElement = findSubClass(profileElement, text);

            if (textElement) {
                var inviteName = textElement.innerText.trim() || textElement.textContent.trim();

                if (debug) { console.log("Invite Name " + inviteName); }
                var peopleOnline = document.getElementsByClassName(chatWholeElement);
                for (var j = 0; j < peopleOnline.length; j++) {
                    element = peopleOnline[j];
                    var messageName = element.innerText.trim() || element.textContent.trim();
                    if (debug) { console.log("Message Name " + messageName); }
                    if (messageName === inviteName) {
                        if (debug) { console.log(messageName + " = " + inviteName); }
                        
                        /** Check if the person is currently online **/
                        var onlineButton = findSubClass(element, isOnlineButton);
                        if (onlineButton) {
                            if (!onlineButton.hasChildNodes()) {
                                if (debug) { console.log(inviteName + " is online!"); }
                                if (debug) { console.log(inviteElement); }
                                if (debug) { console.log(elementId); }
                                var button = findSubClass(inviteElement, buttonText);
                                if (debug) { console.log(button); }
                                if (button) {
                                    console.log("Inviting " + inviteName + "...");
                                    /* button.click(); */
                                    /* Make sure that we do not exceed the maximum number of invites */
                                    invite_count++;
                                    if (invite_count >= max_invites) {
                                        return;
                                    }
                                    await sleep(getRandomBetween(5000, 8000));
                                } else {
                                    if (debug) { console.log("Error: button is undefined (name: " + inviteName + ").") }
                                    console.log(inviteName + " has already been invited.");
                                }
                            } else {
                                console.log(inviteName + " is offline.");
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Just invites everyone as quickly as it can.
     * Only recommended to run after exhausting smart invite,
     * as some users permanently mark themselves offline and thus
     * would not be invited at all by smart invite.
     */
    async function fastInvite() {
        var inputs = document.getElementsByClassName(elementId);
        for (var i = 0; i < max_invites; i++) {
            inputs[i].click();
            await sleep(getRandomBetween(1000, 3000));
        }
    }

    smartInvite();
})();
