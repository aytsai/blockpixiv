var browser = 'Chrome';
var lists = {
	'userList': [],
	'illustList': []
};

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
	$("#status").empty();
	$("#status").html(mess);
	$("#status").show();
	document.getElementById('block').value="";
	$("#status").delay(1300).fadeOut(1500);
} // end updateStatus

function addBlock() { // add block to local storage
	var li = initLists();
	var i;
	var id = -1;
	var whichList; // 1 for user, 2 for illust
	var link = document.getElementById("block").value;
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
	
	if (id != -1 || link.indexOf("pixiv.net") != -1) { // if valid link
		for (i = 0; i < whichList.length; i++) { // check for duplicates
			if (whichList[i] === id) {
				updateStatus("<font color='orange'>Already blocked. すでにブロックされています。</font>");
				return false;
			}
		}
		whichList.push(id);
		localStorage.lists = JSON.stringify(li);
		updateList();
		updateStatus("<font color='green'>Successfully blocked. ブロックは成功。</font>");
		return true;
	}
	else {
		updateStatus("<font color='red'>Invalid user/illustration. このユーザ/イラストは存在しません。</font>");
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

function removeAllBlock() {
	localStorage.lists = JSON.stringify({
		'userList': [],
		'illustList': []
	});
	$(":hidden").show(); // show all hidden elements on page
	$("#currentblock").empty();
}

function blockStuff() {
	var li = initLists();

	// block stuff on page
	for (i = 0; i < li.userList.length; i++) {
		id = li.userList[i];
		$( "a[data-user_id*=" + id + "]" ).parent().hide();
	}
	for (i = 0; i < li.illustList.length; i++) {
		id = li.illustList[i];
		$( "a[href*=" + id + "]" ).parent().hide();
	}
}

function updateList() {
	// call this in initLists, addBlock, removeBlock
	// inefficient
	var li = initLists();
	var i;
	var blockText = "";
	var id = "";
	
	$("#currentblock").empty();
	for (i = 0; i < li.userList.length; i++) {
		id = li.userList[i];
		blockText += "<div id='" + id + "'>x (remove event) [user/ユーザー] " + id + "</div>";
	}
	for (i = 0; i < li.illustList.length; i++) {
		id = li.illustList[i];
		blockText += "<div id='" + id + "'>x (remove event) [illustration/イラスト] " + id + "</div>";
	}
	$("#currentblock").html(blockText);
	blockStuff();
}

function initExt(){
	initLists();
	updateList();
	blockStuff();
	document.getElementById('rmvall').addEventListener('click', removeAllBlock); 
	document.getElementById('bl').addEventListener('click', addBlock);
}

document.addEventListener('DOMContentLoaded',initExt);