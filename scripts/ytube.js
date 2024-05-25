// to automatically change the track on  the youtube page to next
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "changetrack")
        {
            //so that it stops for 2 seconds before changing the track
            setTimeout(() => {
                const nextButton = document.querySelector('#left-controls > div > tp-yt-paper-icon-button.next-button.style-scope.ytmusic-player-bar');// this selects the next button on the youtube music page 

                if (nextButton) {
                    nextButton.click(); // Trigger click event on the next button of youtube music page
                } else { 
                    //if we reached here means we are not on youtube music , so we select youtube next button and click it
                    const nextButton2 = document.querySelector('#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > a.ytp-next-button.ytp-button');//this to 
                    if(nextButton2)
                        nextButton2.click();

                }
            }, 2000);//wait so the website it loaded properly before trying to change the track
            
        }
});