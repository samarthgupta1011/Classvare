var express = require('express');
var labRouter = express.Router();
var labController = require('./../controllers/labController');

labRouter.route('/chemicals').get(labController.getChemicals)
				.post(labController.addChemical);
labRouter.route('/reaction').post(labController.addResult).
				get(labController.getResult);


module.exports = labRouter;				

	