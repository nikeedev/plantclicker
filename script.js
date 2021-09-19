
let plants = 0;

let cursorCost = 15;
let cursors = 0;

let gardenerCost = 50;
let gardeners = 0;

let fertilizerCost = 150;
let fertilizer = 0;


function buyCursor() {
	if (plants >= cursorCost) {
		plants = plants - cursorCost;
		cursors = cursors + 1;
		cursorCost = Math.round(cursorCost * 1.15);

		

		document.getElementById("plants").innerHTML = plants;
		document.getElementById("cursorcost").innerHTML = cursorCost;
		document.getElementById("cursors").innerHTML = cursors;
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
	}
}


function buyFertilizer() {
	if (plants >= fertilizerCost) {
		plants = plants - fertilizerCost;
		fertilizer = fertilizer + 1;
		fertilizerCost = Math.round(fertilizerCost * 1.15);

		document.getElementById("plants").innerHTML = plants;
		document.getElementById("fertilizercost").innerHTML = fertilizerCost;
		document.getElementById("fertilizers").innerHTML = gardeners;
	}
}






document.getElementById("btn").onclick = function () {
	plants += 1;
	
	document.getElementById("plants").innerHTML = plants;
}


setInterval(function() {
	plants = plants + cursors;
	plants = plants + gardeners * 5;
	plants = plants + fertilizer * 13;
	document.getElementById("plants").innerHTML = plants;
}, 1500);



