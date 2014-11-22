// asldkjfs

var lists = {
	'userList': [],
	'illustList': []
};

chrome.runtime.sendMessage({method: "getLocalStorage", key: "status"}, function(response) {
	lists = JSON.parse(response.data);
});

function blockStuff() {
	var i;
	
	console.log("i'm running");
	
	chrome.extension.sendMessage({method: "getLocalStorage", key: "status"}, function(response) {
		lists = JSON.parse(response.data);
	});
	
	for (i = 0; i < lists.userList.length; i++) {
		id = lists.userList[i];
		$( "a[data-user_id*=" + id + "]" ).parent().hide();
	}
	for (i = 0; i < lists.illustList.length; i++) {
		id = lists.illustList[i];
		$( "a[href*=" + id + "]" ).parent().hide();
	}
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.message == "unblock all") {
			console.log("trying to unblock");
			$("li[style$='display: none;']").show();
		}
		else {
			blockStuff();
		}
	}
);