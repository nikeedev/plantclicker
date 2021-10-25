var game = {
	plants: 0,
	totalPlants: 0,
	totalClicks: 0,
	clickValue: 1,
	version: 0.000,


	addToPlants: function(amount) {
		this.plants += amount;
		this.totalPlants += amount;
		display.updatePlants();

	},

	getPlantsPerSecond: function() {
		var plantsPerSecond = 0;
		for (i = 0; i < building.name.length; i++) {
			plantsPerSecond += building.income[i] * building.count[i];

		}
		
		return plantsPerSecond;

	}

};


var building = {
	name: ["Cursor", "Fertilizer", "Gardener", "Farm", "Mega Farm", "Forest", ],
	image: ["src/assets/big_cursor.png", "src/assets/big_fertilizer.png", "src/assets/big_gardener.png", "src/assets/big_farm.png", "src/assets/big_mega_farm.png", "src/assets/big_forest.png"],
	count: [0, 0, 0, 0, 0, 0],
	income: [5, 25, 50, 100, 375, 500],
	cost: [50, 150, 500, 1000, 5000, 10000],


	purchase: function(index) {
		if (game.plants >= this.cost[index]) {
			game.plants -= this.cost[index];
			this.count[index]++;
			this.cost[index] = Math.ceil(this.cost[index] * 1.10);
			display.updatePlants();
			display.updateShop();
		}
	}
};



var display = {
	updatePlants: function() {
		document.getElementById("plants").innerHTML = game.plants;
		document.getElementById("plantsPerSecond").innerHTML = game.getPlantsPerSecond();
		document.title = game.plants + " plants - Plant Clicker"; 
	},

	updateShop: function() {
		document.getElementById("shopContainer").innerHTML = "";
		for (i = 0; i < building.name.length; i++) {
			document.getElementById("shopContainer").innerHTML += '<table class="shopButton" onclick="building.purchase('+i+')"><tr><td id="image"><img src="'+building.image[i]+'"></td><td id="nameAndCost"><p id="zeros">'+building.name[i]+'</p><p>'+building.cost[i]+'<span id="zeros"> plants</span></p></td><td id="amount"><span>'+building.count[i]+'</span></td></tr></table>'
		}
	}
};

function saveGame() {
	var gameSave = {
		plants: game.plants,
		totalPlants: game.totalPlants,
		totalClicks: game.totalClicks,
		clickValue: game.clickValue,
		buildingCount: building.count,
		buildingIncome: building.income,
		buildingCost: building.cost

	};
	localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame() {
	var savedGame = JSON.parse(localStorage.getItem("gameSave"));
	if (localStorage.getItem("gameSave") !== null) {
		if (typeof savedGame.plants !== "undefined") {
			game.plants = savedGame.plants; 
		}
		if (typeof savedGame.totalPlants !== "undefined") {
			game.totalPlants = savedGame.totalPlants;
		}
		if (typeof savedGame.totalClicks !== "undefined") {
			game.totalClicks = savedGame.totalClicks;
		}
		if (typeof savedGame.clickValue !== "undefined") {
			 game.clickValue = savedGame.clickValue;
		}

		if (typeof savedGame.buildingCount !== "undefined") {
			for (i = 0; i < savedGame.buildingCount.length; i++) {
				building.count[i] = savedGame.buildingCount[i];
			}
		}
		if (typeof savedGame.buildingCost !== "undefined") {
			for (i = 0; i < savedGame.buildingCost.length; i++) {
				building.cost[i] = savedGame.buildingCost[i];
			}
		}
		if (typeof savedGame.buildingIncome !== "undefined") {
			for (i = 0; i < savedGame.buildingIncome.length; i++) {
				building.income[i] = savedGame.buildingIncome[i];
			}
		}
	}
}

function resetGame() {
	var gameSave = {};
	localStorage.setItem("gameSave", JSON.stringify(gameSave));
	location.reload();
	
}


window.onload = function() {
	loadGame();
	display.updatePlants();
	display.updateShop();
}


setInterval(function() {
	saveGame();
}, 500);


setInterval(() => {
	game.plants += game.getPlantsPerSecond();
	game.totalPlants += game.getPlantsPerSecond();
	display.updatePlants();
}, 1000);

