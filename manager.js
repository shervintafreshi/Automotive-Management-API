
// ################################################################################
// Data service operations

const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


// Data entities
const carSchema = require('./schema.js');



// ################################################################################

module.exports = function () {

  // Collection properties
  let Cars;

  return {

    // ############################################################
    // Connect to the database

    connect: function () {
      return new Promise(function (resolve, reject) {

        // Create connection to the database
        console.log('Attempting to connect to the database...');

        const uri = "";   // const uri = "private_cluster_uri";
        mongoose.connect(uri, {dbName: 'db-a1', connectTimeoutMS: 5000, useUnifiedTopology: true });
        var db = mongoose.connection;
     
        // Handle the unable to connect scenario
        db.on('error', (error) => {
          console.log('Connection error:', error.message);
          reject(error);
        });

        // Handle the open/connected event scenario
        db.once('open', () => {
          console.log('Connection to the database was successful');
          Cars = db.model("Vehicle", carSchema, "vehicles");          
          resolve();
        });
      });
    },
    

    // ############################################################
    // Car requests

    carGetAll: function () {
      return new Promise(function (resolve, reject) {

        // Fetch all documents
        Cars.find()
          .sort({ make: 'asc', model: 'asc', year: 'asc' })
          .exec((error, items) => {
            if (error) {
              // Query error
              return reject(error.message);
            }
             
            // Found, a collection will be returned
            return resolve(items);
          });
      })
    },

    carGetById: function (itemId) {
      return new Promise(function (resolve, reject) {

        // Find one specific document
        Cars.findById(itemId, (error, item) => {
          if (error) {
            // Find/match is not found
            return reject(error.message);
          }
          // Check for an item
          if (item) {
            // Found, one object will be returned
            return resolve(item);
          } else {
            return reject('Not found');
          }
        });
      })
    },

    carAdd: function (newItem) {
      return new Promise(function (resolve, reject) {

        Cars.create(newItem, (error, item) => {
          if (error) {
            // Cannot add item
            return reject(error.message);
          }
          //Added object will be returned
          return resolve(item);
        });
      })
    },

    carEdit: function (newItem) {
      return new Promise(function (resolve, reject) {

        Cars.findByIdAndUpdate(newItem._id, newItem, { new: true }, (error, item) => {
          if (error) {
            // Cannot edit item
            return reject(error.message);
          }
          // Check for an item
          if (item) {
            // Edited object will be returned
            return resolve(item);
          } else {
            return reject('Not found');
          }

        });
      })
    },

    carDelete: function (itemId) {
      return new Promise(function (resolve, reject) {

        Cars.findByIdAndRemove(itemId, (error) => {
          if (error) {
            // Cannot delete item
            return reject(error.message);
          }
          // Return success, but don't leak info
          return resolve();
        })
      })
    }



  }

} // module.exports
