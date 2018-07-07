import {Trips} from '../../lib/models/db';

Template.myTrips.onCreated(function() {
    Meteor.subscribe('trips');
});

Template.myTrips.helpers({
    tripList: function() {
        return Trips.find({}, {sort: {tripName: 1}});
    },
    startDate: function() {
		return new Date(this.startDate).toLocaleDateString('en-GB', {  day: 'numeric', month: 'long', year: 'numeric' });
    },
});

Template.myTrips.events({
    //go to /planner/?_id="ID".
	'click #btn-Planner' (event) {
        FlowRouter.go('/planner/?_id=' + this._id);
    },
    
    //to open the delete confirmation modal.
	'click #btn-Delete' (event) {
        var trip = this;
        $('#confirmationModal').one('show.bs.modal', function (event) {
            var modal = $(this);
            modal.data("trip", trip);
        });
	},

    //to delete. ((should have confirmation whether want to delete.))
	'click #btn-ConfirmDelete' (event) {
        var trip = $("#confirmationModal").data("trip");
        //console.log(event.target.data("trip"));
        Meteor.call('trips.remove', trip, function(error, result) {
            alert("trip deleted");
        });
        console.log("Deleting . . .");
	},
});