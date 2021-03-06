var lists = {
	'userList': [],
	'illustList': []
};

var bg = chrome.extension.getBackgroundPage();

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
	$("#status").delay(1500).fadeOut(500);
} // end updateStatus

function addBlock() { // add block to local storage
	var li = initLists();
	var i;
	var id = -1;
	var whichList; // 1 for user, 2 for illust
	var link = document.getElementById("block").value;
	var arr = link.split('=');

	// parse link here
	if (link.indexOf("&illust_id=") != -1) { // check if illust link
		id = arr[2]; // illust link splits twice
		whichList = li.illustList;
	} // end illust check
	else if (link.indexOf("member.php?id=") != -1 ||
				link.indexOf("member_illust.php?id=") != -1) { // check if user link
		id = arr[1]; // user link splits once
		whichList = li.userList;
	} // end user check
	
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
		bg.me("block");
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
	
	if (type === "u") {
		whichList = li.userList;
	}
	else {
		whichList = li.illustList;
	}
	
	for (i = 0; i < whichList.length; i++) { // check for thing
		if (whichList[i] == id) {
			break;
		}
	}
	whichList.splice(i, 1);
	bg.me(type + "-" + id);
	updateStatus("<font color='gray'>Block removed. ブロックは削除されました。</font>");
	localStorage.lists = JSON.stringify(li);
	updateList();
}

function removeAllBlock() {
	localStorage.lists = JSON.stringify({
		'userList': [],
		'illustList': []
	});
	bg.me("unblock all");
	updateStatus("<font color='gray'>All blocks removed. 全部のブロックは削除されました。</font>");
	$("#currentblock").empty();
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
		blockText += "<div id='u-" + id + "'><a href='#' class='nounderline' id='" + id + "'>x</a> [user/ユーザー] " + id + "</div>";
	}
	for (i = 0; i < li.illustList.length; i++) {
		id = li.illustList[i];
		blockText += "<div id='i-" + id + "'><a href='#' class='nounderline' id='" + id + "'>x</a> [illustration/イラスト] " + id + "</div>";
	}
	
	$("#currentblock").html(blockText);
}

function initExt(){
	updateList();
	document.getElementById('rmvall').addEventListener('click', removeAllBlock); 
	document.getElementById('bl').addEventListener('click', addBlock);
	
	$("#currentblock").on("click",".nounderline", function(e){
        e.preventDefault();
		var temp = $(this).parent('div').attr("id");
		var arr = temp.split('-');
		var id = arr[1];
		var type = arr[0];
		removeBlock(id, type);
		$(this).parent('div').remove();
    })
}

document.addEventListener('DOMContentLoaded',initExt);