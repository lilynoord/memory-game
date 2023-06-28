let indicesMod = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
	22, 23,
];
const indicesPerm = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
	22, 23,
];

function getPairs() {
	indicesMod = indicesPerm;
	let unpaired = document.querySelectorAll("img");
	let pairIndices = getRandomIndices();
	let pairs = [];
	for (let i = 0; i < 12; i++) {
		pairs.push([unpaired[pairIndices[i][0]], unpaired[pairIndices[i][1]]]);
	}
	return pairs;
}

function getRandomIndices() {
	let pairs = [];
	for (let i = 0; i < 24; i += 2) {
		let rand = indicesMod[Math.floor(Math.random() * indicesMod.length)];
		indicesMod.splice(indicesMod.indexOf(rand), 1);
		let rand2 = indicesMod[Math.floor(Math.random() * indicesMod.length)];
		indicesMod.splice(indicesMod.indexOf(rand2), 1);
		pairs.push([rand, rand2]);
	}
	return pairs;
}

function setImages(pairs) {
	const images = [
		"../images/apple.png",
		"../images/bears.png",
		"../images/car.png",
		"../images/cthulu.png",
		"../images/fish.png",
		"../images/geo.png",
		"../images/monkey.png",
		"../images/orca.png",
		"../images/soda.png",
		"../images/vader.png",
		"../images/watermelon.png",
		"../images/cat.png",
	];
	for (let i = 0; i < 12; i++) {
		pairs[i][0].dataset.secret = images[i];
		pairs[i][0].dataset.match = pairs[i][1].id;
		pairs[i][0].dataset.clicked = "false";
		pairs[i][1].dataset.secret = images[i];
		pairs[i][1].dataset.match = pairs[i][0].id;
		pairs[i][1].dataset.clicked = "false";
	}
}

let clickedCount = 0;
let clickedList = [];

function handleGuess() {
	let success = false;
	if (clickedList[0].dataset.match === clickedList[1].id) {
		success = true;
	}
	console.log(success);

	if (success) {
		handleSuccess(clickedList[0]);
		handleSuccess(clickedList[1]);
	} else {
		handleFail(clickedList[0]);
		handleFail(clickedList[1]);
	}
	clickedList = [];
	clickedCount = 0;
}

function handleSuccess(tile) {
	tile.dataset.clicked = "false";
	tile.src = tile.dataset.secret;
}

function handleFail(tile) {
	tile.dataset.clicked = "false";
	tile.src = tile.dataset.secret;
	setTimeout(function () {
		tile.src = "../images/default.png";
	}, 1000);
}

function main() {
	let pairs = getPairs();
	setImages(pairs);

	document.addEventListener("click", function (event) {
		console.log(event);
		if (
			event.target.tagName === "IMG" &&
			event.target.dataset.clicked === "false"
		) {
			clickedList.push(event.target);
			clickedCount += 1;
			event.target.dataset.clicked = "true";
			if (clickedCount === 2) {
				handleGuess();
			}
		}
	});
}

main();
