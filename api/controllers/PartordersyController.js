/**
 * PartordersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var rp = require('request-promise');
module.exports = {

    getPartordersView: function (req566, res566) {

        let options = '';
        var url = {
            uri: 'https://0xfbndiva5.execute-api.us-east-1.amazonaws.com/Dev/partordersy',
            method: 'GET',
            json: true
          };
          rp(url).then(function (repos) {
            options = repos.jobNames;
            jobs = repos.jobs;
              res566.view('pages/partordersView', { parts: jobs, options: options });
          })
            .catch(function (err) {
              // API call failed...
              return res566.json(err);
            });
    },

    searchPartOrders: function (req566, res566) {
        let jobName = req566.body.jobName;
        
        let options = '';

        var url = {
            uri: 'https://0xfbndiva5.execute-api.us-east-1.amazonaws.com/Dev/partordersy?jobName='+jobName,
            method: 'GET',
            json: true
          };
          rp(url).then(function (repos) {
            options = repos.jobNames;
            jobs = repos.jobs;
            res566.view('pages/partordersView', { parts: jobs, options: options });
          })
            .catch(function (err) {
              // API call failed...
              return res566.json(err);
            });
    },
};

