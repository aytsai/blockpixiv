var browser = 'Chrome';
var lists = {
	'userList': [],
	'illustList': [];
}

// check if domain is pixiv

function initLists() {
	var li;
	
	if (!localStorage || !localStorage.lists) { // no stuff yet
		li = lists;
	}
	else { // parse the original lists
		try {
			li = JSON.parse (localStorage.lists);
		} catch (e) {
			li = lists;
		}
	}
	return li;
} // end initLists

function updateStatus(mess) {
	document.getElementsByName('Block')[0].placeholder=mess;
} // end updateStatus

function addBlock(link) { // add block to local storage
	var li;
	var i;
	var id = -1;
	var whichList; // 1 for user, 2 for illust
	var arr = link.split('=');
	
	li = initLists();

	// parse link here
	if (link.indexOf("member") != -1) { // check if user link
		id = arr[1]; // user link splits once
		whichList = li.userList;
	} // end user check
	else if (link.indexOf("illustration") != -1) { // check if illust link
		id = arr[2]; // illust link splits twice
		whichList = li.illustList;
	} // end illust check
	
	if (id != -1) { // if valid link
		for (i = 0; i < whichList.length; i++) { // check for duplicates
			if (whichList[i] === id) {
				updateStatus("Already blocked. すでにブロックされています。");
				return false;
			}
		}
		whichList.push(id);
		localStorage.lists = JSON.stringify(li);
		updateStatus("Successfully blocked. ブロックは成功。");
		return true;
	}
	else {
		updateStatus("Invalid link/ID. このlink/IDは存在しません。");
		return false;
	}
} // end addBlock

function removeBlock(id) {
	if (id.indexOf("user")) {
		// parse id and div
		// remove from user lists
		// remove the style rule
	}
	else {
		// remove from illustration
		// remove the style rule
	}
}

fuction removeAllBlock() {
	lists = {
		'userBlock': [],
		'illustBlock': [];
	}
}

function blockStuff() {
	// block stuff on page
	
	var pDoc = document.getElementById("myParagraph");
	var parentDiv = pDoc.parentNode;
}