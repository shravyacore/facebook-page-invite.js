var elementId = 'uiButton _1sm';

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomBetween(min, max) {
	return Math.random() * (max - min) + min;
}

async function invite() {
	var inputs = document.getElementsByClassName(elementId);
	for (var i = 0; i < 250; i++) {
		console.log("clicked on " + i + " users");
		inputs[i].click();
		await sleep(getRandomBetween(3000, 5000));
	}
}

invite();