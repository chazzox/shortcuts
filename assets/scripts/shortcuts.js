var exJS = JSON.parse(
	'{"name":"chaz","darkMode":true,"config":[[{"boxName":"ohhhh yeart","type":"links","linkArr":[{"name":"ah yeas","url":"www.chazzox.github.io"},{"name":"lmaoGoogle","url":"www.google.com"},{"name":"hmmmm","url":"www.bruhg.com"}]},{"boxName":"please dont click oh god oh shit oh fuck","type":"links","linkArr":[{"name":"very much not google","url":"www.batheinmymilk.com"}]}],[{"boxName":"still google","type":"links","linkArr":[{"name":"lmaoGoogle","url":"www.google.com"}]},{"boxName":"ohhhh yeart","type":"widget","fucking widget shit mate":"yeah cunt oh year mate this a fucking widget init mate"}]]}'
);
/*
    column       column       column       column   
 ---------------------------------------------------
|    box     |    box     |    box     |    box     |
|   link     |   link     |   link     |   link     |
|   link     |   link     |   link     |   link     |
|   link     |   link     |   link     |   link     |
|    box     |    box     |    box     |    box     |
|   link     |   link     |   link     |   link     |
|   link     |   link     |   link     |    box     |
|   link     |   link     |   link     |   widget   |
|   link     |   link     |   object   
 ---------------------------------------------------
*/
document.getElementById('editMode').onclick = () => {
	toggleMode();
};
render(false);

//Display tutorial if user has no conifg
// if (document.cookie) {
// 	render(false);
// } else {

// 	displayPopup(true, 'tutorial');
// }

//Link Cleanup Function
function cleanupURL(url) {
	url = url.replace(/(.*?:\/\/)|(www\.)/g, '').replace(/\/.*/, '');
	return url;
}
function section() {}
function link() {}
function render(showEditMode) {
	config = exJS.config;
	console.log(config);
	for (let columnIterator = 0; columnIterator < config.length; columnIterator++) {
		for (let boxIterator = 0; boxIterator < config[columnIterator].length; boxIterator++) {
			if (config[columnIterator][boxIterator].type == 'links') {
				for (let linkIterator = 0; linkIterator < config[columnIterator][boxIterator].linkArr.length; linkIterator++) {
					console.log(config[columnIterator][boxIterator].linkArr[linkIterator]);
				}
			} else if (config[columnIterator][boxIterator].type == 'widget') {
				console.log(config[columnIterator][boxIterator]);
			}
		}
	}
}

function toggleMode(onOff) {
	alert('kekw');
}
