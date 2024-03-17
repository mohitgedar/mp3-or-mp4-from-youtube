
// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Check if the message contains URL data

    
    if (message.type === "urlData") {
        
        selected=message.selected;
        
        // Use the URL data in the new tab
        document.getElementById('s-box').value=message.url;

        setTimeout(() => {
            document.getElementById('btn-start').click();
        }, 1000);

        setTimeout(() => {
            select320();
            function select320(){
                if(document.getElementById('formatSelect')===null){
                    setTimeout(() => {
                        select320();
                    }, 200);
                    
                }
                else
                {
                    // Find the dropdown element by its ID
                    var dropdown = document.getElementById('formatSelect');
                   // Find the optgroup with label "mp3"
                    if(selected==="mp3"){
                        var optgroup = dropdown.querySelector('optgroup[label="mp3"]');
                        // Find the option with value "0+O8XhnTLOmmQoaBW5FqmhVhPRF1HVXD5l7v3sVW68uOkTCFWvLi+HeOPiGGgg=="
                        var option320kbps = optgroup.querySelector('option');
                    }
                    else if(selected==="mp4")
                    {
                        var optgroup = dropdown.querySelector('optgroup[label="mp4"]');
                        // Find the option with value "0+O8XhnTLOmmQoaBW5FqmhVhPRF1HVXD5l7v3sVW68uOkTCFWvLi+HeOPiGGgg=="
                        var option320kbps = optgroup.querySelector('option').nextElementSibling;
                    }
                    
                    // Set the selected property of the option to true
                    option320kbps.selected = true;

                    // Trigger a change event on the dropdown
                    var event = new Event('change');
                    dropdown.dispatchEvent(event);
                    
                }
            }
          
        }, 1500);

        setTimeout(() => {
            convert();
            function convert(){
                if(document.getElementById('btn-start-convert')===null)
                {
                    setTimeout(() => {
                        convert();
                    }, 200);
                }
                else{
                    document.getElementById('btn-start-convert').click();
                }
                
            }
           
        }, 2200);

        checkdownload();
        function checkdownload(){
            
            if(document.getElementById("asuccess")===null)
            {
                setTimeout(() => {
                    checkdownload();
                }, 200);
            }
            else
            {
                
                document.getElementById('asuccess').click();
                setTimeout(() => {
                    document.getElementById('asuccess').nextElementSibling.click();
                    chrome.runtime.sendMessage({ type: "urlData", url: message.url});
                }, 5000); 
            }
        }        
    }
});