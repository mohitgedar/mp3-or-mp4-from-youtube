let selection='mp3';
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    if (this.checked) {
        selection=checkbox.value;// Update selection when checkbox is checked
        // Uncheck other checkboxes
        checkboxes.forEach(function(otherCheckbox) {
            if (otherCheckbox !== checkbox) {
                otherCheckbox.checked = false;
            }
        });
    }
  });
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let activeTab = tabs[0];
    let tabUrl = activeTab.url;
    if (tabUrl.indexOf("youtube.com") === -1) {
        // If "youtube.com" string is not found, do nothing
        return;
    }
    
    setTimeout(() => {

        var urlToSwitchTo = 'https://utomp3.com/*';
        chrome.tabs.query({url: urlToSwitchTo}, function(tabs) {
            if (tabs.length > 0) {
                // Tab with the specified URL is already open, switch to it
                chrome.tabs.update(tabs[0].id, {active: true}, function(second) {
                    // Send message to the content script of the new tab
                    chrome.tabs.executeScript(second.id, {file: "contentScript.js"}, function() {
                        chrome.tabs.sendMessage(second.id, { type: "urlData", url: tabUrl, selected:selection ,whathappened:"updated"});
                    });
                });
            } else {
                // Tab with the specified URL is not open, create a new tab
                chrome.tabs.create({url: urlToSwitchTo}, function(newTab) {
                    // Send message to the content script of the new tab
                    setTimeout(() => {
                        chrome.tabs.executeScript(newTab.id, {file: "contentScript.js"}, function() {
                            setTimeout(() => {
                                 chrome.tabs.sendMessage(newTab.id, { type: "urlData", url: tabUrl , selected:selection ,whathappened:"created"});
                               }, 1500);
                       });
                    }, 1500);
                    
                 });
            }
        });
    }, 4000);
    
   
});





chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Check if the message contains the type "downloadInitiated"
    if (message.type === "urlData") {
        chrome.tabs.query({url: message.url}, function(tabs) {
            if (tabs.length > 0) {
                // Tab with the specified URL is already open, switch to it
                chrome.tabs.update(tabs[0].id, {active: true});
            }
        });
    }
});