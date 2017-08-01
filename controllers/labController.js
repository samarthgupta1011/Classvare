var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/LabDB';

	var addChemical = function(request,response){

	var chemical = {
				chemical : request.body.chemical,
				name : request.body.name,
				molMass : request.body.molMass,
				atomicNumber : request.body.atomicNumber,
				color : request.body.color,
				feature : request.body.feature
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
			response.send(chemicals);
			db.close();
		});
		
	});
};

	var addResult = function(request,response){

// {
// 					name : request.body.name,
// 					age : request.body.age,
// 					email : request.body.email,
// 					password : request.body.password,
// 					address : {
// 						country : request.body.address.country,
// 						state : request.body.address.state
// 					}


				var result = {
					react1 : request.body.react1,
					react2 : request.body.react2,
				
					p1 : {
				chemical : request.body.p1.chemical,
				name : request.body.p1.name,
				molMass : request.body.p1.molMass,
				atomicNumber : request.body.p1.atomicNumber,
				color : request.body.p1.color,
				feature : request.body.p1.feature
				}
				,
					p2 : {
				chemical : request.body.p2.chemical,
				name : request.body.p2.name,
				molMass : request.body.p2.molMass,
				atomicNumber : request.body.p2.atomicNumber,
				color : request.body.p2.color,
				feature : request.body.p2.feature
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

		// mongoClient.connect(url,function(err,db){
		// 	if(err) throw err;
		// 	db.collection('products').find().toArray(function(err,resp){
		// 		if(err) throw err;
		// 		response.send(resp);
		// 	});
		// });	


		console.log(request.query.r1);
		var q1 = {
			react1 : request.query.r1,
			react2 : request.query.r2
		};

		mongoClient.connect(url,function(err,db){
			if(err) throw err;
			db.collection('products').find(q1).toArray(function(err,resp){
				if(err) throw err;

				
				if(JSON.stringify(resp)!=='[]'){
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
				db.collection('products').find(q2).toArray(function(err,resp){
					if(err) throw err;
					response.send(resp);
					db.close();
				});
			});


				}
			});
		});
	};


module.exports = {
	addChemical : addChemical,
	getChemicals : getChemicals,
	getResult : getResult,
	addResult : addResult
};




