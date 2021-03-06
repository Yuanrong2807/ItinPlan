import { Mongo } from 'meteor/mongo';

export const Country = new Mongo.Collection('country');

export const Trips = new Mongo.Collection('trips');

export const Locations = new Mongo.Collection('locations');

Meteor.methods({
    
    //add new trip, ensure user is logged in. @@obsolete
    'trips.add' (trip) {
        if (trip.owner != Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        return newId = Trips.insert(trip);
    },

    //update trip, ensure owner = meteor.userid @@obsolete
    'trips.update' (trip) {
        if (trip.owner != Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        return Trips.update(
            { _id : trip._id } ,
            trip
        );
    },

    //add new trip if ID undefined, else update the existing trip
    'trips.modify' (trip) {
        if (trip.owner != Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        
        let tripID = Trips.findOne( { _id: trip._id } );
        if(tripID == undefined)
        {
            return newId = Trips.insert(trip);
        }
        else
        {
            return Trips.update(
                { _id : trip._id } ,
                trip
            );
        }
    },

    //delete trip, ensure owner = meteor.userid
    'trips.remove' (trip) {
        if (trip.owner != Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        return Trips.remove(trip._id);
    },

    //location stuff, ensure owner = meteor.userid
    'locations.add' (location, owner) {
        if (owner == undefined) {
            throw new Meteor.Error('not-authorized');
        }
        console.log("SUP");
        console.log(location);
        //return Locations.insert();
        return 1;
    }
    
});