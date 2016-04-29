var
	mongo = new Mongo()
	, db = mongo.getDB('pos');

db.Item.dropIndexes();
db.Item.createIndex({ 'id' : 1 });

db.Transaction.dropIndexes();
db.Transaction.createIndex({ 'id' : 1 });