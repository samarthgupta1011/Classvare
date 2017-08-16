var mongoDb = require('mongodb');
var mongoClient = mongoDb.MongoClient;

var url = 'mongodb://localhost/LabDB';

var addChemical = function(request,response){

	var chemical = {
		chemical : request.body.chemical,
		name : request.body.name,
		molMass : request.body.molMass,
		atomicNumber : request.body.atomicNumber,
		colorR : request.body.colorR,
		colorG : request.body.colorG,
		colorB : request.body.colorB,
		colorA : request.body.colorA,
		feature : request.body.feature,
		phase : request.body.phase
	};

	mongoClient.connect(url,function(err,db){
		if(err) throw err;
		db.collection('chemicals').insert(chemical,function(err, res){
			if(err) throw err;
			response.send(res);
			db.close();
		});

	});
};

var getChemicals = function(request,response){

	

	mongoClient.connect(url,function(err, db){
		if(err) throw err;
		db.collection('chemicals').find().toArray(function(err, chemicals){
			if(err) throw err;
			response.send({ chemicals : chemicals });
			db.close();
		});
		
	});
};

var addResult = function(request,response){

	var result = {
		react1 : request.body.react1,
		react2 : request.body.react2,

		p1 : {
			chemical : request.body.p1.chemical,
			name : request.body.p1.name,
			molMass : request.body.p1.molMass,
			atomicNumber : request.body.p1.atomicNumber,
			colorR : request.body.p1.colorR,
			colorG : request.body.p1.colorG,
			colorB : request.body.p1.colorB,
			colorA : request.body.p1.colorA,
			feature : request.body.p1.feature,
			phase : request.body.p1.phase
		}
		,
		p2 : {
			chemical : request.body.p2.chemical,
			name : request.body.p2.name,
			molMass : request.body.p2.molMass,
			atomicNumber : request.body.p2.atomicNumber,
			colorR : request.body.p2.colorR,
			colorG : request.body.p2.colorG,
			colorB : request.body.p2.colorB,
			colorA : request.body.p2.colorA,
			feature : request.body.p2.feature,
			phase : request.body.p2.phase
		}

	};

	mongoClient.connect(url,function(err,db){
		if(err) throw err;
		db.collection('products').insert(result,function(err,resp){
			if(err) throw err;
			response.send(resp);
			db.close();
		});
	});	
};

var getResult = function(request,response){

	var q1 = {
		react1 : request.query.r1,
		react2 : request.query.r2
	};

	mongoClient.connect(url,function(err,db){
		if(err) throw err;
		db.collection('products').findOne(q1,{p1:1,p2:1,_id:0},function(err,resp){
			if(err) throw err;

			if( resp!==null){
				console.log("IF");
				response.send(resp);
				db.close();
			}

			else {
				console.log("ELSE");
				var q2 = {
					react1 : request.query.r2,
					react2 : request.query.r1
				};

				mongoClient.connect(url,function(err,db){
					if(err) throw err;
					db.collection('products').findOne(q2,{p1:1,p2:1,_id:0},function(err,resp){
						if(err) throw err;
						response.send(resp);
						db.close();
					});
				});


			}
		});
	});
};

var showReactions = function(request,response){
	mongoClient.connect(url,function(err,db){
		if(err) throw err;
		db.collection('products').find().toArray(function(err,resp){
			if(err) throw err;
			response.send(resp);
			db.close();
		});
	});
};

var deleteChemical = function(request,response){
	
	mongoClient.connect(url,function(err,db){
		if(err) throw err;
		var o_id = new mongoDb.ObjectId(request.query._id);
		db.collection('chemicals').deleteOne({_id:o_id},function(err,res){
			if(err) throw err;
			response.send(res);
			db.close();

		});

	});
};

var deleteReaction = function(request,response){
	
	mongoClient.connect(url,function(err,db){
		if(err) throw err;
		var o_id = new mongoDb.ObjectId(request.query._id);
		db.collection('products').deleteOne({_id:o_id},function(err,res){
			if(err) throw err;
			response.send(res);
			db.close();

		});

	});
};

var editChemical = function(request,response){

	var o_id = new mongoDb.ObjectId(request.query._id);
	mongoClient.connect(url,function(err, db){
		if(err) throw err;


		db.collection('chemicals').findOne({_id:o_id},function(err,resp){

			if(err) throw err;

			for(var key in request.body){ 
				console.log(key);
				resp[key] = request.body[key];
			}

			db.collection('chemicals').update({_id: o_id},{$set : resp },function(err,result){
				response.send(result);
			});


		});
	});
};

var dropChemicals = function(request,response){
	mongoClient.connect(url,function(err, db){
		if(err) throw err;
		db.collection('chemicals').drop(function(err, resp){
			if(err) throw err;
			response.send(resp);
		});
	});

};

var dropReactions = function(request,response){
	mongoClient.connect(url,function(err, db){
		if(err) throw err;
		db.collection('products').drop(function(err, resp){
			if(err) throw err;
			response.send(resp);
		});
	});
};




module.exports = {
	addChemical : addChemical,
	getChemicals : getChemicals,
	getResult : getResult,
	addResult : addResult,
	deleteReaction : deleteReaction,
	deleteChemical : deleteChemical,
	showReactions : showReactions,
	editChemical : editChemical,
	dropChemicals : dropChemicals,
	dropReactions : dropReactions
};




