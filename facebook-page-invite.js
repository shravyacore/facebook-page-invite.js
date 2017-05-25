/**
 * facebook-page-invite.js
 * A Shravya Core project.
 * Like using our stuff? Like our page at fb.me/shravyacore to keep
 * up-to-date with our latest releases and thoughts.
 */

var inviteProfileClass = 'uiProfileBlockContent';
var inviteClass = '_42ef'
var chatWholeElement = '_42fz';
var elementId = 'uiButton _1sm';
var buttonText = 'uiButtonText';
var isOnlineButton = '_568-';
var text = 'text';

var debug = false;

function findSubClass(element, className) {
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

async function smartInvite() {
    var inviteBlocks = document.getElementsByClassName(inviteClass);

    var inputs = document.getElementsByClassName(elementId);
    for (var i = 0; i < inviteBlocks.length; i++) {
        var inviteElement = inviteBlocks[i];
        var profileElement = findSubClass(inviteElement, inviteProfileClass);
        var textElement = findSubClass(profileElement, text);

        if (textElement) {
            var inviteName = textElement.innerText.trim() || textElement.textContent.trim();

            if (debug)  console.log("Invite Name " + inviteName);
            var peopleOnline = document.getElementsByClassName(chatWholeElement);
            for (var j = 0; j < peopleOnline.length; j++) {
                element = peopleOnline[j];
                var messageName = element.innerText.trim() || element.textContent.trim();
                if (debug) console.log("Message Name " + messageName);
                if (messageName === inviteName) {
                    if (debug) console.log(messageName + " = " + inviteName);
                    // Check if the person is currently online
                    var onlineButton = findSubClass(element, isOnlineButton);
                    if (onlineButton) {
                    	 // check if the online button exists
                        if (!onlineButton.hasChildNodes()) {
                            if (debug) console.log(inviteName + " is online!");
                            if (debug) console.log(inviteElement);
                            if (debug) console.log(elementId);
                            var button = findSubClass(inviteElement, buttonText);
                            if (debug) console.log(button);
                            if (button) {
                                console.log("Inviting " + inviteName + "...");
                                button.click();
                                await sleep(getRandomBetween(5000, 8000));
                            } else {
                                if (debug) console.log("Error: button is undefined (name: " + inviteName + ").")
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

async function fastInvite() {
    var inputs = document.getElementsByClassName(elementId);
    for (var i = 0; i < 250; i++) {
        inputs[i].click();
        await sleep(getRandomBetween(1000, 3000));
    }
}

smartInvite();
