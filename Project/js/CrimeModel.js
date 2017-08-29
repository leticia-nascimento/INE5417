let CrimeModel = function() {
	this.crimes = [];
	this.selectedCrimes = [];
	this.addCrimeEv = new Event(this);
	this.rmCrimeEv = new Event(this);
	this.setCrimesAsCompletedEv = new Event(this);
	this.delCrimesEv = new Event(this);
};

CrimeModel.prototype = {
	addCrime: function(crime) {
		this.crimes.push({
			crimeName: crime,
			crimeStatus: 'uncompleted'
		});
		this.addCrimeEv.notify();
	},

	getCrimes: function() {
		return this.crimes;
	},

	setSelectedCrime: function(crimeID) {
		this.selectedCrimes.push(crimeID);
	},

	unselectCrime: function(crimeID) {
		this.selectedCrimes.splice(crimeID, 1);
	},

	setCrimesAsCompletedEv: function() {
		let selectedCrimes = this.selectedCrimes;
		for (let index in selectedCrimes) {
			this.crimes[ selectedCrimes[index] ].crimeStatus = 'completed';
		}

		this.setCrimesAsCompletedEv.notify();

		this.selectedCrimes = [];
	},

	delCrimes: function() {
		let selectedCrimes = this.selectedCrimes.sort();

		for (let i = selectedCrimes.length - 1; i >= 0; i--) {
			this.crimes.splice(this.selectedCrimes[i], 1);
		}

		// clear the selected crimes
		this.selectedCrimes = [];

		this.delCrimesEv.notify();
	}
};