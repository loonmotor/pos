import restfulApi from '../modules/restfulApi';
import db from './mongojs';
import async from 'async';

restfulApi.use('Item', 'GET', (resourceName, req, res, done) => {
	const {id} = req.params;
	db.Item.findOne({ id }, (err, doc) => {
		if (err) {
			return done(err);
		}
		if (!doc) {
			return done({
				msg : 'Item not found'
			});
		}
		console.log('holar');
		console.log(doc);
		res.json(doc);
		done();
	});
});

restfulApi.use('Item', 'POST', (resourceName, req, res, done) => {
	const {name, price, paymentTypes, paymentTypes:{upfront, downpayment, multiplepayments}} = req.body
	const errors = {};
	if (!name) { errors.name = 'Name is required'; }
	if (!price) { errors.price = 'Price is required'; }
	if (!paymentTypes) {
		errors.paymentTypes = 'Payment types is required';
	}
	if (paymentTypes) {
		if (!upfront && !downpayment && !multiplepayments) { errors.paymentTypes = 'At least a payment type is required'; }
	}
	if (Object.keys(errors).length > 0) {
		return done({
			msg : 'There are errors',
			error : errors
		});
	}
	done();
});

restfulApi.use('Item', 'POST', (resourceName, req, res, done) => {
	const {id, name, price, paymentTypes, paymentTypes:{upfront, downpayment, multiplepayments}, editMode} = req.body;

	db.Item.findAndModify({
		query : {
			id
		},
		update : {
			id,
			name,
			price,
			paymentTypes
		},
		new : true,
		upsert : true
	}, (err, doc, {updatedExisting}) => {
		if (err) {
			return done(err);
		}
		if (!doc) {
			return done({
				msg : updatedExisting ? 'Item not edited' : 'Item not created'
			});
		}
		res.json({
			msg : updatedExisting ? 'Item edited successfully' : 'Item created successfully',
			doc : doc
		});
		return done();
	});

});

restfulApi.use('Item', 'DELETE', (resourceName, req, res, done) => {
	const {id} = req.body;
	db.Item.findAndModify({
		query : {
			id
		},
		remove : true
	}, (err, doc) => {
		if (err) {
			return done(err);
		}
		res.json({
			msg : 'Item deleted successfully',
			doc
		})
		done();
	});
});

restfulApi.use('Items', 'GET', (resourceName, req, res, done) => {
	const {offset = 0, limit = 0} = req.params;
	async.parallel({
		count : (ok) => {
			db.Item.count({}, (err, count) => {
				if (err) {
					return ok(err);
				}
				return ok(null, count);
			});
		},
		items : (ok) => {
			db.Item
				.find({})
				.skip(Number(offset) * Number(limit))
				.limit(Number(limit))
				.sort({ $natural : -1 }, (err, docs) => {
					if (err) {
						return ok(err);
					}
					return ok(null, docs);
				});
		}
	}, (err, results) => {
		if (err) {
			return done(err);
		}
		res.json(results);
		done();
	});
});

restfulApi.use('HeartBeat', 'GET', (resourceName, req, res, done) => {
	res.writeHead({
		'Connection' : 'keep-alive',
		'Content-Type' : 'text/event-stream',
		'Cache-Control' : 'no-cache'
	});

	setInterval(() => {
		console.log('sending heart beat');
		res.write('event: heartbeat\n data: {"beating":"beating"}\n\n');
	}, 2000);

	done();

});