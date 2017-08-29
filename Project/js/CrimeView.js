let CrimeView = function(model) {
	this.model = model;
	this.addCrimeEv = new Event(this);
	this.selectCrimeEv = new Event(this);
	this.unselectCrimeEv = new Event(this);
	this.completeCrimeEv = new Event(this);
	this.delCrimeEv = new Event(this);

	this.init();
};

CrimeView.prototype = {
	init: function() {
		this.createChildren()
			.setupHandlers()
			.enable();
	},

	createChildren: function() {
		// cache the document object
		this.$container = $('.js-container');
		this.$addCrimeButton = this.$container.find('.add-crime-button');
		this.$crimeTextBox = this.$container.find('.crime-textbox');
		this.$lastCrimesCont = this.$container.find('.last-crimes-container');

		return this;
	},

	setupHandlers: function() {
		this.addCrimeButtonHandler = this.addCrimeButton.bind(this);
		this.selectUnselectCrimeHandler = this.selectUnselectCrime.bind(this);
		this.completeCrimeButtonHandler = this.completeCrimeButton.bind(this);
		this.delCrimeButtonHandler = this.delCrimeButton.bind(this);

		// Handlers from EventDispatcher
		this.addCrimeHandler = this.addCrime.bind(this);
		this.clearCrimeTextBoxHandler = this.clearCrimeTextBox.bind(this);
		this.setCrimesAsCompletedHandler = this.setCrimesAsCompleted.bind(this);
		this.delCrimesHandler = this.delCrimes.bind(this);

		return this;
	},

	enable: function() {
		
	}

};