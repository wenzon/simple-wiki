'use strict'

var MongoClient = require('mongodb').MongoClient;

module.exports = {
  connectDb(callback) {
	MongoClient.connect(config.db,  function(err, db){
		if(err) {
			console.log('数据库连接失败');
			return;
		}
		callback(db);
	})
  },
 
  find(dbname, collectionname, cond, callback) {
    let self = this	  
	self.connectDb(function(db) {
		const DB = db.db(dbname);
		const collection = DB.collection(collectionname);
		
		collection.find(cond).toArray(function(error, docs){
			callback(error,  docs);
			db.close();
		});
	});
  },

  count(dbname, collectionname, cond, callback){
    let self = this
	self.connectDb(function(db) {
		const DB = db.db(dbname);
		const collection = DB.collection(collectionname);
		
		collection.count(cond, function(error, n){
			callback(error,  n);
			db.close();			
		});
	});
  },
  
  findOne(dbname, collectionname, cond, callback){
    let self = this
	self.connectDb(function(db) {
		const DB = db.db(dbname);
		const collection = DB.collection(collectionname);
		
		collection.findOne(cond, null, function(error,  doc){
			callback(error, doc,  );
			db.close();
		});
	});
  },

  where(dbname, collectionname, cond, skip, limit, callback) {
    let self = this	  
	self.connectDb(function(db) {
		const DB = db.db(dbname);
		const collection = DB.collection(collectionname);

		var results = [];
		var cursor = collection.find(cond).skip(skip).limit(limit);
        cursor.each(function(err, doc) {			
            if (err == null && doc != null) {
                results.push(doc);
            } else {
                callback(null, results); db.close();
            }
		});
	});
  },
  
  insertOne(dbname, collectionname, cond, callback){
    let self = this	  
	self.connectDb(function(db) {
		const DB = db.db(dbname);
		const collection = DB.collection(collectionname);
		collection.insertOne(cond, callback)
	})
  }
}