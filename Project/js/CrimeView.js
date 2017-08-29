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
		this.$addCrimeButton = this.$container.find('.js-add-crime-button');
		this.$crimeTextBox = this.$container.find('.js-crime-textbox');
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
		this.$addCrimeButton.click(this.addCrimeButtonHandler);
        this.$container.on('click', '.js-crime', this.selectOrUnselectCrimeHandler);
        this.$container.on('click', '.js-complete-crime-button', this.completeCrimeButtonHandler);
        this.$container.on('click', '.js-del-crime-button', this.delCrimeButtonHandler);

        /**
         * Event Dispatcher
         */
        this.model.addCrimeEv.attach(this.addCrimeHandler);
        this.model.addCrimeEv.attach(this.clearCrimeTextBoxHandler);
        this.model.setCrimesAsCompletedEv.attach(this.setCrimesAsCompletedHandler);
        this.model.delCrimesEv.attach(this.delCrimesHandler);

        return this;
	},

	addCrimeButton: function () {
        this.addCrimeEv.notify({
            crime: this.$crimeTextBox.val()
        });
    },

    completeCrimeButton: function() {
    	this.completeCrimeEv.notify();
    },

    delCrimeButton: function() {
    	this.delCrimeEv.notify();
    },

    selectUnselectCrime: function() {
    	let crimeID = $(event.target).attr('data-index');

    	if ($(event.target).attr('data-crime-selected') == 'false') {
    		$(event.target).attr('data-crime-selected', true);
    		this.selectCrimeEv.notify({
    			crimeID: crimeID
    		});
    	} else {
    		$(event.target).attr('data-crime-selected', false);
    		this.unselectCrimeEv.notify({
    			crimeID: crimeID
    		})
    	}
    },

    show: function() {
    	this.buildList();
    },

    buildList: function() {
    	let crimes = this.model.getCrimes();
    	let html = "";
    	let $lastCrimesCont = this.$lastCrimesCont;

    	$lastCrimesCont.html('');

    	let index = 0;
    	for (let crime in crimes) {
    		if (crimes[crime].crimeStatus == 'completed') {
    			html += '<div style="color: green;">';
    		} else {
    			html += '<div>';
    		}

    		$lastCrimesCont.append(html + '<label><input type="checkbox" class="js-crime" data-index="' + index + '" data-crime-selected="false">' + crimes[crime].crimeName + '</label></div>');

    		index++;
    	}
    },

    // Handlers From Event Dispatcher

    clearCrimeTextBox: function () {
        this.$crimeTextBox.val('');
    },

    addCrime: function () {
        this.show();
    },

    setCrimesAsCompleted: function () {
        this.show();
    },

    delCrimes: function () {
        this.show();
    }

};