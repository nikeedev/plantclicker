
let plants = 0;

let cursorCost = 15;
let cursors = 0;

let gardenerCost = 50;
let gardeners = 0;

let fertilizerCost = 150;
let fertilizers = 0;

let clickingPower = 2;


document.getElementById("btn").onclick = function () {
	plants += clickingPower;

	
	document.getElementById("plants").innerHTML = plants;
}

function buyCursor() {
	if (plants >= cursorCost) {
		plants = plants - cursorCost;
		cursors = cursors + 1;
		cursorCost = Math.round(cursorCost * 1.15);

		

		document.getElementById("plants").innerHTML = plants;
		document.getElementById("cursorcost").innerHTML = cursorCost;
		document.getElementById("cursors").innerHTML = cursors;
		updateScorePerSecond();
	}
}



function buyGardener() {
	if (plants >= gardenerCost) {
		plants = plants - gardenerCost;
		gardeners = gardeners + 1;
		gardenerCost = Math.round(gardenerCost * 1.15);

		document.getElementById("plants").innerHTML = plants;
		document.getElementById("gardenercost").innerHTML = gardenerCost;
		document.getElementById("gardeners").innerHTML = gardeners;
		updateScorePerSecond();
	}
}


function buyFertilizer() {
	if (plants >= fertilizerCost) {
		plants = plants - fertilizerCost;
		fertilizers = fertilizers + 1;
		fertilizerCost = Math.round(fertilizerCost * 1.15);

		document.getElementById("plants").innerHTML = plants;
		document.getElementById("fertilizercost").innerHTML = fertilizerCost;
		document.getElementById("fertilizers").innerHTML = fertilizers;
		updateScorePerSecond();
	}
}






function updateScorePerSecond() {
	scorePerSecond = cursors + (gardeners * 5) + (fertilizers * 13);
	document.getElementById("scorepersecond").innerHTML = scorePerSecond;
}



setInterval(function() {
	plants = plants + cursors;
	plants = plants + gardeners * 5;
	plants = plants + fertilizers * 13;
	document.getElementById("plants").innerHTML = plants;


	document.title = plants + " plants - Plant Clicker";
}, 1500);
