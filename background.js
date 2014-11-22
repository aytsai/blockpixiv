// alsdkjf

me = function(passed_message) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: passed_message},
            function(response) { /* Ignore any response. */ }
        );
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getLocalStorage") {
		sendResponse({data: localStorage.lists});
	}
    else {
		sendResponse({}); // empty
	}
});

chrome.webNavigation.onCompleted.addListener(function(details) {
    chrome.tabs.executeScript(details.tabId, {
        code: ' if (document.body.innerText.indexOf("Cat") !=-1) {' +
              '     alert("Cat not found!");' +
              ' }'
    });
});