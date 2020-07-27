/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/
  "/": { view: "pages/jobsMain" },
  "/homepage":{view:"pages/homepage"},
  "GET /getParts": "Parts.getParts",
  "GET /getPartsById/:id/": "Parts.getPartsById",
  "POST /postParts": "Parts.postParts",
  "Put /putParts": "Parts.putParts",
  "Delete /deleteParts": "Parts.deleteParts",
  "GET /getPartIds": "Parts.getPartIds",

  "Get /getPartsView566": "Parts.getPartsView566",
  "GET /addjob": { view: "Pages/addjob" },
  "POST /postPartsView566": "Parts.postPartsView566",
  "POST /deletePartsView566": "Parts.deletePartsView566",
  "GET /getPartsViewForUpdate566": "Parts.getPartsViewForUpdate566",
  "POST /putPartsView566/": "Parts.putPartsView566",

  "GET /getPartorders": "Partordersy.getPartorders",
  "POST /postPartorders": "Partordersy.postPartorders",
  
  "GET /getPartordersView": "Partordersy.getPartordersView",
  "POST /searchPartOrders": "Partordersy.searchPartOrders",
  
};
