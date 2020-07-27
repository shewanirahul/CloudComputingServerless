var request = require('request');
var http = require('http');
var rp = require('request-promise');
const { setMaxListeners } = require("process");
const PartsModel = require("../models/Parts");

/**
 * PartsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    //For Z Company

      getPartsById: function (req566, res566) {
        let id = parseInt(req566.params.id, 0);

        var url = {
            uri: 'https://0xfbndiva5.execute-api.us-east-1.amazonaws.com/Dev/parts/id?partId='+id,
            method: 'GET',
            json: true
        };
        rp(url).then(function (repos) {
            return res566.json(repos);
        })
        .catch(function (err) {
            // API call failed...
            return res566.json(err);
        });
  },


    //view data
    getPartsView566: function (req566, res566) {
        
        let options = "";

        var url = {
        uri: 'https://0xfbndiva5.execute-api.us-east-1.amazonaws.com/Dev/parts',
        method: 'GET',
        json: true
        };
        rp(url).then(function (repos) {
        options = repos.options;
        jobs = repos.jobs;
        res566.view("pages/viewjobs", { parts: jobs, options: options });
        })
        .catch(function (err) {
            // API call failed...
            return res566.json(err);
        });
    },

    getPartsViewForUpdate566: function (req566, res566) {

        let options = "";

    var url = {
      uri: 'https://0xfbndiva5.execute-api.us-east-1.amazonaws.com/Dev/parts',
      method: 'GET',
      json: true
    };
    rp(url).then(function (repos) {
      parts = repos.body;
      res566.view("pages/updatejobs", { parts: parts });
    })
      .catch(function (err) {
        // API call failed...
        return res566.json(err);
      });
    },


    postPartsView566: function (req566, res566) {
        let id = parseInt(req566.body.partId, 0);
        let partName = req566.body.partName;
        let qoh = parseInt(req566.body.qoh, 0);
        let isUpdate = parseInt(req566.body.isUpdate, 0);

        var url = {
            method: 'POST',
            uri: 'https://0xfbndiva5.execute-api.us-east-1.amazonaws.com/Dev/parts',
            body: {
                partId: id,
                partName: partName,
                qoh: qoh
            },
            json: true
        };
        sails.log(url)

        rp(url).then(function (repos) {
            sails.log(repos)
            if (repos) {
              if (isUpdate === 1) {
                res566.redirect("/getPartsViewForUpdate566");
              } else {
                res566.redirect("/getPartsView566");
              }
            }
            else {
              return res566.json("Id already exists..Please try with different Ids");
            }
            
          })
            .catch(function (err) {
              // API call failed...
              return res566.json(err);
            });      
    },

    deletePartsView566: function (req566, res566) {
        let id = parseInt(req566.body.jobId, 0);
        sails.log(id)

        var url = {
            uri: 'https://0xfbndiva5.execute-api.us-east-1.amazonaws.com/Dev/parts',
            method: 'DELETE',
            body: {
              partId: id
            },
            json: true
          };
          rp(url).then(function (repos) {
            if (repos) {
              res566.redirect("/getPartsView566");
            }
          })
            .catch(function (err) {
              // API call failed...
              return res566.json(err);
            });
    },

    putPartsView566: function (req566, res566) {
        let id = parseInt(req566.body.partId, 0);
        let partsnameOld = req566.body.partsnameOld;
        let quantityOld = parseInt(req566.body.quantityOld, 0);
        let partsname = req566.body.partsname;
        let quantity = parseInt(req566.body.quantity, 0);

        qoh = isNaN(quantity) ? quantityOld : quantity;
        partName = partsname == '' ? partsnameOld : partsname;

        sails.log('id:',id, 'partsnameNew:',partsname, 'quantityNew',quantity,'partsname:',partsnameOld, 'quantity',quantityOld)

        var url = {
            uri: 'https://0xfbndiva5.execute-api.us-east-1.amazonaws.com/Dev/parts',
            method: 'PUT',
            body: {
              partName: partName,
              partId: id,
              qoh: qoh
            },
            json: true
          };
          sails.log(url);
          rp(url).then(function (repos) {
            if (repos) {
              res566.redirect("/getPartsViewForUpdate566");
            }
          })
            .catch(function (err) {
              // API call failed...
              return res566.json(err);
            });
        }
};

