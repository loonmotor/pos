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