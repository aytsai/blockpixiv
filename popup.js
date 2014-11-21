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
	var li = initLists();
	var i;
	var id = -1;
	var whichList; // 1 for user, 2 for illust
	var arr = link.split('=');

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

function removeBlock(id, type) {
	// element that calls removeBlock will send this.id and type
	var li = initLists();
	var whichList;
	
	if (type === user) {
		whichList = li.userList;
	}
	else {
		whichList = li.illustList;
	}
	
	for (i = 0; i < whichList.length; i++) { // check for thing
		if (whichList[i] === id) {
			break;
		}
	}
	whichList.splice(i, 1);
	localStorage.lists = JSON.stringify(li);
}

fuction removeAllBlock() {
	localStorage.lists = JSON.stringify({
		'userList': [],
		'illustList': [];
	});
}

function blockStuff() {
	// block stuff on page
	// add jquery
	// loop
		// for users: $( "a[data-user_id*="???"]" ).parent.empty();
		// for illusts: $( "a[href*="???"]" ).parent.empty();
}

function updateList() 
	// call this in initLists, addBlock, removeBlock, and removeAllBlock
	// $("#currentblock").empty
	// for everything in userList and illustList,
	// add <div id="id">x (remove event) [user/ユーザー] id</div>
	//     <div id="id">x (remove event) [illustration/イラスト] id</div>
	// depending on what type it is
}