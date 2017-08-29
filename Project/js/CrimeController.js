let CrimeController = function(model, view) {
	this.model = model;
	this.view = view;

	this.init();
};

CrimeController.prototype = {

    init: function () {
        this.createChildren()
            .setupHandlers()
            .enable();
    },

    createChildren: function () {
        // no need to create children inside the controller
        // this is a job for the view
        // you could all as well leave this function out
        return this;
    },

    setupHandlers: function () {

        this.addCrimeHandler = this.addCrime.bind(this);
        this.selectCrimeHandler = this.selectCrime.bind(this);
        this.unselectCrimeHandler = this.unselectCrime.bind(this);
        this.completeCrimeHandler = this.completeCrime.bind(this);
        this.delCrimeHandler = this.delCrime.bind(this);
        return this;
    },

    enable: function () {

        this.view.addCrimeEvent.attach(this.addCrimeHandler);
        this.view.completeCrimeEvent.attach(this.completeCrimeHandler);
        this.view.delCrimeEvent.attach(this.delCrimeHandler);
        this.view.selectCrimeEvent.attach(this.selectCrimeHandler);
        this.view.unselectCrimeEvent.attach(this.unselectCrimeHandler);

        return this;
    },


    addCrime: function (sender, args) {
        this.model.addCrime(args.crime);
    },

    selectCrime: function (sender, args) {
        this.model.setSelectedCrime(args.crimeID);
    },

    unselectCrime: function (sender, args) {
        this.model.unselectCrime(args.crimeID);
    },

    completeCrime: function () {
        this.model.setCrimesAsCompleted();
    },

    delCrime: function () {
        this.model.delCrimes();
    }

};