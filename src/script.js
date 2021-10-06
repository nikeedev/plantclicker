var Game = {
	plants: 0,
	totalPlants: 0,
	totalClicks: 0,
	clickValue: 0,
	version: 0.000,


	addToScore: function(amount) {
		this.score += amount;
		this.totalScore += amount;
		display.updatePlants();

	}

};

var display = {
	
}
