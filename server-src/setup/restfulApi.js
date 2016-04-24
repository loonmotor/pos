import restfulApi from '../modules/restfulApi';
import db from './mongojs';
import async from 'async';

restfulApi.use('Item', 'GET', (resourceName, req, res, done) => {
	const {id} = req.params;
	console.log(id);
	db.Item.findOne({ id }, (err, doc) => {
		if (err) {
			return done(err);
		}
		if (!doc) {
			return done({
				msg : 'Item not found'
			});
		}
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
		if (!upfront && !downpayment && !!multiplepayments) { errors.paymentTypes = 'At least a payment type is required'; }
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
	if (editMode) {
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
			new : true
		}, (err, doc) => {
			if (err) {
				return done(err);
			}
			if (!doc) {
				return done({
					msg : 'Item not edited'
				});
			}
			res.json({
				msg : 'Item edited successfully',
				doc : doc
			});
			return done();
		});
	} else {
		db.Item.insert({
			id,
			name,
			price,
			paymentTypes
		}, (err, doc) => {
			if (err) {
				return done(err);
			}
			if (!doc) {
				return done({
					msg : 'Item not created'
				});
			}
			res.json({
				msg : 'Item created successfully',
				doc : doc
			});
			return done();
		});
	}
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
