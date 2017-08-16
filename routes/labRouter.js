var express = require('express');
var labRouter = express.Router();
var labController = require('./../controllers/labController');

labRouter.route('/chemicals').get(labController.getChemicals)
				.post(labController.addChemical).delete(labController.deleteChemical)
				.patch(labController.editChemical);
labRouter.route('/reaction').post(labController.addResult).
				get(labController.getResult).delete(labController.deleteReaction);		
labRouter.route('/reaction/all').get(labController.showReactions);
labRouter.route('/chemicals/drop').delete(labController.dropChemicals);
labRouter.route('/reation/drop').delete(labController.dropReactions);

module.exports = labRouter;