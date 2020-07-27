/**
 * PartordersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var rp = require('request-promise');
module.exports = {
  
    // getPartorders: function (req566, res566) {
    //     Partorders.find().exec(function (err566, succ566) {
    //         if (err566) {
    //             return res566.json(err566)
    //         }
    //         return res566.json(succ566);
    //     })
    // },
    
    postPartorders: function (req566, res566) {
        let id = req566.body.partId;
        let userId = req566.body.userId;
        let jobName = req566.body.jobName;
        let qty = parseInt(req566.body.qty, 0);
        sails.log(id, userId, jobName,qty)
        Partorders.create({ id, userId, jobName,qty }).exec(function (err, succ) {
            if (err) {
                return res566.json(err)
            }
            else {
                return res566.json("successfully inserted..");
            }
        })
    },


    getPartordersView: function (req566, res566) {
        let options = '';
        var url = {
            uri: 'https://31u8etrzrf.execute-api.us-east-1.amazonaws.com/Test/getpartordersview',
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
            uri: 'https://31u8etrzrf.execute-api.us-east-1.amazonaws.com/Test/searchpartorders?jobName='+jobName,
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

