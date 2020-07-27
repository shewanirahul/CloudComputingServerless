const PartsModel = require("../models/Parts");
var request = require('request');
var http = require('http');
var rp = require('request-promise');
const { setMaxListeners } = require("process");

/**
 * CloudjobsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  //GET jobs API endpoint
  // getParts: function (req566, res566) {
  //   var url = {
  //     uri: 'https://31u8etrzrf.execute-api.us-east-1.amazonaws.com/Test/getjobs',
  //     method: 'GET',
  //     json: true
  //   };
  //   rp(url).then(function (repos) {
  //     return res566.json(repos);
  //   })
  //     .catch(function (err) {
  //       // API call failed...
  //       return res566.json(err);
  //     });
  // },

  //
  // getPartsById: function (req566, res566) {
  //   let id = req566.params.id;

  //   var url = {
  //     uri: 'https://31u8etrzrf.execute-api.us-east-1.amazonaws.com/Test/getjobs',
  //     method: 'GET',
  //     json: true
  //   };
  //   rp(url).then(function (repos) {
  //     return res566.json(repos);
  //   })
  //     .catch(function (err) {
  //       // API call failed...
  //       return res566.json(err);
  //     });

  //   Jobs.find({ id }).exec(function (err566, succ566) {
  //     if (err566) {
  //       return res566.json(err566);
  //     }
  //     return res566.json(succ566);
  //   });
  // },

  // putParts: function (req566, res566) {
  //   let id = req566.body.jobName;
  //   let partId = req566.body.partId;
  //   let qty = parseInt(req566.body.qty, 0);
  //   //sails.log(id, partId, qty);
  //   Jobs.find({ id, partId }).exec(function (err566, succ566) {
  //     if (err566) {
  //       return res566.json(err566);
  //     } else if (succ566.length > 0) {
  //       Jobs.update({ id, partId })
  //         .set({ qty })
  //         .exec(function (err, succ) {
  //           if (err) {
  //             return res566.json(err);
  //           } else {
  //             return res566.json("successfully updated..");
  //           }
  //         });
  //     } else {
  //       return res566.json("Id does not exists");
  //     }
  //   });
  // },

  // getJobsParts: function (req566, res566) {
    // let options = "";
    // Partorders.query(
      // "SELECT jobName, GROUP_CONCAT(DISTINCT partId SEPARATOR ', ') As parts FROM `Project-G14`.jobs GROUP BY jobName",
      // function (err566, succ566) {
        // if (err566) {
          // return res566.json(err566);
        // }
        // //return res566.json(succ566);
        // options = succ566["rows"];
        // //sails.log(options);
        // res566.json(options);
      // }
    // );
  // },

  // postParts: function (req566, res566) {
  //   let id = req566.body.jobName;
  //   let partId = req566.body.partId;
  //   let qty = parseInt(req566.body.qty, 0);
  //   //sails.log(id, partId, qty);
  //   Jobs.find({ id, partId }).exec(function (err566, succ566) {
  //     if (err566) {
  //       return res566.json(err566);
  //     } else if (succ566.length > 0) {
  //       return res566.json("Id already exists");
  //     } else {
  //       Jobs.create({ id, partId, qty }).exec(function (err, succ) {
  //         if (err) {
  //           return res566.json(err);
  //         } else {
  //           return res566.json("successfully inserted..");
  //         }
  //       });
  //     }
  //   });
  // },

  // deleteParts: function (req566, res566) {
  //   let id = req566.body.jobName;
  //   let partId = req566.body.partId;
  //   Jobs.find({ id, partId }).exec(function (err566, succ566) {
  //     if (err566) {
  //       return res566.json(err566);
  //     } else if (succ566.length > 0) {
  //       Jobs.destroy({ id, partId }).exec(function (err, succ) {
  //         if (err) {
  //           return res566.json(err);
  //         } else {
  //           return res566.json("successfully deleted..");
  //         }
  //       });
  //     } else {
  //       return res566.json("Id does not exists");
  //     }
  //   });
  // },



  //view data
  //View Add|View|Delete screen
  
  getPartsView566: function (req566, res566) {
    let options = "";

    var url = {
      uri: 'https://31u8etrzrf.execute-api.us-east-1.amazonaws.com/Test/jobsx',
      method: 'GET',
      json: true
    };
    var partsUrl = {
      uri: 'https://0xfbndiva5.execute-api.us-east-1.amazonaws.com/Dev/parts/',
      method: 'GET',
      json: true
    }
    rp(url).then(function (reposJobs) {

      rp(partsUrl).then(function (reposParts) {

        options = reposParts.body;
      jobs = reposJobs.jobs;
      res566.view("pages/viewjobs", { parts: jobs, options: options });
      })
        .catch(function (err) {
          // API call failed...
          return res566.json(err);
        });
    
    
      
    })
      .catch(function (err) {
        // API call failed...
        return res566.json(err);
      });
  },

  //View Add|View|Update screen
  getPartsViewForUpdate566: function (req566, res566) {
    let options = "";

    var url = {
      uri: 'https://31u8etrzrf.execute-api.us-east-1.amazonaws.com/Test/jobsx',
      method: 'GET',
      json: true
    };
    var partsUrl = {
      uri: 'https://0xfbndiva5.execute-api.us-east-1.amazonaws.com/Dev/parts/',
      method: 'GET',
      json: true
    }
    rp(url).then(function (reposJobs) {

      rp(partsUrl).then(function (reposParts) {

        options = reposParts.body;
      jobs = reposJobs.jobs;
      res566.view("pages/updatejobs", { parts: jobs, options: options });
      })
        .catch(function (err) {
          // API call failed...
          return res566.json(err);
        });
    
    
      
    })
      .catch(function (err) {
        // API call failed...
        return res566.json(err);
      });
  },

  //Add Jobs
  postPartsView566: function (req566, res566) {
    let jobName = req566.body.id;
    let partId = parseInt(req566.body.PartId566, 0);
    let qty = parseInt(req566.body.Quantity566, 0);
    let isUpdate = parseInt(req566.body.isUpdate, 0);
    
    var url = {
      method: 'POST',
      uri: 'https://31u8etrzrf.execute-api.us-east-1.amazonaws.com/Test/jobsx',
      body: {
        jobName: jobName,
        partId: partId,
        qty: qty
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

  //delete job
  deletePartsView566: function (req566, res566) {
    let jobName = req566.body.jobId566;
    let partId = parseInt(req566.body.PartId566, 0);
    
    var url = {
      uri: 'https://31u8etrzrf.execute-api.us-east-1.amazonaws.com/Test/jobsx',
      method: 'DELETE',
      body: {
        jobName: jobName,
        partId: partId
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

  //update job
  putPartsView566: function (req566, res566) {
    let jobName = req566.body.jobId566;
    let partId = parseInt(req566.body.partId566, 0);
    let qty = parseInt(req566.body.quantity566, 0);
    var url = {
      uri: 'https://31u8etrzrf.execute-api.us-east-1.amazonaws.com/Test/jobsx',
      method: 'PUT',
      body: {
        jobName: jobName,
        partId: partId,
        qty: qty
      },
      json: true
    };
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
