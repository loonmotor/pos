import restfulApi from '../modules/restfulApi';
import db from './mongojs';
import async from 'async';
import shortid from 'shortid';

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
	const {id, modified, company, name, email, phone, price, quantity, itemname, paymentTypes, paymentType} = req.body;
	let {payments} = req.body;
	
	const defaultPayment = (amount) => ({
		id : shortid.generate(),
		modified : Date.now(),
		amount : amount
	});

	const doc = {
		id,
		modified,
		buyer : {
			company,
			name,
			email,
			phone
		},
		item : {
			name : itemname,
			price,
			paymentTypes : {
				upfront : paymentTypes.indexOf('upfront') > -1,
				downpayment : paymentTypes.indexOf('downpayment') > -1,
				multiplepayments : paymentTypes.indexOf('multiplepayments') > -1
			}
		},
		quantity,
		paymentType,
		payments : ((payments) => {
			if (Object.prototype.toString.call(payments) !== '[object Array]') {
				payments = [payments];
			}
			return payments.map(payment => defaultPayment(payment));
		})(payments)
	};

	doc.payments = doc.payments.filter(payment => {
		return Number(payment.amount) > 0
	});

	switch (paymentType) {
		case 'upfront' :
			if (payments.length === 0) {
				doc.payments.push(defaultPayment(0));
			}
			doc.payments.splice(1);
			break;
		case 'downpayment' :
			doc.payments.splice(2);
			if (doc.payments.length === 0) {
				doc.payments.push(defaultPayment(0));
			}
			if (doc.payments.length === 1 && Number(doc.payments[1]) !== 0) {
				doc.payments.push(defaultPayment(0));	
			}
			break;
		case 'multiplepayments' :
			if (Number(doc.payments[doc.payments.length - 1].amount) !== 0) {
				doc.payments.push(defaultPayment(0));
			}
			if (payments.length === 0) {
				doc.payments.push(defaultPayment(0));
			}
	}

	const paymentTotal = doc.payments.reduce((acc, payment) => Number(acc) + Number(payment.amount), 0);
	const total = doc.quantity * doc.item.price;
	let isPaymentLess = false;

	switch (paymentType) {
		case 'multiplepayments' :
			isPaymentLess = false;
			break;
		case 'downpayment' :
			console.log(doc.payments[1].amount);
			isPaymentLess = Number(doc.payments[1].amount) && paymentTotal < total;
			break;
		case 'upfront' :
			isPaymentLess = paymentTotal < total;
			break;
	}

	const error = {
		required : {
			buyer : {
				company : !!!doc.buyer.company,
				name : !!!doc.buyer.name,
				email : !!!doc.buyer.email,
				phone : !!!doc.buyer.phone
			},
			quantity : !!!doc.quantity,
			paymentType : !!!doc.paymentType
		},
		payment : {
			exceed : paymentTotal > total,
			less : isPaymentLess
		}
	};

	if (Object.keys(error.required.buyer).some(key => error.required.buyer[key])
			|| error.required.quantity
			|| error.required.paymentType
			|| Object.keys(error.payment).some(key => error.payment[key])) {
		return done(Object.assign({}, doc, {error}, {dirty:true}, {msg:'There are errors'}));
	}

	
	req.doc = doc;
	done();

});

restfulApi.use('NoScript.Transaction', 'POST', (resourceName, req, res, done) => {
	const {id} = req.doc;
	db.Transaction.findAndModify({
		query : {id},
		update : req.doc,
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