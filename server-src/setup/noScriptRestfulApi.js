import restfulApi from '../modules/restfulApi';
import db from './mongojs';
import async from 'async';

restfulApi.use('NoScript.Item', 'POST', (resourceName, req, res, done) => {
	let {id, name, price, paymentTypes = ''} = req.body;
	paymentTypes = {
		upfront : paymentTypes.indexOf('upfront') > -1,
		downpayment : paymentTypes.indexOf('downpayment') > -1,
		multiplepayments : paymentTypes.indexOf('multiplepayments') > -1
	};

	const error = {
		required : {
			name : !!!name,
			price : !!!price,
			paymentType : !paymentTypes.upfront && !paymentTypes.downpayment && !paymentTypes.multiplepayments
		}
	};

	const doc = {
		id,
		name,
		price,
		paymentTypes
	};

	if (Object.keys(error.required).some(key => error.required[key])) {
		return done(Object.assign({}, doc, {error}, {dirty:true}, {msg:'There are errors'}));
	}
	done();
});

restfulApi.use('NoScript.Item', 'POST', (resourceName, req, res, done) => {
	let {id, name, price, paymentTypes} = req.body;

	paymentTypes = {
		upfront : paymentTypes.indexOf('upfront') > -1,
		downpayment : paymentTypes.indexOf('downpayment') > -1,
		multiplepayments : paymentTypes.indexOf('multiplepayments') > -1
	};

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

		res.json(Object.assign({}, doc, {msg:updatedExisting ? 'Item edited successfully' : 'Item created successfully'}));
		return done();
	});

});

restfulApi.use('NoScript.Items', 'POST', (resourceName, req, res, done) => {
	const {id} = req.body;

	async.series([
		ok => {
			db.Item.findAndModify({
				query : {id},
				remove : true
			}, (err, doc) => {
				if (err) {
					return ok(err);
				}
				ok();
			});
		},
		ok => {
			db.Item
				.find({})
				.sort({$natural:-1}, (err, docs) => {
					if (err) {
						return ok(err);
					}
					ok(null, docs);
				});
		}
	], (err, [,items]) => {
		if (err) {
			return done(err);
		}
		res.json({
			msg : 'Item deleted successfully',
			items
		});
		done();
	});

});

restfulApi.use('NoScript.Transactions', 'POST', (resourceName, req, res, done) => {
	const {id} = req.body;

	async.series([
		ok => {
			db.Transaction.findAndModify({
				query : {id},
				remove : true
			}, (err, doc) => {
				if (err) {
					return ok(err);
				}
				ok();
			});
		},
		ok => {
			db.Transaction
				.find({})
				.sort({$natural:-1}, (err, docs) => {
					if (err) {
						return ok(err);
					}
					ok(null, docs);
				});
		}
	], (err, [,transactions]) => {
		if (err) {
			return done(err);
		}
		res.json({
			msg : 'Transaction deleted successfully',
			transactions
		});
		done();
	})
});

restfulApi.use('NoScript.Transaction', 'POST', (resourceName, req, res, done) => {
	console.log(req.body);
	const {id, modified, buyer, item, quantity, paymentType, payments} = req.body;
	
	// const paymentAmount = payments.reduce((acc, payment) => acc + payment.amount, 0);
	// const itemAmount = quantity * item.price;
	// let isExceed, isLess;
	// if (paymentType === 'upfront' && paymentAmount < itemAmount) { isLess = true; }
	// if (paymentAmount > itemAmount) { isExceed = true; }
	// if (paymentType === 'downpayment' && paymentAmount < itemAmount && payments[1] && payments[1].amount !== 0) { isLess = true; }
	// if (paymentType === 'downpayment' && paymentAmount > itemAmount && payments[1] && payments[1].amount !== 0) { isExceed = true; }

	const error = {
		required : {
			buyer : {
				company : !!!buyer.company,
				name : !!!buyer.name,
				email : !!!buyer.email,
				phone : !!!buyer.phone
			},
			quantity : !!!quantity,
			paymentType : !!!paymentType,
		},
		payment : {
			exceed : false,
			less : false
		}
	}

	const doc = {
		id,
		modified,
		buyer,
		item,
		quantity,
		paymentType,
		payments
	};
	
	if (Object.keys(error.required).some(key => error.required[key])
			|| error.quantity
			|| error.paymentType
			|| Object.keys(error.payment).some(key => error.required[key])) {
		console.log('ahahahaha');
		return done(Object.assign({}, doc, {error}, {dirty:true}, {msg:'There are errors'}));
	}
	console.log('to be continued');
	done();

});

restfulApi.use('NoScript.Transaction', 'POST', (resourceName, req, res, done) => {
	console.log('here already');
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
		res.json(Object.assign({}, doc, {msg : updatedExisting ? 'Transaction edited successfully' : 'Transaction created successfully'}));
		return done();
	});
});