// asldkjfs

var lists = {
	'userList': [],
	'illustList': []
};

function blockStuff() {
	var i;
	var id;
	
	chrome.runtime.sendMessage({method: "getLocalStorage", key: "status"}, function(response) {
		lists = JSON.parse(response.data);
		console.log(lists.userList);
		
		for (i = 0; i < lists.userList.length; i++) {
			id = lists.userList[i];
			$( "a[data-user_id*=" + id + "]" ).parent().hide();
		}
		for (i = 0; i < lists.illustList.length; i++) {
			id = lists.illustList[i];
			$( "a[href*=" + id + "]" ).parent().hide();
		}
	});
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.message == "unblock all") { // remove all blocks
			$("li[style$='display: none;']").show();
		}
		else if (request.message == "block") { // block stuff
			blockStuff();
		}
		else { // remove one block
			var arr = request.message.split('-');
			var id = arr[1];
			var type = arr[0];
			if (type == "u") { // user 
				$("li[style$='display: none;'] > " + "a[data-user_id*=" + id + "]").parent().show();
			}
			else {
				$("li[style$='display: none;'] > " + "a[href*=" + id + "]").parent().show();
			}
		}
	}
);

document.onreadystatechange = function(){blockStuff();};