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
			doc
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
		count : ok => {
			db.Item.count({}, (err, count) => {
				if (err) {
					return ok(err);
				}
				return ok(null, count);
			});		},
		items : ok => {
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

restfulApi.use('Transaction', 'GET', (resourceName, req, res, done) => {
	const {id} = req.params;
	db.Transaction.findOne({ id }, (err, doc) => {
		if (err) {
			return done(err);
		}
		if (!doc) {
			return done({
				msg : 'Transaction not found'
			});
		}
		res.json(doc);
		done();
	});
});

restfulApi.use('Transaction', 'POST', (resourceName, req, res, done) => {
	const {id, modified, buyer, item, quantity, paymentType, payments} = req.body;
	const errors = {};
	if (!modified) { errors.modified = 'Modified timestamp is required'; }
	if (!buyer.company) { errors.buyerCompany = 'Company name is required'; }
	if (!buyer.name) { errors.buyerName = 'Name is required'; }
	if (!buyer.email) { errors.buyerEmail = 'Email is required'; }
	if (!buyer.phone) { errors.buyerPhone = 'Phone is required'; }
	if (!item.name) { errors.itemName = 'Item id is required'; }
	if (!item.price) { errors.itemPrice = 'Item price is required'; }
	if (!item.paymentTypes) { errors.itemPaymentTypes = 'Item payment types is required'; }
	if (!quantity) { errors.quantity = 'Quantity is required'; }
	if (!paymentType) { errors.paymentType = 'Payment type is required'; }
	if (!payments) { errors.payments = 'Payments is required'; }
	const paymentAmount = payments.reduce((acc, payment) => acc + payment.amount, 0);
	const itemAmount = quantity * item.price;
	if (paymentType === 'upfront' && paymentAmount < itemAmount) { errors.upfront = "Payment is less than total"; }
	if (paymentAmount > itemAmount) { errors.upfront = "Payment is more than total"; }
	if (paymentType === 'downpayment' && paymentAmount < itemAmount && payments[1] && payments[1].amount !== 0) { errors.downpayment = "Payment is less than total"; }
	if (paymentType === 'downpayment' && paymentAmount > itemAmount && payments[1] && payments[1].amount !== 0) { errors.downpayment = "Payment is more than total"; }
	if (Object.keys(errors).length > 0) {
		return done({
			msg : 'There are errors',
			error : errors
		});
	}
	done();
});

restfulApi.use('Transaction', 'POST', (resourceName, req, res, done) => {
	console.log(req.body);
	const {id, modified, buyer, item, quantity, paymentType, payments} = req.body;
	db.Transaction.findAndModify({
		query : {id},
		update : {
			id,
			modified,
			buyer,
			item,
			quantity,
			paymentType,
			payments
		},
		upsert : true,
		new : true
	}, (err, doc, {updatedExisting}) => {
		if (err) {
			return done(err);
		}
		if (!doc) {
			return done({
				msg : updatedExisting ? 'Transaction not edited' : 'Transaction not created'
			})
		}
		res.json({
			msg : updatedExisting ? 'Transaction edited successfully' : 'Transaction created successfully',
			doc
		});
		return done();
	});
});

restfulApi.use('Transactions', 'GET', (resourceName, req, res, done) => {
	const {offset = 0, limit = 0} = req.params;
	async.parallel({
		count : ok => {
			db.Transaction.count({}, (err, count) => {
				if (err) {
					return ok(err);
				}
				return ok(null, count);
			});
		},
		transactions : ok => {
			db.Transaction
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

restfulApi.use('Transaction', 'DELETE', (resourceName, req, res, done) => {
	const {id} = req.body;
	db.Transaction.findAndModify({
		query : {id},
		remove : true
	}, (err, doc) => {
		if (err) {
			return done(err);
		}
		res.json({
			msg : 'Transaction deleted successfully',
			doc
		});
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