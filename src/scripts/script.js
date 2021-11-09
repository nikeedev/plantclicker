var game = {
	plants: 0,
	totalPlants: 0,
	totalClicks: 0,
	clickValue: 1,
	version: 0.001,


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
			display.updateUpgrades();
		}
	}
};

var upgrade = {
	name: [
		"Gold Cursors",
		"Shiny Gold Cursors",
		"Clicker+",
		"Clicker++",
		"Golden Farm",
		"Golden Farm GOLDIER",
		"Mega Golden Farm"
	],
	description: [
		"Cursors are now twice as fast!",
		"4x Better and shinier than Gold Cursors",
		"Your Clicks will be doubled!",
		"This bad boy, gives your clicks 4x more than previous!",
		"Turn all your plants into GOLD!",
		"Farms are now 6x goldier than before!",
		"MY GOD, THATS POWERFUL!",
		"MY GOD, THATS EVEN MORE POWERFUL!!!!"
	],
	image: [
		"big_gold_cursor.png",
		"big_gold_cursor.png",
		"big_strong_cursor.png",
		"big_strong_cursor.png",
		"big_gold_farm.png",
		"big_gold_farm.png",
		"big_gold_mega_farm.png",
		"big_gold_mega_farm.png"
	],
	type: [
		"building",
		"building",
		"click",
		"click",
		"building",
		"building",
		"building",
		"building"
	],
	cost: [
		300,
		520,
		700,
		1000,
		50000,
		1000000,
		10000000,
		15000000,
	],
	buildingIndex: [
		0,
		0,
		0,
		0,
		3,
		3,
		4,
		4
	],
	requirement: [
		30,
		45,
		150,
		225,
		50,
		125,
		150,
		250,

	],
	bonus: [
		2,
		4,
		2,
		4,
		3.4,
		6.5,
		15,
		22
	],
	purchased: [
		false, 
		false,
		false,
		false,
		false,
		false,
		false,
		false
	],
	purchase: function(index) {
		if (!this.purchased[index] && game.plants >= this.cost[index]) {
			if (this.type[index] == "building" && building.count[this.buildingIndex[index]] >= this.requirement[index]) {
				game.plants -= this.cost[index];
				building.income[this.buildingIndex[index]] *= this.bonus[index];
				this.purchased[index] = true;
				 
				display.updateUpgrades();
				display.updatePlants();
			} else if (this.type[index] == "click" && game.totalClicks >= this.requirement[index]) {
				game.plants -= this.cost[index];
				game.clickValue *= this.bonus[index];
				this.purchased[index] = true;
				 
				display.updateUpgrades();
				display.updatePlants();
			}
		}
	},
};

var display = {
	updatePlants: () => {
		document.getElementById("plants").innerHTML = game.plants;
		document.getElementById("plantsPerSecond").innerHTML = game.getPlantsPerSecond();
		document.title = game.plants + " plants - Plant Clicker"; 
	},

	updateShop: () => {
		document.getElementById("shopContainer").innerHTML = "";
		for (i = 0; i < building.name.length; i++) {
			document.getElementById("shopContainer").innerHTML += '<table class="shopButton" onclick="building.purchase('+i+')"><tr><td id="image"><img src="'+building.image[i]+'"></td><td id="nameAndCost"><p id="zeros">'+building.name[i]+'</p><p>'+building.cost[i]+'<span id="zeros"> plants</span></p></td><td id="amount"><span>'+building.count[i]+'</span></td></tr></table>'
		}
	},

	updateUpgrades: () => {
		document.getElementById("upgradeContainer").innerHTML = "<p id='right'>No Upgrades available yet!</p>";
		for(i = 0; i < upgrade.name.length; i++) {
			if(!upgrade.purchased[i]) {
				if(upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]) {
					document.getElementById("upgradeContainer").innerHTML += '<img src="src/assets/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; ('+upgrade.cost[i]+' plants)" onclick="upgrade.purchase('+i+')">';
				} else if (upgrade.type[i] == "click" && game.totalClicks >= upgrade.requirement[i]) {
					document.getElementById("upgradeContainer").innerHTML += '<img src="src/assets/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; ('+upgrade.cost[i]+' plants)" onclick="upgrade.purchase('+i+')">';
				}
			}
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
		buildingCost: building.cost,
		upgradePurchased: upgrade.purchased,


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
		if (typeof savedGame.upgradePurchased !== "undefined") {
			for (i = 0; i < savedGame.upgradePurchased.length; i++) {
				upgrade.purchased[i] = savedGame.upgradePurchased[i];
			}
		}
	}
}

function resetGame() {
	var gameSave = {};
	localStorage.setItem("gameSave", JSON.stringify(gameSave));
	location.reload();
	
}

document.getElementById("clicker").addEventListener("click", function() {
	game.totalClicks++;
	game.addToPlants(game.clickValue);
}, false);

window.onload = function() {
	loadGame();
	display.updatePlants();
	display.updateUpgrades();
	display.updateShop();
}

setInterval(() => {
	game.plants += game.getPlantsPerSecond();
	game.totalPlants += game.getPlantsPerSecond();
	display.updatePlants();
}, 1000);

setInterval(function() {
	saveGame();
}, 500);

setInterval(() => {
	display.updatePlants();
	display.updateUpgrades();
}, 10000)

