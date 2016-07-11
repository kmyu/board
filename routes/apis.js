module.exports = function () {

	var mongodbUrl = "mongodb://localhost:27017/board";

	var MongoClient = require('mongodb').MongoClient
	
	//var Server = require('mongodb').Server;
	//var mongoClient = new MongoClient(new Server('localhost', 27017));
	// mongoClient.open(function(err, mongoClient) {
	//   db = mongoClient.db("mydb");
	//   mongoClient.close();
	// });

	var ObjectID = require('mongodb').ObjectID;
	var _ = require("underscore");

	var handler = {};

	handler.select = function (req, res) {
		MongoClient.connect(mongodbUrl, function(err, db){
		   	
			var _id = req.param('_id');
		   	console.log("connected to the DB SELECT : " + _id);

		   	//var query = {"category_code" : "biotech"};
			var query = {};
		   	if (_id) {
		   		var o_id = new ObjectID(_id);
		   		query = {"_id":o_id};
		   	}
			db.collection("board").find(query).toArray(function(err, docs){
		    	res.json(docs);
				db.close();
		  	})
		})
	}
	handler.update = function (req, res) {
		var _id = req.params._id;
    	console.log( 'update[' + _id + ']' );

		MongoClient.connect(mongodbUrl, function(err, db){
		   	
		   	console.log("connected to the DB");

			var query = {};
			db.collection("board").update({_id: ObjectID(_id)},{$set:req.body},function(err, result){
				if (err) {
		          	res.json( { result: 'fail',
		                      message: err.message } );
		        } else {
		          	res.json( { result: 'success',
		                      updatedCount: result } );
		        }
				db.close();
			});
		})
	};
	handler.insert = function (req, res) {

		console.log("INSERT : ",req.body);

		MongoClient.connect(mongodbUrl, function(err, db){
		   	
		   	console.log("connected to the DB");

			db.collection("board").insert(req.body,function(err, result){
				if (err) {
		          	res.json( { result: 'fail',
		                      message: err.message } );
		        } else {
		          	res.json( { result: 'success',
		                      updatedCount: result } );
		        }
				db.close();
			});
		})

	};
	handler.delete = function (req, res) {
    	var _id = req.params._id;	
		if ( _.isUndefined(_id) || _.isEmpty(_id) ) {
	    	res.json( { result: 'fail',
	    	message: '_id is empty' } );
	    } else {

	    	MongoClient.connect(mongodbUrl, function(err, db){
		   	
			   	console.log("connected to the DB");

				var query = {};
				db.collection("board").remove({_id: ObjectID(_id)},function(err, result){
					if (err) {
			          	res.json( { result: 'fail',
			                      message: err.message } );
			        } else {
			          	res.json( { result: 'success',
			                      updatedCount: result } );
			        }
					db.close();
				});
			})
	    }
	}
	return handler;
}