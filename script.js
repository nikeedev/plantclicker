
let score = 0;

let cursorCost = 15;
let cursors = 0;

let gardenerCost = 35;
let gardeners = 0;






function buyCursor() {
	if (score >= cursorCost) {
		score = score - cursorCost;
		cursors = cursors + 1;
		cursorCost = Math.round(cursorCost * 1.15);

		

		document.getElementById("score").innerHTML = score;
		document.getElementById("cursorcost").innerHTML = cursorCost;
		document.getElementById("cursors").innerHTML = cursors;
	}
}



function buyGardener() {
	if (score >= gardenerCost) {
		score = score - gardenerCost;
		gardeners = gardeners + 1;
		gardenerCost = Math.round(gardenerCost * 1.15);

		document.getElementById("score").innerHTML = score;
		document.getElementById("gardenercost").innerHTML = gardenerCost;
		document.getElementById("gardeners").innerHTML = gardeners;
	}
}

document.getElementById("btn").onclick = function () {
	score += 1;
	
	document.getElementById("score").innerHTML = score;
}


setInterval(function() {
	score = score + cursors;
	score = score + gardeners * 5;
	
	document.getElementById("score").innerHTML = score;
}, 1500);



