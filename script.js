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
                chrome.tabs.update(tabs[0].id, {active: true}, function() {
                    // Send message to the content script of the new tab
                    chrome.tabs.executeScript(tabs[0].id, {file: "contentScript.js"}, function() {
                        chrome.tabs.sendMessage(tabs[0].id, { type: "urlData", url: tabUrl, selected:selection });
                    });
                });
            } else {
                // Tab with the specified URL is not open, create a new tab
                chrome.tabs.create({url: urlToSwitchTo}, function(newTab) {
                    // Send message to the content script of the new tab
                        chrome.tabs.executeScript(newTab.id, {file: "contentScript.js"}, function() {
                            chrome.tabs.sendMessage(newTab.id, { type: "urlData", url: tabUrl , selected:selection });
                        });
                 });
            }
        });
    }, 2000);
    
   
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